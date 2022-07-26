<template>
  <JoinForm v-if="!isJoined" @enter="enterChat" />
  <ChatInterface v-else :users="users" />
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

    socket.on("setUsers", (users) => {
      store.commit("setUsers", users);
    });

    const actualUsers = computed(() => store.getters.getUsers);

    return {
      isJoined,
      enterChat,
      users: actualUsers,
    };
  },
  components: { JoinForm, ChatInterface },
};
</script>

<style scoped>
</style>