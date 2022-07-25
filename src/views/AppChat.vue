<template>
  <JoinForm v-if="isJoined" />
  <ChatInterface v-else />
</template>

<script>
import { ref } from "vue";
import JoinForm from "@/components/JoinForm";
import ChatInterface from "@/components/ChatInterface";
export default {
  setup() {
    const isJoined = ref(false);

    return { isJoined };
  },
  components: { JoinForm, ChatInterface },
};
</script>

<style scoped>
</style>