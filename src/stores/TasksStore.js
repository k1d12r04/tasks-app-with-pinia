import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    allTasks() {
      return this.tasks;
    },
    favorites() {
      return this.tasks.filter(task => task.isFav);
    },
    tasksCount: state => {
      return state.tasks.length;
    },
    favsCount: state => {
      return state.tasks.reduce((previous, current) => {
        return current.isFav ? previous + 1 : previous;
      }, 0);
    },
  },
  actions: {
    async getTasks() {
      this.isLoading = true;
      const response = await fetch('http://localhost:3000/tasks');
      const responseData = await response.json();

      this.tasks = responseData;
      this.isLoading = false;
    },
    async addTask(task) {
      this.tasks.push(task);

      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter(task => {
        return task.id !== id;
      });

      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'DELETE',
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find(task => task.id === id);
      task.isFav = !task.isFav;

      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
