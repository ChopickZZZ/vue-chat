<template>
  <form class="join">
    <input class="join__input" type="text" placeholder="ID комнаты" />
    <input class="join__input" type="text" placeholder="Ваше имя" />
    <button class="join__btn">Войти</button>
  </form>
</template>

<script>
export default {};
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
  background-color: rgb(0, 153, 77);
  color: #fff;
  letter-spacing: 1px;
  border: 1px solid rgb(0, 99, 49);
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s ease;
}
.join__btn:hover {
  background-color: rgb(1, 114, 57);
  border-color: rgb(0, 87, 43);
}
</style>