<template>
  <form @submit.prevent="submitHandler">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1" for="name">First Name <span class="text-rose-500">*</span></label>
        <input v-model="firstName" id="firstname" class="form-input w-full" type="text" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" for="name">Last Name <span class="text-rose-500">*</span></label>
        <input v-model="lastName" id="lastname" class="form-input w-full" type="text" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" for="email">Email Address <span class="text-rose-500">*</span></label>
        <input v-model="email" id="email" class="form-input w-full" type="email" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" for="password">Phone Number <span class="text-rose-500">*</span></label>
        <input v-model="phone" id="phone" class="form-input w-full" type="text" />
      </div>
    </div>

    <div v-if="!contact" class="flex items-center justify-between mt-6">
      <button :disabled="isPending" :class="`${isPending ? 'cursor-not-allowed' : ''} btn w-full bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap`">
        <svg v-if="isPending" class="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
          <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
        </svg>
        <span class="ml-2">{{isPending ? "Saving..." : "Save"}}</span>
      </button>
    </div>

    <div v-if="contact" class="flex items-center space-x-3 mt-6">
      <div class="w-1/2">
        <button :disabled="isPending" :class="`${isPending ? 'cursor-not-allowed' : ''} btn w-full border-slate-200 hover:border-slate-300 text-slate-600`">
          <svg v-if="isPending" class="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
            <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
          </svg>
          <svg v-if="!isPending" class="icon icon-tabler icon-tabler-arrow-bar-to-up" width="16" height="16" viewBox="0 0 24 24" stroke-width="2.5" stroke="#475569" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="12" y1="10" x2="12" y2="20" />
            <line x1="12" y1="10" x2="16" y2="14" />
            <line x1="12" y1="10" x2="8" y2="14" />
            <line x1="4" y1="4" x2="20" y2="4" />
          </svg>
          <span class="ml-2">{{isPending ? "Updating..." : "Update"}}</span>
        </button>
      </div>

      <div class="w-1/2">
        <button
          :disabled="isPending"
          :class="`${isPending ? 'cursor-not-allowed' : ''} btn w-full border-slate-200 hover:border-slate-300 text-rose-500`"
          type="button"
          @click.prevent.stop="submitHandler"
        >
          <svg v-if="!isPending" class="icon icon-tabler icon-tabler-trash-x" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 7h16" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            <path d="M10 12l4 4m0 -4l-4 4" />
          </svg>
          <span class="ml-2">{{isPending ? "Delete" : "Delete"}}</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import API_BASE_URL from "../data";

export default {
  name: 'Form',

  props: ['contact'],

  emits: ['sync'],

  components: {},

  data() {
    return {
      error: String,
      isPending: false,
    }
  },

  setup(props) {
    const firstName = ref(props.contact?.firstName)
    const lastName = ref(props.contact?.lastName)
    const email = ref(props.contact?.email)
    const phone = ref(props.contact?.telephone.value)

    return {
      firstName,
      lastName,
      email,
      phone
    }
  },

  methods: {
    submitHandler(event) {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        telephone: {
          value: this.phone,
        },
      }
      const method = !this.contact
        ? 'POST'
        : event.type === 'submit' ? 'PUT' : 'DELETE'

      this.isPending = true
      fetch(`${ API_BASE_URL }/api/contacts${this.contact ? '/' + this.contact._id : ''}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then(() => {
          this.addToast({
            id: new Date(),
            type: 'success',
            open: true,
            message: method === 'POST'
              ? "Contact created successfully."
              : method === 'PUT'
                ? "Contact updated successfully."
                : "Contact deleted successfully"
          })
          this.reset()
          this.$emit('sync')
          this.isPending = false
        })
        .catch(err => this.error = err.toString())
    },
    reset() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.phone = ''
    }
  },

  watch: {
    contact: function(newVal, ) {
      this.firstName = newVal?.firstName ?? ''
      this.lastName = newVal?.lastName ?? ''
      this.email = newVal?.email ?? ''
      this.phone = newVal?.telephone.value ?? ''
    }
  },

  inject:[
    'addToast'
  ],
}
</script>