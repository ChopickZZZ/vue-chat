<template>
  <JoinForm v-if="!isJoined" @enter="enterChat" />
  <ChatInterface v-else />
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import socket from "@/utils/socket";
import JoinForm from "@/components/JoinForm";
import ChatInterface from "@/components/ChatInterface";
export default {
  setup() {
    const isJoined = ref(false);

    const enterChat = async (info) => {
      const { data } = await axios.post("http://localhost:3000/rooms", info);
      isJoined.value = true;
      socket.emit("joined", info);
      socket.on("joined", (users) => console.log("new user", users));
    };

    return { isJoined, enterChat };
  },
  components: { JoinForm, ChatInterface },
};
</script>

<style scoped>
</style>