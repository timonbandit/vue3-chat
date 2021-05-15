<template>
  <div class="vue-chat__header">
    <img
      src="https://placekitten.com/30/30"
      alt=""
      class="vue-chat__header-img"
    />
    <span class="vue-chat__header-name">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss">
.vue-chat {
  &__header {
    display: flex;
    height: 50px;
    background: #e0dddd;
    align-items: center;
    justify-content: center;

    &-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    &-name {
      margin-left: 20px;
    }
  }
}
</style>