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
import { useStore } from "vuex";
import axios from "axios";
import socket from "@/utils/socket";
import JoinForm from "@/components/JoinForm";
import ChatInterface from "@/components/ChatInterface";
export default {
  setup() {
    const isJoined = ref(false);
    const store = useStore();

    const enterChat = async (info) => {
      await axios.post(`http://localhost:3000/rooms`, info);
      isJoined.value = true;
      socket.emit("join", info);

      const { data } = await axios.get(
        `http://localhost:3000/rooms/${info.roomId}`
      );
      store.commit("setUsers", data.users);
    };

    const sendMessage = (text) => {
      store.commit("addMessage", { text, username: store.state.username });
      socket.emit("newMessage", {
        roomId: store.state.roomId,
        username: store.state.username,
        text,
      });
    };

    socket.on("setUsers", (users) => {
      store.commit("setUsers", users);
    });

    socket.on("newMessage", (messageInfo) => {
      store.commit("addMessage", messageInfo);
    });

    socket.on("loadMessages", (messages) => {
      console.log(messages);
      store.commit("loadAllMessages", messages);
    });

    const users = computed(() => store.getters.getUsers);
    const messages = computed(() => store.getters.getMessages);

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