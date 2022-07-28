<template>
  <JoinForm v-if="!isJoined" @enter="enterChat" />
  <ChatInterface
    v-else
    :users="users"
    :messages="messages"
    @send="sendMessage"
  />
</template>

<script>
import { computed, ref } from "vue";
import { useChatStore } from "@/stores/chat";
import axios from "axios";
import socket from "@/utils/socket";
import JoinForm from "@/components/JoinForm";
import ChatInterface from "@/components/ChatInterface";
export default {
  setup() {
    const isJoined = ref(false);
    const storeChat = useChatStore();

    const enterChat = async (info) => {
      await axios.post(`http://localhost:3000/rooms`, info);
      isJoined.value = true;
      socket.emit("join", info);

      const { data } = await axios.get(
        `http://localhost:3000/rooms/${info.roomId}`
      );
      storeChat.setActualUser(data.users[data.users.length - 1]);
      storeChat.setUsers(data.users);
    };

    const sendMessage = (text) => {
      storeChat.addMessage({ text, username: storeChat.username });
      socket.emit("newMessage", {
        roomId: storeChat.roomId,
        username: storeChat.username,
        text,
      });
    };

    socket.on("setUsers", (users) => {
      storeChat.setUsers(users);
    });

    socket.on("newMessage", (messageInfo) => {
      storeChat.addMessage(messageInfo);
    });

    const users = computed(() => storeChat.getUsers);
    const messages = computed(() => storeChat.getMessages);

    return {
      isJoined,
      enterChat,
      sendMessage,
      users,
      messages,
    };
  },
  components: { JoinForm, ChatInterface },
};
</script>

<style scoped>
</style>