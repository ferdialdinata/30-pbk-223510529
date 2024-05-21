<template>
    <div class="postsDetail">
      <h2>Postingan</h2>
      <select v-model="selectedUser" class="form-control mt-3" @change="fetchUserPosts">
        <option value="">Pilih pengguna...</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    name: 'PostList',
    props: {
      users: Array
    },
    data() {
      return {
        selectedUser: null
      };
    },
    methods: {
      fetchUserPosts() {
        const selectedUser = this.selectedUser;
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser}`)
          .then(response => response.json())
          .then(data => {
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
    }
  };
  </script>
  
  <style scoped>
  .postsDetail {
    position: fixed;
    top: 40%;
    left: 43%;
  }
  select {
    margin-top: 10px;
    padding: 5px;
    border-radius: 5px;
  }
  </style>
  