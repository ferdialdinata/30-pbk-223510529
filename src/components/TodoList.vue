<template>
  <div class="todosDetail">
    <h2>Tabel List</h2>
    <!-- Form to add new todo -->
    <form @submit.prevent="addTodo" class="form-inline">
      <input class="form-control mr-2" v-model="newTodo" placeholder="Tambahkan Kegiatan">
      <button class="btn btn-primary">Tambahkan</button>
    </form>

    <!-- List of todos -->
    <ul class="list-unstyled mt-3">
      <li v-for="todo in filteredTodos" :key="todo.id" class="mb-2">
        <input type="checkbox" v-model="todo.done" class="mr-2">
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="$emit('remove-todo', todo)" class="btn btn-danger ml-2">X</button>
      </li>
    </ul>

    <!-- Button to toggle hide completed todos -->
    <button @click="$emit('toggle-hide-completed')" class="btn btn-info">
      {{ hideCompleted ? 'Semua Kegiatan' : 'Kegiatan Belum Selesai' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todos: Array, // Array of todos
    hideCompleted: Boolean // Boolean to hide completed todos
  },
  data() {
    return {
      newTodo: '' // Input for adding new todo
    };
  },
  computed: {
    // Computed property to filter todos based on hideCompleted
    filteredTodos() {
      return this.hideCompleted ? this.todos.filter(todo => !todo.done) : this.todos;
    }
  },
  methods: {
    // Method to add new todo
    addTodo() {
      if (this.newTodo.trim() === '') {
        return; // Do nothing if newTodo is empty
      }
      // Emit 'add-todo' event with new todo object
      this.$emit('add-todo', { id: Date.now(), text: this.newTodo, done: false });
      this.newTodo = ''; // Clear input after adding todo
    }
  }
};
</script>

<style scoped>
.todosDetail {
  position: fixed;
  top: 30%;
  left: 43%;
  color: rgb(234, 12, 12);
}
.form-inline {
  display: flex;
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
</style>
