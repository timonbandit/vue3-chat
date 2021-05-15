<template>
  <div class="message-box" ref="messageBox">
    <div
      v-for="(message, key) in messages"
      :key="key"
      class="message-box__row"
      :class="{ 'message-box__row--not-my': isNotMyMessage(message.userName) }"
    >
      <div class="message">
        <span class="message__content">{{ message.content }}</span>
        <span class="message__time">{{ message.time }}</span>
        <img
          src="https://placekitten.com/30/30"
          class="message__avatar"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref } from "vue";
import { toRefs } from "@vue/reactivity";
import { MessageType } from "../types/message.interface";
import { PropType } from "@vue/composition-api";

export default defineComponent({
  props: {
    messages: {
      type: Array as PropType<MessageType[]>,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { messages, userName } = toRefs(props);
    const messageBox = ref<HTMLDivElement | null>(null);

    let isNotMyMessage = (messageUserName: string) => {
      return userName.value !== messageUserName;
    };

    let scrollToBottom = () => {
      if (messageBox.value) {
        messageBox.value.scrollTop = messageBox.value.scrollHeight;
      }
    };

    let showAvatar = () => {
      if (messageBox.value) {
        let lastMessages = messageBox.value.querySelectorAll(
          ".message-box__row--not-my"
        );

        if (lastMessages.length) {
          lastMessages.forEach((message) => {
            message.classList.remove("message-box__row--with-avatar");
          });

          lastMessages[lastMessages.length - 1].classList.add(
            "message-box__row--with-avatar"
          );
        }
      }
    };

    onUpdated(() => {
      scrollToBottom();
      showAvatar();
    });

    return { messages, userName, isNotMyMessage, messageBox };
  },
});
</script>

<style lang="scss">
$this: ".message";

.message-box {
  padding: 20px;
  height: 300px;
  max-height: 300px;
  overflow-y: auto;

  &__row {
    overflow: hidden;

    &--not-my {
      padding-left: 35px;

      #{$this} {
        background: #f2f2f2;
        float: left;
      }
    }

    &--with-avatar {
      #{$this}__avatar {
        display: block;
      }
    }
  }
}

.message {
  $this: &;
  position: relative;
  background: #e1f2f8;
  float: right;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;

  &__content {
    display: block;
    text-align: left;
    font-size: 14px;
  }

  &__time {
    color: #585858;
    font-size: 12px;
    display: block;
    text-align: left;
  }

  &__avatar {
    display: none;
    position: absolute;
    left: -35px;
    bottom: 0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
}
</style>