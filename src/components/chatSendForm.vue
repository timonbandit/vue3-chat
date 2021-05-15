<template>
  <form @submit.prevent="sendMessage" class="vue-chat__form">
    <input
      type="text"
      placeholder="Type your message"
      required
      v-model="message"
    />
    <button type="submit">Send</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup(props, { emit }) {
    let message = ref("");

    function sendMessage() {
      emit("send-message", message.value);
      message.value = "";
    }

    return { message, sendMessage };
  },
});
</script>

<style lang="scss">
$btn-width: 50px;

.vue-chat__form {
  width: 100%;
  max-width: 100%;
  height: 40px;
  display: flex;
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.34);

  input {
    width: calc(100% - #{$btn-width});
    padding: 10px 0;
    border-radius: 0;
    appearance: none;
    border: none;
    text-indent: 10px;

    &:focus {
      outline: none;
    }
  }

  button {
    margin-right: 10px;
    background: #cbcbcb;
    border: none;
    color: #fff;
    padding: 0;
    text-align: center;
    width: $btn-width;
  }
}
</style>