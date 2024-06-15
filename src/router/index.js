import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/TodoList.vue';
import Posts from '../components/PostList.vue';
import Albums from '../components/Albums.vue';
import AlbumPhotos from '../components/AlbumPhotos.vue';

const routes = [
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/albums', component: Albums },
  { path: '/albums/:id', component: AlbumPhotos, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;