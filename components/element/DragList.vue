<template>
  <div class="drag-list-wrapper">
    <div v-for="(dragItem, index) in dragItems" :key="dragItem.id"
         draggable="true"
         @dragstart="dragStart($event, index)"
         @dragover="dragOver($event)"
         @dragenter="dragEnter(index)"
         @dragleave="dragLeave(index)"
         @drop="dragFinish(index)"
         class="item-wrapper">
      <hr v-show="enteredIndex == index && isUpwards" class="line-indicator">
      <slot name="item"
            :item="dragItem"
            :index="index"/>
      <div class="button-group">
        <div v-if="isMobile" class="button-mobile-wrapper">
          <div @click="moveItemByOne(index, index - 1)">
            <slot name="buttonUp"/>
          </div>
          <div @click="moveItemByOne(index, index + 1)">
            <slot name="buttonDown"/>
          </div>
        </div>
        <div v-else
             @mousedown="setDragEffect(true)"
             @mouseup="setDragEffect(false)">
          <slot name="buttonDrag"/>
        </div>
        <div @click="editItem(dragItem.id)">
          <slot name="buttonEdit"/>
        </div>
        <div @click="deleteItem(dragItem.id)">
          <slot name="buttonDelete"/>
        </div>
      </div>
      <hr v-show="enteredIndex == index && !isUpwards" class="line-indicator">
    </div>
  </div>
</template>

<script>
  import DomHandler from "../../utils/DomHandler";

  export default {
    name: "dragItems",
    props: {
      dragItems: {
        required: true
      },
      headerHeight: {
        required: true
      },
      onEditClick: {
        required: false
      },
      onDeleteClick: {
        required: false
      }
    },
    data: () => ({
      isMobile: true,
      // drag and drop effects
      dragEnabled: false,
      startIndex: -1,
      enteredIndex: -1,
      // scrolling variables
      edgeHeight: 80,
      scrollEnabled: false,
      scroller: null,
      scrollInterval: 50,
      isUpwards: false,
      prevScreenY: 0
    }),
    methods: {
      editItem: function (id) {
        this.onEditClick(id)
      },
      deleteItem: function (id) {
        this.onDeleteClick(id)
      },
      dragStart: function (event, index) {
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
          this.dragItems[index].isHovered = true
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
          this.dragItems[index].isHovered = false
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
        this.dragItems.splice(to, 0, this.dragItems.splice(from, 1)[0])
      },
      moveItem: function (to) {
        if (this.startIndex != -1) {
          // get the reference of the destination element before manipulating
          let domSkill = this.dragItems[to]
          // re-order the list
          this.dragItems.splice(to, 0, this.dragItems.splice(this.startIndex, 1)[0])
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
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

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
</style>
