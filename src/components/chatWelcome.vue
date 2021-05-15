<template>
  <form v-if="isVisible" @submit.prevent="authUser" class="vue-chat__welcome">
    <h1>Welcome</h1>

    <input
      placeholder="Enter your name"
      type="text"
      required
      class="vue-chat__welcome-input"
      v-model="name"
    />
    <button type="submit">Enter</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    let name = ref("");
    let isVisible = ref(true);

    let authUser = () => {
      emit("auth-user", name.value);
      isVisible.value = false;
    };

    return { name, isVisible, authUser };
  },
});
</script>

<style lang="scss">
.vue-chat {
  &__welcome {
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    background: white;
  }
}
</style>
