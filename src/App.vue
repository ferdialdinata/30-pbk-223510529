<template>
  <div id="app">
    <div class="background"></div>
    <!-- Header -->
    <header>
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <ul class="navbar-nav mx-auto">
            <!-- Link menu untuk Todos -->
            <li class="nav-item" @click="goTo('/todos')" :class="{ active: activeMenu === 'todos' }">
              <router-link to="/todos" class="nav-link">Todos</router-link>
            </li>
            <!-- Link menu untuk Posts -->
            <li class="nav-item" @click="goTo('/posts')" :class="{ active: activeMenu === 'posts' }">
              <router-link to="/posts" class="nav-link">Posts</router-link>
            </li>
            <!-- Link menu untuk Albums -->
            <li class="nav-item" @click="goTo('/albums')" :class="{ active: activeMenu === 'albums' }">
              <router-link to="/albums" class="nav-link">Albums</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <div class="container mt-5">
      <main>
        <!-- Router View untuk menampilkan komponen berdasarkan path -->
        <router-view :todos="todos" :hideCompleted="hideCompleted"
                     @add-todo="addTodo" @remove-todo="removeTodo" @toggle-hide-completed="toggleHideCompleted" />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeMenu: 'todos', // Menu aktif default
      hideCompleted: false,
      todos: [
        { id: 1, text: 'Belajar JavaScript', done: true },
        { id: 2, text: 'Belajar HTML', done: true },
        { id: 3, text: 'Belajar Desain', done: false }
      ]
    };
  },
  methods: {
    // Method untuk navigasi ke route tertentu
    goTo(path) {
      this.$router.push(path);
      this.activeMenu = path.substring(1); // Mengupdate menu aktif berdasarkan path
    },
    // Method untuk menambahkan todo baru
    addTodo(newTodo) {
      this.todos.push(newTodo);
    },
    // Method untuk menghapus todo
    removeTodo(todo) {
      this.todos = this.todos.filter(t => t !== todo);
    },
    // Method untuk toggle hide completed todos
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    }
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
