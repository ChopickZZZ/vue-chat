<template>
  <form class="join" @submit.prevent="chatEnter">
    <input
      :class="['join__input', { invalid: roomIdErr }]"
      type="text"
      placeholder="ID комнаты"
      v-model="roomId"
      @blur="roomIdBlur"
    />
    <small class="join__err" v-if="roomIdErr">{{ roomIdErr }}</small>
    <input
      :class="['join__input', { invalid: usernameErr }]"
      type="text"
      placeholder="Ваше имя"
      v-model="username"
      @blur="usernameBlur"
    />
    <small class="join__err" v-if="usernameErr">{{ usernameErr }}</small>
    <button class="join__btn btn" :disabled="isSubmitting">
      {{ isSubmitting ? "Вход..." : "Войти" }}
    </button>
  </form>
</template>

<script>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useChatStore } from "@/stores/chat";
export default {
  setup(_, { emit }) {
    const { handleSubmit, isSubmitting } = useForm();
    const {
      value: roomId,
      errorMessage: roomIdErr,
      handleBlur: roomIdBlur,
    } = useField(
      "roomId",
      yup
        .string()
        .trim()
        .required("Это поле обязательно")
        .min(3, "Введите минимум 3 символа")
    );
    const {
      value: username,
      errorMessage: usernameErr,
      handleBlur: usernameBlur,
    } = useField(
      "username",
      yup
        .string()
        .trim()
        .required("Это поле обязательно")
        .min(3, "Введите минимум 3 символа")
    );
    const storeChat = useChatStore();

    const chatEnter = handleSubmit(({ roomId, username }) => {
      storeChat.setRoomId(roomId);
      emit("enter", { roomId, username });
    });

    return {
      roomId,
      username,
      roomIdErr,
      usernameErr,
      roomIdBlur,
      usernameBlur,
      chatEnter,
      isSubmitting,
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

.join__input.invalid {
  border: 1px solid red;
  margin-bottom: 0.3rem;
}

.join__input::placeholder {
  font-size: 14px;
}

.join__err {
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
}
</style>