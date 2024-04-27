<script>
let id = 0

export default {
  data() {
    return {
      newTodo: '',
      hideCompleted: false,
      todos: [
        { id: id++, text: 'Belajar JavaScript', done: true },
        { id: id++, text: 'Belajar HTML', done: true },
        { id: id++, text: 'Belajar Desaign', done: false }
      ]
    }
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    }
  }
}
</script>

<template>
  <!--- Nama: Adjie Patrian Khalis 213510709-->
  <head>
    
  </head>
  <body>
    <wrapper class="wp">
      <div class="w1">
        <h1>To Do List Merk Topy</h1>
        <h2> Ferdi Aldinata (223510529)</h2>
        <form @submit.prevent="addTodo">
          <input v-model="newTodo">
          <button>Tambahkan</button>
        </form>
        <ul>
          <li v-for="todo in filteredTodos" :key="todo.id">
            <input type="checkbox" v-model="todo.done">
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
            <button @click="removeTodo(todo)">X</button>
          </li>
        </ul>
        <button @click="hideCompleted = !hideCompleted">
          {{ hideCompleted ? 'Semua Kegiatan' : 'Kegiatan Belum Selesai' }}
        </button>
      </div>
    </wrapper>
  </body>
</template>

<style>
.done {
  text-decoration: line-through;
}
.w1{
  justify-content: center;
  width: 500px;
  height: 500px;
  margin-top: 50%;
  margin-left: 70%;
}
body{
  justify-content: center;
background: url(background.jpg) no-repeat center center fixed;
background-size: cover; 
}

h2{
  font-size: 15px;
}
</style>