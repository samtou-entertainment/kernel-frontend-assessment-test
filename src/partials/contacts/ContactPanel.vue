<template>
  <div
    ref="panelContent"
    class="absolute inset-0 sm:left-auto z-20 shadow-xl transition-transform duration-200 ease-in-out"
    :class="transactionPanelOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="sticky top-16 bg-slate-50 overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-l border-slate-200 w-full sm:w-[390px] h-[calc(100vh-64px)]">

      <button ref="closeBtn" @click.stop="$emit('close-transactionpanel')" class="absolute top-0 right-0 mt-6 mr-6 group p-2">
        <svg class="w-4 h-4 fill-slate-400 group-hover:fill-slate-600 pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="m7.95 6.536 4.242-4.243a1 1 0 1 1 1.415 1.414L9.364 7.95l4.243 4.242a1 1 0 1 1-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 0 1-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 0 1 1.414-1.414L7.95 6.536Z" />
        </svg>
      </button>

      <div class="py-8 px-4 lg:px-8">
        <div class="max-w-sm mx-auto lg:max-w-none">

          <div class="max-w-sm mx-auto px-4">
            <h1 class="text-2xl text-slate-800 font-bold mb-6">{{ !contact ? "Create a new contact ✨" : "Update a contact" }}</h1>

            <Form :contact="contact" @sync="$emit('sync')"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted, onUpdated} from 'vue'
import Form from "../Form.vue";

export default {
  name: 'ContactPanel',
  components: {Form},
  props: ['transactionPanelOpen', 'contact'],
  emits: ['close-transactionpanel', 'sync'],
  setup(props, { emit }) {

    const panelContent = ref(null)
    const closeBtn = ref(null)

    // close on click outside
    const clickHandler = ({ target }) => {
      if (
        !props.transactionPanelOpen ||
        panelContent.value.contains(target) ||
        closeBtn.value.contains(target)
      ) return
      emit('close-transactionpanel')
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.transactionPanelOpen || keyCode !== 27) return
      emit('close-transactionpanel')
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })
    
    return {
      panelContent,
      closeBtn,
    }    
  }
}
</script>