<template>
  <div class="background">
  </div>
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
        <div v-if="activeMenu === 'todos'">
          <div class="todosDetail">
            <h2>Tabel List</h2>
            <form @submit.prevent="addTodo" class="form-inline">
              <input class="form-control mr-2" v-model="newTodo" placeholder="Tambahkan Kegiatan">
              <button class="btn btn-primary">Tambahkan</button>
            </form>
            <ul class="list-unstyled mt-3">
              <li v-for="todo in filteredTodos" :key="todo.id" class="mb-2">
                <input type="checkbox" v-model="todo.done" class="mr-2">
                <span :class="{ done: todo.done }">{{ todo.text }}</span>
                <button @click="removeTodo(todo)" class="btn btn-danger ml-2">X</button>
              </li>
            </ul>
            <button @click="hideCompleted = !hideCompleted" class="btn btn-info">
              {{ hideCompleted ? 'Semua Kegiatan' : 'Kegiatan Belum Selesai' }}
            </button>
          </div>
        </div>
        <div v-else-if="activeMenu === 'posts'">
          <div class="postsDetail">
            <h2>Postingan</h2>
            <select v-model="selectedUser" class="form-control mt-3" @change="fetchUserPosts">
              <option  value="">Pilih pengguna...</option>
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

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
    },
    showPostDetails(post) {
      Swal.fire({
        title: post.title,
        html: `<strong>Body:</strong> ${post.body}`,
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: {
          content: 'text-left'
        }
      });
    },
    fetchUserPosts() {
      const selectedUser = this.selectedUser;
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser}`)
        .then(response => response.json())
        .then(data => {
          // Tampilkan data dalam SweetAlert
          Swal.fire({
            title: `Postingan ${this.users.find(user => user.id === selectedUser).name}`,
            html: this.formatPosts(data),
            icon: 'info',
            confirmButtonText: 'OK',
            customClass: {
              content: 'text-left'
            }
          });
        });
    },
    formatPosts(posts) {
      let html = '<ul>';
      posts.forEach(post => {
        html += `<li><strong>${post.title}</strong><br>${post.body}</li>`;
      });
      html += '</ul>';
      return html;
    }
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted ? this.todos.filter(todo => !todo.done) : this.todos;
    }
  }
};
</script>

<style scoped>
/* Custom styles specific to this component */
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
.todosDetail {
  position: fixed;
  top: 30%;
  left: 43%;
  color: white;
}
.postsDetail {
  position: fixed;
  top: 40%;
  left: 43%;
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

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  margin-bottom: 5px;
}

.done {
  text-decoration: line-through;
}

button {
  margin-left: 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #1E90FF;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #007FFF;
}

select {
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
}
.text h3{
  margin-right: 100px;
  font-weight: bold;
}
</style>
