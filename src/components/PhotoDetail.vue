<template>
    <div class="photo-detail-overlay" @click="$emit('close')">
      <div class="photo-detail-container" @click="toggleZoom">
        <img :src="selectedPhoto.url" :alt="selectedPhoto.title" :class="{ zoomed: zoomed }">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PhotoDetail',
    props: {
      selectedPhoto: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        zoomed: false
      };
    },
    methods: {
      toggleZoom() {
        this.zoomed = !this.zoomed;
      }
    }
  };
  </script>
  
  <style scoped>
  .photo-detail-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .photo-detail-container {
    max-width: 90%;
    max-height: 90%;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .photo-detail-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .zoomed {
    transform: scale(1.5);
  }
  </style>
  