<template>
  <div class="chat">
    <div class="chat__users users">
      <h2 class="users__count">
        {{ users.length }} {{ users.length > 1 ? "Users" : "User" }}
      </h2>
      <hr style="margin-bottom: 1rem" />
      <ul class="users__list">
        <li class="users__user" v-for="user in users" :key="user">
          {{ user }}
        </li>
      </ul>
    </div>
    <div class="chat__messages messages">
      <ul class="messages__list" ref="messageContainer">
        <li
          :class="[
            'messages__item',
            {
              messages__item_right: message.username === storeChat.username,
            },
          ]"
          v-for="message in messages"
          :key="message"
        >
          <span class="messages__text">{{ message.text }}</span>
          <small class="messages__sender">{{ message.username }}</small>
        </li>
      </ul>
      <form class="messages__form" @submit.prevent="sendMessage">
        <textarea
          class="messages__area"
          v-focus
          v-model="textMessage"
          placeholder="Введите сообщение"
        ></textarea>
        <button class="messages__btn btn">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useChatStore } from "@/stores/chat";
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    messages: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    const storeChat = useChatStore();
    const messageContainer = ref(messageContainer);
    const textMessage = ref("");

    const sendMessage = () => {
      if (textMessage.value) {
        emit("send", textMessage.value);
        textMessage.value = "";
      }
    };

    watch(props.messages, () => {
      setTimeout(() => {
        messageContainer.value.scrollTo({
          top: 99999,
          left: 0,
          behavior: "smooth",
        });
      }, 0);
    });

    return {
      textMessage,
      sendMessage,
      messageContainer,
      storeChat,
    };
  },
};
</script>

<style scoped>
.chat {
  width: 700px;
  height: 550px;
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
}

.chat__users {
  flex: 0 1 25%;
  background-color: var(--color-brown-primary);
  padding: 1.2rem 1rem;
}

.users__count {
  font-size: 1.3rem;
  color: rgb(179, 174, 174);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.users__user {
  background-color: var(--color-brown-grey);
  color: #fff;
  padding: 0.35rem 0.35rem 0.35rem 0.75rem;
  border-radius: 5px;
  overflow: hidden;
}

.users__user:not(:last-child) {
  margin-bottom: 0.5rem;
}

.chat__messages {
  flex: 0 1 75%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.messages__list {
  flex: 0 0 70%;
  max-height: 100%;
  padding-right: 1rem;
  padding-bottom: 0.75rem;
  overflow: auto;
}

.messages__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.messages__item_right {
  align-items: flex-end;
}

.messages__item:not(:last-child) {
  margin-bottom: 1rem;
}

.messages__item span {
  color: #fff;
  font-size: 13px;
  padding: 0.55rem;
  background-color: #b28451;
  border-radius: 10px;
  margin-bottom: 0.4rem;
}

.messages__item small {
  padding-left: 0.2rem;
  color: #666;
  font-size: 12px;
}

.messages__form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.75rem 0;
  position: relative;
}

.messages__form::before {
  content: "";
  width: 100%;
  height: 1px;
  background-color: var(--color-brown-grey);
  position: absolute;
  top: 0;
  left: 0;
}

.messages__area {
  font-size: 0.9rem;
  color: var(--color-brown-grey);
  width: 90%;
  min-height: 100px;
  border: 1px solid #888;
  border-radius: 3px;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.messages__area::placeholder {
  font-size: 0.9rem;
  color: var(--color-brown-grey);
}
</style>