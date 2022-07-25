<template>
  <div class="chat">
    <div class="chat__users users">
      <h3 class="users__count">Users (1):</h3>
      <ul class="users__list">
        <li class="users__user">Test User</li>
      </ul>
    </div>
    <div class="chat__messages messages">
      <div class="messages__top">
        <ul class="messages__list">
          <li class="messages__item">
            <span class="messages__text"
              >Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span
            >
            <small class="messages__sender">Test User</small>
          </li>
          <li class="messages__item">
            <span class="messages__text"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.</span
            >
            <small class="messages__sender">Test User</small>
          </li>
        </ul>
      </div>
      <form class="messages__bottom">
        <textarea class="messages__area"></textarea>
        <button class="messages__btn">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
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
.messages__top {
  flex: 0 1 70%;
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
  justify-content: start;
  align-items: start;
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