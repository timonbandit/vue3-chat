<template>
  <div class="vue-chat">
    <div v-if="chatIsFull">
      <h1>Sorry, chat is full</h1>
    </div>
    <div v-else>
      <chat-welcome @auth-user="authUser" />
      <chat-header>
        {{ interlocutor }}
      </chat-header>
      <chat-message-box :messages="messages" :userName="userName" />
      <chat-send-form @send-message="sendMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import chatWelcome from "./components/chatWelcome.vue";
import chatHeader from "./components/chatHeader.vue";
import chatMessageBox from "./components/chatMessageBox.vue";
import chatSendForm from "./components/chatSendForm.vue";
import Messages from "./api/messageProvider";

export default defineComponent({
  setup() {
    const API = new Messages();
    let messages = ref(API.getMessages());
    let userName = ref("");
    let interlocutor = ref("");
    let chatIsFull = ref(true);

    let sendMessage = (message: string) => {
      API.sendMessage({
        userName: userName.value,
        content: message,
        time: formatTime(new Date()),
      });

      updateMessage();
    };

    let updateMessage = () => {
      messages.value = API.getMessages();
    };

    let authUser = (name: string) => {
      API.setUserName(name);
      userName.value = name;
      getInterlocutorName();
    };

    let getInterlocutorName = () => {
      let users: Array<string>;
      users = API.getUsersNames();
      interlocutor.value = users.filter((user) => user !== userName.value)[0];
      console.log(interlocutor.value);
    };

    let formatTime = (time: Date) => {
      return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    };

    let checkIfChatIsFull = () => {
      chatIsFull.value = API.getUsersNames().length === 2;
    };

    onBeforeMount(() => {
      checkIfChatIsFull();

      window.addEventListener("storage", () => {
        updateMessage();
        getInterlocutorName();
      });

      window.addEventListener("beforeunload", function (event) {
        API.logOut(userName.value);
      });
    });

    return {
      messages,
      sendMessage,
      authUser,
      userName,
      interlocutor,
      chatIsFull,
    };
  },
  components: {
    chatWelcome,
    chatHeader,
    chatMessageBox,
    chatSendForm,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.vue-chat {
  position: fixed;
  bottom: 0;
  right: 10px;
  display: flex;
  flex-flow: column wrap;
  width: 400px;
  min-height: 300px;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  box-shadow: -1px 0 8px rgba(0, 0, 0, 0.34);
}
</style>
