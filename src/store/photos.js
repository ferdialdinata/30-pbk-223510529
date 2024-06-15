import { defineStore } from 'pinia';

export const usePhotosStore = defineStore('photos', {
  state: () => ({
    photos: [],
    loading: false,
  }),
  actions: {
    async fetchPhotos(albumId) {
      this.loading = true;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
        const data = await response.json();
        this.photos = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});