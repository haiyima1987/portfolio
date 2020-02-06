<template>
  <div class="form-wrapper">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(validateFormData)">
        <slot/>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {ValidationObserver} from "vee-validate";

  export default {
    name: 'FormWrapper',
    components: {
      ValidationObserver
    },
    props: {
      sendFormData: {
        type: Function
      }
    },
    computed: {
      ...mapGetters({
        formData: 'getFormData'
      })
    },
    methods: {
      validateFormData: function () {
        // send the data to the parent
        this.$props.sendFormData(this.formData)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  $backgroundColor: white;
  $borderColor: $grey-pale-c;
  $titleColor: $grey-dark-1;
  $textColor: $grey-medium-4;
  $placeholderColor: $grey-pale-c;
  $mainColor: $green-main-1;
  $indicatorColor: $grey-pale-c;

  /* form elements */
  input, select, textarea {
    width: 100%;

    @include placeholder {
      color: $placeholderColor;
    }

    &:focus {
      outline: none;
    }
  }

  label {
    width: 100%;
  }

  input {
    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }

  input[type="date"] {
    &::-webkit-input-placeholder {
      visibility: hidden !important;
    }
  }

  input[type="number"] {
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }

  textarea {
    resize: none;

    /* set the width to 0.1px so it is not visible but the scrolling function still exists */
    &::-webkit-scrollbar {
      width: 0.1px;
    }
  }

  .form-input-title {
    padding-left: 15px;
    text-align: left;
    color: $titleColor;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .form-input {
    padding: 0 15px;
    height: 40px;
    border: 1px solid $borderColor;
    border-radius: 4px;
    background-color: $backgroundColor;
    color: $textColor;
  }

  .form-input-textarea {
    padding: 15px 20px;
    border: 1px solid $borderColor;
    border-radius: 8px;
    background-color: $backgroundColor;
    font-size: 1rem;
    color: $textColor;
  }

  .form-input-picker {
    padding: 0 15px;
    height: 40px;
    border: 1px solid $borderColor;
    border-radius: 4px;
    background-color: $backgroundColor;
    color: $textColor;
  }

  /* button submit */
  .button-submit-wrapper {
    padding-top: 40px;
    text-align: right;
  }

  .button-save {
    padding: 0 40px;
  }

  /* custom checkbox */
  .check-label {
    margin: 10px 0;
    display: block;
    position: relative;
    cursor: pointer;
    padding-left: 35px;
    color: $titleColor;
    line-height: 24px;
    @include user-select(none);

    &:checked {
      color: $mainColor;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      width: 0;

      &:checked ~ .check-mark {
        background-color: $mainColor;
        border: none;

        &:after {
          display: block;
        }
      }
    }

    .check-mark {
      @include position(absolute, $top: 2px, $left: 0);
      @include border-radius(4px);
      height: 20px;
      width: 20px;
      border: 2px solid $mainColor;
      background-color: white;

      &:after {
        content: "";
        display: none;
        @include position(absolute, $top: 2px, $left: 6px);
        width: 8px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        @include rotate(45deg);
      }
    }

    .check-mark-error {
      @extend .check-mark;
      border: 2px solid $red-main;
    }
  }

  .check-label-round {
    @extend .check-label;

    .check-mark {
      @include border-radius(50%);
    }
  }

  /* texts */
  .text-indicator-file {
    padding-left: 15px;
    color: $indicatorColor;
    font-style: italic;
  }

  .text-error {
    padding-left: 15px;
    color: $red-main;
    font-weight: 600;
  }

  .label-error {
    color: $red-main;
    border: 1px solid $red-main;
  }

  .field-error {
    color: $red-main;
    border-color: $red-main;
  }
</style>
