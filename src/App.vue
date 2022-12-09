<template>
  <div>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- add-new-task -->

    <TaskForm />

    <!-- filter -->

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!-- loader -->

    <div v-if="isLoading" class="loader-wrapper">
      <span class="loader"></span>
    </div>

    <!-- task-list -->

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ tasksCount }} tasks left to do</p>
      <div v-for="task in allTasks" :key="task.id">
        <TaskDetail :task="task" :task-id="task.id" />
      </div>
    </div>

    <!-- favorite tasks -->

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favsCount }} favorite tasks lef to do</p>
      <div v-for="task in favorites" :key="task.id">
        <TaskDetail :task="task" />
      </div>
    </div>
  </div>

  <button @click="taskStore.$reset">reset state</button>
</template>

<script>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useTaskStore } from './stores/TasksStore';
import TaskDetail from './components/TaskDetail.vue';
import TaskForm from './components/TaskForm.vue';

export default {
  components: {
    TaskDetail,
    TaskForm,
  },
  setup() {
    const taskStore = useTaskStore();

    const { tasks, isLoading, allTasks, favorites, tasksCount, favsCount } =
      storeToRefs(taskStore);

    const filter = ref('all');

    // fetch tasks
    taskStore.getTasks();

    return {
      taskStore,
      filter,
      tasks,
      isLoading,
      allTasks,
      favorites,
      tasksCount,
      favsCount,
    };
  },
};
</script>
