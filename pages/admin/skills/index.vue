<template>
  <div class="skill-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">My skills</h4>
      <nuxt-link to="/admin/skill/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <Form :send-form-data="updateSkills"
          class="update-skill-form">
      <div v-for="(domSkill, index) in domSkills" :key="domSkill.id"
           draggable="true"
           @dragstart="dragStart(index, $event)"
           @dragover="dragOver($event)"
           @dragenter="dragEnter(index)"
           @dragleave="dragLeave(index)"
           @drop="dragFinish(index)"
           class="skill-wrapper">
        <hr v-show="enteredIndex == index && isUpwards" class="line-indicator">
        <div class="input-wrapper">
          <InputField
            class="name-wrapper"
            :field-title="''"
            :field-name="`name-${domSkill.id}`"
            :rule="'required'"
            :type="'text'"
            :value="domSkill.skill.name"
            :placeholder="'Enter your skill'">
          </InputField>
          <NumberField
            class="level-wrapper"
            :field-title="''"
            :field-width="'150px'"
            :field-name="`level-${domSkill.id}`"
            :rule="'required'"
            :value="domSkill.skill.level"
            :min="0"
            :max="100"
            :placeholder="'Level'">
          </NumberField>
        </div>
        <div class="button-group">
          <div v-if="isMobile" class="button-mobile-wrapper">
            <button @click="moveItemByOne(index, index - 1)"
                    type="button" class="button-mobile button-blue">
              <font-awesome-icon :icon="['fa', 'arrow-up']"/>
            </button>
            <button @click="moveItemByOne(index, index + 1)"
                    type="button" class="button-mobile button-blue">
              <font-awesome-icon :icon="['fa', 'arrow-down']"/>
            </button>
          </div>
          <button v-else
                  @mousedown="setDragEffect(true)"
                  @mouseup="setDragEffect(false)"
                  type="button" class="button button-blue">
            <font-awesome-icon :icon="['fas', 'arrows-alt']"/>
          </button>
          <button type="button"
                  @click="showDeleteModal(domSkill.id)"
                  class="button button-red">
            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
          </button>
        </div>
        <hr v-show="enteredIndex == index && !isUpwards" class="line-indicator">
      </div>
      <div class="button-submit-wrapper">
        <button type="submit" class="button-green button-save">
          SAVE
        </button>
      </div>
    </Form>
    <DynamicModal/>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {DELETE_SKILL, GET_SKILLS, UPDATE_SKILLS} from "../../../store/admin/actions";
  import InputField from "../../../components/form/InputField";
  import Form from "../../../components/form/Form";
  import NumberField from "../../../components/form/NumberField";
  import DomSkill from "../../../models/DomSkill";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import DynamicModal from "../../../components/DynamicModal";
  import DomHandler from "../../../utils/DomHandler";

  export default {
    components: {
      Form, InputField, NumberField, DynamicModal
    },
    data: () => ({
      domSkills: [],
      isMobile: true,
      // drag and drop effects
      dragEnabled: false,
      startIndex: -1,
      enteredIndex: -1,
      // scrolling variables
      headerHeight: 60,
      edgeHeight: 80,
      scrollEnabled: false,
      scroller: null,
      scrollInterval: 50,
      isUpwards: false,
      prevScreenY: 0
    }),
    computed: {
      ...mapGetters('admin', {
        skills: 'getSkills',
        scrollY: 'getScrollY'
      })
    },
    methods: {
      async updateSkills(data) {
        // update display indexes
        let updatedSkills = this.domSkills.map((domSkill, index) => {
          // assign a new object to avoid mutating outside vuex store
          let skill = Object.assign({}, domSkill.skill)
          skill.name = data[`name-${skill.id}`]
          skill.level = data[`level-${skill.id}`]
          skill.displayIndex = index + 1
          return skill
        })
        // send request
        let skills = await this.$store.dispatch(UPDATE_SKILLS, updatedSkills)
        if (skills) {
          // update local skills
          this.domSkills = skills.map(skill => new DomSkill(skill.id, skill))
        }
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'skill',
          data: id,
          callback: this.deleteSkill
        })
      },
      async deleteSkill(id) {
        let skills = await this.$store.dispatch(DELETE_SKILL, id)
        if (skills) {
          // update local skills
          this.domSkills = skills.map(skill => new DomSkill(skill.id, skill))
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      },
      dragStart: function (index, event) {
        if (this.dragEnabled) {
          event.dataTransfer.dropEffect = 'paste'
          this.startIndex = index
          // get screen y to identify dragging direction
          this.prevScreenY = event.screenY
        }
      },
      dragEnter: function (index) {
        if (this.dragEnabled) {
          // add hover effect
          this.domSkills[index].isHovered = true
          this.enteredIndex = index
        }
      },
      dragOver: function (event) {
        if (this.dragEnabled) {
          event.preventDefault()
          event.dataTransfer.dropEffect = 'move'
          // set dragging direction
          this.setDraggingDirection(event)
          if (this.startIndex > -1) {
            let positionY = event.clientY
            // check if the cursor reached the end of the page
            if (positionY + this.edgeHeight >= window.innerHeight) {
              if (!this.scrollEnabled) {
                // enable the scrolling downwards
                this.enableScrolling(30)
              }
            } else if (positionY <= this.headerHeight + this.edgeHeight) {
              if (!this.scrollEnabled) {
                // enable the scrolling upwards
                this.enableScrolling(-30)
              }
            } else {
              this.disableScrolling()
            }
          }
        }
      },
      dragLeave: function (index) {
        if (this.dragEnabled) {
          // remove the hover effect
          this.domSkills[index].isHovered = false
        }
      },
      dragEnd: function () {
        if (this.dragEnabled) {
          // reset dragging variables
          this.startIndex = -1
          this.enteredIndex = -1
          this.dragEnabled = false
          this.disableScrolling()
        }
      },
      dragFinish: function (to) {
        if (this.dragEnabled) {
          this.moveItem(to)
        }
      },
      moveItemByOne: function (from, to) {
        // re-order the list
        this.domSkills.splice(to, 0, this.domSkills.splice(from, 1)[0])
      },
      moveItem: function (to) {
        if (this.startIndex != -1) {
          // get the reference of the destination element before manipulating
          let domSkill = this.domSkills[to]
          // re-order the list
          this.domSkills.splice(to, 0, this.domSkills.splice(this.startIndex, 1)[0])
          // set the hover to false to remove hover effect
          domSkill.isHovered = false
          // end the drag and reset
          this.dragEnd()
        }
      },
      setDragEffect: function (isEnabled) {
        this.dragEnabled = isEnabled
      },
      enableScrolling(scrollY) {
        this.scrollEnabled = true
        // set up the interval if it's not set up yet
        this.scroller = setInterval(() => {
          // drag it down or up every few interval time spans
          window.scrollBy(0, scrollY)
        }, this.scrollInterval)
      },
      disableScrolling() {
        // clear up the interval and get ready for the next round
        clearInterval(this.scroller)
        this.scrollEnabled = false
      },
      setDraggingDirection: function (event) {
        if (this.prevScreenY != event.screenY) {
          this.isUpwards = event.screenY < this.prevScreenY;
          this.prevScreenY = event.screenY
        }
      }
    },
    mounted() {
      this.isMobile = DomHandler.isMobile()
    },
    async asyncData({store}) {
      let skills = await store.dispatch(GET_SKILLS);
      if (skills) {
        return {domSkills: skills.map(skill => new DomSkill(skill.id, skill))}
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/base.variables";
  @import "../../../assets/css/base.mixins";

  .title-wrapper {
    display: flex;
    align-items: center;
  }

  .title-page {
    flex-grow: 1;
  }

  .input-wrapper {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  .name-wrapper {
    margin: 0;
  }

  .level-wrapper {
    margin: 0 0 0 15px;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .button-mobile-wrapper {
    flex-grow: 1;
    display: flex;
  }

  .button {
    margin: 0 0 0.5rem 0.5rem;
    padding: 10px 15px;
    font-size: 1rem;
    @include flex-center();

    &:hover {
      cursor: pointer;
    }
  }

  .button-mobile {
    @extend .button;
    margin: 0 0.5rem 0.5rem 0;
  }

  .line-indicator {
    margin: 0;
    border-top: 2px solid $blue-main;
    @include box-shadow(0, 0, 5px, $blue-main);
  }

  .button-submit-wrapper {
    padding-top: 40px;
    text-align: right;
  }

  .button-save {
    padding: 0 40px;
  }
</style>
