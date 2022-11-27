<template>
  <Toast2
    :key="notification.id"
    v-for="notification of notifications"
    :type="notification.type"
    :open="notification.open"
    class="absolute z-40 right-0 top-0"
  >
    {{notification.message}}
  </Toast2>

  <router-view />
</template>

<script>
import Toast2 from './components/Toast2.vue'

export default {
  components: {Toast2},

  data() {
    return {
      notifications: []
    }
  },

  methods: {
    addToast(data) {
      this.notifications.push(data);
    }
  },

  provide() {
    return {
      addToast: this.addToast,
    }
  }
}

</script>

