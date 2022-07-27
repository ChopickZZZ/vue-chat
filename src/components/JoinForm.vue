<template>
  <form class="join" @submit.prevent="chatEnter">
    <input
      class="join__input"
      type="text"
      placeholder="ID комнаты"
      v-model="roomId"
    />
    <input
      class="join__input"
      type="text"
      placeholder="Ваше имя"
      v-model="username"
    />
    <button class="join__btn btn">Войти</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useChatStore } from "@/stores/chat";
export default {
  setup(_, { emit }) {
    const roomId = ref("");
    const username = ref("");
    const storeChat = useChatStore();

    const chatEnter = () => {
      storeChat.setRoomIdAndUsername({
        roomId: roomId.value,
        username: username.value,
      });
      emit("enter", { roomId: roomId.value, username: username.value });
    };

    return {
      roomId,
      username,
      chatEnter,
    };
  },
};
</script>

<style>
.join {
  display: flex;
  flex-direction: column;
  min-width: 250px;
}

.join__input {
  padding: 0.5rem 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
}

.join__input::placeholder {
  font-size: 14px;
}
</style>