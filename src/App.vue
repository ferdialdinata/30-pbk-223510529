<template>
  <div id="app">
    <!-- Header -->
    <header>
      <nav>
        <ul>
          <li @click="showTodos" :class="{ active: activeMenu === 'todos' }">Todos</li>
          <li @click="showPosts" :class="{ active: activeMenu === 'posts' }">Posts</li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <div class="container">
      <main>
        <div v-if="activeMenu === 'todos'">
          <!-- Fitur Todos -->
          <h2>Todos</h2>
          <form @submit.prevent="addTodo">
            <input v-model="newTodo" placeholder="Tambahkan Kegiatan" class="input">
            <button class="button">Tambahkan</button>
          </form>
          <ul class="todo-list">
            <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
              <input type="checkbox" v-model="todo.done">
              <span :class="{ done: todo.done }">{{ todo.text }}</span>
              <button @click="removeTodo(todo)" class="button">X</button>
            </li>
          </ul>
          <button @click="hideCompleted = !hideCompleted" class="button">
            {{ hideCompleted ? 'Semua Kegiatan' : 'Kegiatan Belum Selesai' }}
          </button>
        </div>
        <div v-else-if="activeMenu === 'posts'">
          <!-- Fitur Postingan -->
          <h2>Postingan</h2>
          <select v-model="selectedUser" class="select">
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
          <div v-if="selectedUser" class="posts">
            <div v-for="post in filteredPosts" :key="post.id" class="post">
              <h3>{{ post.title }}</h3>
              <p>{{ post.body }}</p>
            </div>
          </div>
          <div v-else class="no-selection">
            <p>Silakan pilih pengguna untuk melihat postingan mereka.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeMenu: 'todos',
      newTodo: '',
      hideCompleted: false,
      todos: [
        { id: 1, text: 'Belajar JavaScript', done: true },
        { id: 2, text: 'Belajar HTML', done: true },
        { id: 3, text: 'Belajar Desain', done: false }
      ],
      users: [],
      posts: [],
      selectedUser: null
    };
  },
  methods: {
    showTodos() {
      this.activeMenu = 'todos';
    },
    showPosts() {
      this.activeMenu = 'posts';
    },
    addTodo() {
      if (this.newTodo.trim() === '') {
        return;
      }
      this.todos.push({ id: Date.now(), text: this.newTodo, done: false });
      this.newTodo = '';
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(t => t !== todo);
    }
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        this.posts = data;
      });
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted ? this.todos.filter(todo => !todo.done) : this.todos;
    },
    filteredPosts() {
      return this.posts.filter(post => post.userId === parseInt(this.selectedUser));
    }
  }
};
</script>

<style scoped>
/* Header styles */
header {
  background: #1E90FF;
  padding: 15px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin: 0 20px;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
}

nav ul li.active {
  background-color: #444;
  border-radius: 5px;
}

nav ul li:hover {
  background-color: #555;
  border-radius: 5px;
}

/* Main container */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  padding: 20px;
  background: url('https://t3.ftcdn.net/jpg/03/65/64/88/360_F_365648870_rXciKuouH91ahMZE9mh6PlaZWYbBYSPF.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
}

main {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Todo specific styles */
ul.todo-list {
  padding: 0;
  margin: 0;
}

li.todo-item {
  list-style: none;
  margin-bottom: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
}

.done {
  text-decoration: line-through;
}

.input {
  padding: 10px;
  width: 80%;
  border: 2px solid #1E90FF;
  border-radius: 5px;
  margin-right: 10px;
}

.button {
  padding: 10px;
  background-color: #1E90FF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #007FFF;
}

.select {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
}

.posts {
  margin-top: 20px;
}

.post {
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  margin-bottom: 20px;
}

.no-selection {
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}
</style>
