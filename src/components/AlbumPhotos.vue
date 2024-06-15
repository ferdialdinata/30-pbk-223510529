<template>
  <div>
    <h1>Foto dalam Album "{{ albumTitle }}"</h1>
    <ul>
      <li v-for="photo in photos" :key="photo.id">
        <img :src="photo.thumbnailUrl" :alt="photo.title" @click="showPhotoDetail(photo)">
      </li>
    </ul>

    <!-- Modal untuk detail foto -->
    <div class="modal" :class="{ 'is-active': modalVisible }">
      <div class="modal-background" @click="closePhotoDetail"></div>
      <div class="modal-content">
        <img v-if="selectedPhoto" :src="selectedPhoto.url" :alt="selectedPhoto.title" class="image">
      </div>
      <button class="modal-close is-large" @click="closePhotoDetail"></button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'AlbumPhotos',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      albumTitle: '',
      photos: [],
      modalVisible: false,
      selectedPhoto: null
    };
  },
  mounted() {
    axios.get(`https://jsonplaceholder.typicode.com/albums/${this.id}`)
      .then(response => {
        this.albumTitle = response.data.title;
        return axios.get(`https://jsonplaceholder.typicode.com/albums/${this.id}/photos`);
      })
      .then(response => {
        this.photos = response.data;
      })
      .catch(error => {
        console.error('Error fetching photos', error);
      });
  },
  methods: {
    showPhotoDetail(photo) {
      this.selectedPhoto = photo;
      this.modalVisible = true;
    },
    closePhotoDetail() {
      this.modalVisible = false;
      this.selectedPhoto = null;
    }
  }
});
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal.is-active {
  display: block;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
}

.image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 9999;
}
</style>
