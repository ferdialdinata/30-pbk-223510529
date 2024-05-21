<template>
  <div class="background"></div>
  <div id="app">
    <!-- Header -->
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item" @click="showTodos" :class="{ active: activeMenu === 'todos' }">
              <a class="nav-link">Todos</a>
            </li>
            <li class="nav-item" @click="showPosts" :class="{ active: activeMenu === 'posts' }">
              <a class="nav-link">Posts</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <div class="container mt-5">
      <main>
        <TodoList
          v-if="activeMenu === 'todos'"
          :todos="todos"
          :hideCompleted="hideCompleted"
          @add-todo="addTodo"
          @remove-todo="removeTodo"
          @toggle-hide-completed="toggleHideCompleted"
        />
        <PostList
          v-else-if="activeMenu === 'posts'"
          :users="users"
        />
      </main>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';
import PostList from './components/PostList.vue';

export default {
  name: 'App',
  components: {
    TodoList,
    PostList
  },
  data() {
    return {
      activeMenu: 'todos',
      hideCompleted: false,
      todos: [
        { id: 1, text: 'Belajar JavaScript', done: true },
        { id: 2, text: 'Belajar HTML', done: true },
        { id: 3, text: 'Belajar Desain', done: false }
      ],
      users: []
    };
  },
  methods: {
    showTodos() {
      this.activeMenu = 'todos';
    },
    showPosts() {
      this.activeMenu = 'posts';
    },
    addTodo(todo) {
      this.todos.push(todo);
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(t => t !== todo);
    },
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    }
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });
  }
};
</script>

<style scoped>
.header {
  background-size: cover;
  padding: 15px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
}
.navbar {
  position: fixed;
  top: 10%;
  left: 40%;
}
.background {
  position: fixed;
  background-image: url('./assets/image.png');
  top: 0;
  left: 0;
  min-height: 90%;
  min-width: 1500px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  object-fit: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.form-inline{
  display: flex;
}
nav ul li {
  margin: 0 20px;
  padding: 10px 20px;
  cursor: pointer;
}

nav ul li.active {
  background-color: #1E90FF;
  border-radius: 5px;
}

nav ul li:hover {
  background-color: #444;
  border-radius: 5px;
}

nav ul li.active a,
nav ul li:hover a {
  color: white;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.text h3 {
  margin-right: 100px;
  font-weight: bold;
}
</style>
