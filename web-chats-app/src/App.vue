<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- <template>
  <div class="login" v-if="state.username === '' || state.username === null">
    <form class="login-form" @submit="login">
      <div class="login-inner">
        <h1>Welcome to firechats</h1>
        <label for="userName">Username:</label>
        <input
          type="text"
          v-model="inputUsername"
          placeholder="Please Enter your Username"
        />
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>
  <div class="chat" v-else>
    <header>
      <button class="logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>
    <section class="chatboox">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="message.username == state.username ? 'message current-user' : 'message'"
      >
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>

      <span>{{ inputMessage }}</span>
    </section>
    <footer>
      <form @submit.prevent="SendMessage()">
        <input
          class="footer"
          type="text"
          v-model="inputMessage"
          placeholder="Write a Message......"
        />
        <input class="footerbtn" type="submit" value="send" />
      </form>
    </footer>
  </div>
</template>
<script>
import { getDatabase, set } from "firebase/database";
import { reactive, ref } from "vue";
// import { database } from "./database";

import { firebase } from "./db.js";

export default {
  setup() {
    const inputUsername = ref("");
    const inputMessage = ref("");
    const state = reactive({
      username: "",
      messages: [],
    });
    const login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    };
    const Logout = () => {
      state.username = "";
    };
    const SendMessage = () => {
      firebase.intializeApp();
      const db = getDatabase();
      console.log(db);
      set(ref(db, "message"), {
        username: state.username,
        content: inputMessage.value,
      });
      inputMessage.value = "";
    };
    // const SendMessage = () => {
    //   const database = getDatabase()
    //   console.log(database)
    //   const messagesRef = db.database.ref("messages");
    //   if (inputMessage.value === "" || inputMessage.value === null) {
    //     return;
    //   }
    //   const message = {
    //     username: "state.username",
    //     content: "inputMessage.value"
    //   }
    //   messagesRef.value.push(message);
    //   inputMessage.value = "";
    // }
    // onMounted(() => {
    //   const messagesRef = db.database().ref("messages");
    //   messagesRef.on('value', snapshot => {
    //     const data = snapshot.val();
    //     let messages = [];
    //     Object.keys(data).forEach(key => {
    //       messages.push({
    //         id: key,
    //         username: data[key].username,
    //         content: data[key].content
    //       });
    //     });
    //     state.messages = messages;
    //   });
    // });
    return {
      inputUsername,
      login,
      state,
      inputMessage,
      SendMessage,
      Logout,
    };
  },
};
</script> -->
<!-- <template>
  <div class="view login" v-if="state.username === '' || state.username === null">
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Login to FireChat</h1>
        <label for="username">Username</label>
        <input
          type="text"
          v-model="inputUsername"
          placeholder="Please enter your username..."
        />
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>

  <div class="view chat" v-else>
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>

    <section class="chat-box">
      <div
        v-for="messages in state.messages"
        :key="messages.key"
        :class="messages.username == state.username ? 'message current-user' : 'message'"
      >
        <div class="message-inner">
          <div class="username">{{ messages.username }}</div>
          <div class="content">{{ messages.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="SendMessage()">
        <input type="text" v-model="inputMessage" placeholder="Write a message..." />
        <input type="submit" value="Send" />
      </form>
    </footer>
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
    // const updatemessages = vueref("");

    const state = reactive({
      username: "",
      messages: [],
    });
    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    };
    const Logout = () => {
      state.username = "";
    };
    const SendMessage = () => {
      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      set(ref(database, "/messages"), {
        username: state.username,
        content: inputMessage.value,
      });

      inputMessage.value = "";
    };
    onMounted(() => {
      const messagesRef = ref(database, "/messages");
      // console.log(database);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
          });
        });
        console.log(state.messages);
        // updatemessages(messages, data);
      });
    });
    return {
      inputUsername,
      Login,
      state,
      inputMessage,
      SendMessage,
      Logout,
      // updatemessages,
    };
  },
};
</script> -->
<template>
  <div class="view login" v-if="state.username === '' || state.username === null">
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Login to FireChat</h1>
        <label for="username">Username</label>
        <input
          type="text"
          v-model="inputUsername"
          placeholder="Please enter your username..."
        />
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>

  <div class="view chat" v-else>
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>

    <section>
      <div v-for="messages in state.messages" :key="messages.key">
        {{ messages.username }} : {{ messages.content }}
      </div>
    </section>

    <footer>
      <form @submit.prevent="SendMessage()">
        <input type="text" v-model="inputMessage" placeholder="Write a message..." />
        <input type="submit" value="Send" />
      </form>
    </footer>
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
    // const updatemessages = vueref("");
    // let username = vueref("");
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
      // console.log(inputMessage.value);
      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      let id = Math.random();
      id = id.toString().split("").splice(2, 6).join("");
      console.log(id);
      set(ref(database, `messages/` + id), {
        username: state.username,
        content: inputMessage.value,
      });

      inputMessage.value = "";
    };
    onMounted(() => {
      const messagesRef = ref(database, "messages/");
      // console.log(database);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();

        state.messages = data;
      });
    });
    return {
      inputUsername,
      Login,
      state,
      inputMessage,
      SendMessage,
      Logout,
      // updatemessages,
    };
  },
};
</script>
<style>
* {
  margin: 0%;
  padding: 0%;
}

.logout {
  float: right;
}
section {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.login {
  width: 100vw;
  height: 100vh;
  background-color: rgb(213, 250, 176);
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
  height: 25vh;
  padding-bottom: 20px;
  background-color: antiquewhite;
  flex-wrap: wrap;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  padding: 10px;
}

.chat {
  width: 100vw;
  height: 100vh;
  background-color: rgb(226, 239, 237);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10pxa;
}

header {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

button.logout {
  float: right;
}

section {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

footer {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.footer {
  width: 85vw;
  height: 5vh;
}

.footerbtn {
  width: 10vw;
  height: 5vh;
  background-color: rgb(148, 245, 148);
  border: none;
}
</style>
