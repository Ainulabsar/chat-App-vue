<template>
  <div class="login" v-if="state.username === '' || state.username === null">
    <form class="login-form" @submit.prevent="Login">
      <div class="login-inner {">
        <h1>Login to FireChat</h1>
        <label for="username">Username</label>
        <input
          type="text"
          class="txt"
          v-model="inputUsername"
          placeholder="Please enter your username..."
        />
        <input type="submit" class="lgn" value="Login" />
      </div>
    </form>
  </div>
  <div class="chat" v-else>
    <div class="header">
      <button class="logout" @click="Logout">Logout</button>
      <h2>Welcome, {{ state.username }}</h2>
    </div>

    <div class="chat-box">
      <div
        class="msgs"
        v-for="messages in state.messages"
        :key="messages.key"
        :class="
          messages.username == state.username ? 'messages current-user' : 'messages'
        "
      >
        <div class="message-inner">
          <div class="username">{{ messages.username }}</div>
          <div class="content">{{ messages.content }}</div>
          <div class="time">{{ messages.time }}</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <form @submit.prevent="SendMessage">
        <input
          class="inputMsg"
          type="text"
          v-model="inputMessage"
          placeholder="Write a message..."
        />
        <input class="send" type="submit" value="Send" />
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref as vueref } from "vue";
import { set, onValue, ref } from "firebase/database";
import { database } from "./db";

export default {
  setup() {
    const inputUsername = vueref("");
    const inputMessage = vueref("");
    const state = reactive({
      username: "",
      messages: [],
    });
    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
      }
    };
    const Logout = () => {
      state.username = "";
    };
    const SendMessage = () => {
      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }

      let id = Math.random();
      id = id.toString().split("").splice(2, 6).join("");
      set(ref(database, `messages/` + id), {
        username: state.username,
        content: inputMessage.value,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now(),
      });

      inputMessage.value = "";
    };

    onMounted(() => {
      const messagesRef = ref(database, "messages/");
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        state.messages = data;
        let stmsg = Object.values(state.messages);
        stmsg.sort((a, b) => a.timestamp - b.timestamp);
        console.log(stmsg);
        state.messages = stmsg;
      });
    });
    return {
      inputUsername,
      Login,
      state,
      inputMessage,
      SendMessage,
      Logout,
    };
  },
};
</script>
<style>
* {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.logout {
  position: static;
  display: flex;
  flex-wrap: wrap;
  color: black;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  text-align: center;
}
section {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.content {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f3f3f3;
  border-radius: 999px;
  color: #333;
  font-size: 18px;
  line-height: 1.2em;
  text-align: left;
}
.time {
  display: flex;
  font-size: 10px;
  float: left;
  justify-content: center;
  align-items: flex-end;
}
.msgs.messages.current-user {
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.msgs.messages.current-user .message-inner {
  max-width: 85%;
  color: #ed4545;
}

.msgs.messages.current-user .content {
  color: #fff;
  font-weight: 600;
  background-color: #ea526f;
}

.username {
  color: #888;
  font-size: 16px;
  float: left;
  margin-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
}
.message-inner {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
  max-width: 75%;
}
.lgn {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #ea526f;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
.chat-box {
  border-radius: 24px 24px 0px 0px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
  flex: 1 1 100%;
  flex-wrap: wrap;
  padding: 30px;
}
.txt {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;

  color: #333;
  font-size: 18px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  background-color: #f3f3f3;
  transition: 0.4s;
}
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 10px;
}
.login-inner {
  width: 50vw;
  height: 100%;
  padding-bottom: 20px;
  background-color: rgb(248, 212, 13);
  flex-wrap: wrap;
  display: block;
  padding: 50px 15px;
  border-radius: 16px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  padding: 10px;
}

.chat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: #ea526f;
}

.header {
  position: relative;
  display: block;
  width: 100%;
  padding: 10px 30px 10px;
}

button.logout {
  float: right;
}
.footer {
  width: 100vw;
  position: sticky;
  bottom: 0px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
}
form {
  display: flex;
}
h1 {
  color: rgb(33, 33, 33);
  font-size: 28px;
  margin-bottom: 30px;
}
h2 {
  color: rgb(249, 243, 243);
  font-size: 28px;
}
label {
  display: block;
  margin-bottom: 5px;
  color: rgb(33, 33, 33);
  font-size: 16px;
  transition: 0.4s;
}
.inputMsg {
  flex: 1 1 100%;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px 0px 0px 8px;

  color: #333;
  font-size: 18px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  background-color: #f3f3f3;
  transition: 0.4s;
}
.send {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  padding: 10px 15px;
  border-radius: 0px 8px 8px 0px;
  background-color: #ea526f;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
</style>
