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
    <button class="join__btn">Войти</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup(_, { emit }) {
    const roomId = ref("");
    const username = ref("");
    const store = useStore();

    const chatEnter = () => {
      store.commit("setRoomIdAndUsername", {
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

.join__btn {
  display: inline-flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #533a27;
  border: 1px solid #352315;
  color: #fff;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s ease;
}
.join__btn:hover {
  background-color: #352315;
  border-color: #351f0d;
}
</style>