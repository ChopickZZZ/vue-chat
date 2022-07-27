<template>
  <div class="chat">
    <div class="chat__users users">
      <h3 class="users__count">{{ users.length }} users</h3>
      <ul class="users__list">
        <li class="users__user" v-for="user in users" :key="user">
          {{ user }}
        </li>
      </ul>
    </div>
    <div class="chat__messages messages">
      <ul class="messages__list">
        <li class="messages__item" v-for="message in messages" :key="message">
          <span class="messages__text">{{ message.text }}</span>
          <small class="messages__sender">{{ message.username }}</small>
        </li>
      </ul>
      <form class="messages__bottom" @submit.prevent="sendMessage">
        <textarea class="messages__area" v-model="textMessage"></textarea>
        <button class="messages__btn">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  setup(_, { emit }) {
    const store = useStore();
    const textMessage = ref("");
    const sendMessage = () => emit("send", textMessage);

    const messages = computed(() => store.getters.getMessages);

    return {
      textMessage,
      sendMessage,
      messages,
    };
  },
};
</script>

<style scoped>
.chat {
  min-width: 700px;
  min-height: 500px;
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
}
.chat__users {
  flex: 0 1 25%;
  background-color: #eaeaea;
  padding: 1.2rem 1rem;
}
.users__count {
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.users__user {
  background-color: #fff;
  padding: 0.3rem;
  border-radius: 5px;
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
  flex: 0 1 70%;
  max-height: 100%;
  overflow: auto;
}
.messages__item {
  display: flex;
  flex-direction: column;
  max-width: 75%;
}
.messages__item:not(:last-child) {
  margin-bottom: 1rem;
}
.messages__item span {
  color: #fff;
  font-size: 13px;
  padding: 0.7rem;
  background-color: rgb(0, 153, 77);
  border-radius: 10px;
  margin-bottom: 0.4rem;
}
.messages__item small {
  padding-left: 0.2rem;
  color: #666;
  font-size: 12px;
}
.messages__bottom {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.messages__area {
  width: 90%;
  min-height: 100px;
  border: 1px solid #888;
  border-radius: 3px;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
.messages__btn {
  display: inline-flex;
  padding: 0.5rem 0.75rem;
  background-color: rgb(0, 153, 77);
  color: #fff;
  letter-spacing: 1px;
  border: 1px solid rgb(0, 99, 49);
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s ease;
}
.messages__btn:hover {
  background-color: rgb(1, 114, 57);
  border-color: rgb(0, 87, 43);
}
</style>