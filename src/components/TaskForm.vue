<template>
  <form @submit.prevent="submitForm">
    <input type="text" placeholder="Add a task..." v-model.trim="newTask" />
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from '../stores/TasksStore.js';

export default {
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref('');

    const submitForm = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          id: new Date().getTime(),
          title: newTask.value,
          isFav: false,
        });
      }
      newTask.value = '';
    };

    return { newTask, submitForm };
  },
};
</script>
