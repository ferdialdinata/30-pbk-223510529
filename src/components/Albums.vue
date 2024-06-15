<template>
  <div>
    <h1>Daftar Album</h1>
    <ul>
      <li v-for="album in albums" :key="album.id">
        <router-link :to="'/albums/' + album.id">{{ album.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Albums',
  data() {
    return {
      albums: []
    };
  },
  mounted() {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(response => {
        this.albums = response.data;
      })
      .catch(error => {
        console.error('Error fetching albums', error);
      });
  }
});
</script>
