<template>
  <div class="flex h-screen overflow-hidden">

    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">

      <main>
        <div class="relative">
          <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div class="sm:flex sm:justify-between sm:items-center mb-4 md:mb-2">

              <div class="mb-4 sm:mb-0">
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Contacts 📖</h1>
              </div>

              <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                <DeleteButton :selectedItems="selectedItems" @click="bulkDelete" />

                <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click="this.handleCreateBtnClick">
                  <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span class="hidden xs:block ml-2">Add Contact</span>
                </button>

              </div>

            </div>

            <div class="mb-5">
              <ul class="flex flex-wrap -m-1">
                <li class="m-1">
                  <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">View All</button>
                </li>
                <li class="m-1">
                  <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">Favorites</button>
                </li>
                <li class="m-1">
                  <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">Groups</button>
                </li>
              </ul>
            </div>

            <div v-if="this.contacts && !this.contacts.length" class="border-t border-slate-200">
              <div class="max-w-2xl m-auto mt-16">

                <div class="text-center px-4">
                  <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-slate-200 to-slate-100 mb-4">
                    <svg class="w-5 h-6 fill-current" viewBox="0 0 20 24">
                      <path class="text-slate-500" d="M10 10.562l9-5-8.514-4.73a1 1 0 00-.972 0L1 5.562l9 5z" />
                      <path class="text-slate-300" d="M9 12.294l-9-5v10.412a1 1 0 00.514.874L9 23.294v-11z" />
                      <path class="text-slate-400" d="M11 12.294v11l8.486-4.714a1 1 0 00.514-.874V7.295l-9 4.999z" />
                    </svg>
                  </div>
                  <h2 class="text-2xl text-slate-800 font-bold mb-2">Create a new contact a few clicks</h2>
                  <div class="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                  <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click="this.handleCreateBtnClick">
                    <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span class="ml-2">Add Contact</span>
                  </button>
                </div>

              </div>
            </div>

            <div
              v-if="!this.contacts"
              class="flex justify-center items-center"
              disabled
            >
              <svg class="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
              </svg>
              <span class="ml-2">Loading</span>
            </div>

            <TransactionsTable
              :contacts="this.contacts"
              v-if="this.contacts?.length"
              @change-selection="updateSelectedItems($event)"
              @open-transactionpanel="handleContactPanelOpen"
            />

            <div
              v-if="this.contacts?.length"
              class="mt-8"
            >
              <PaginationClassic :total="this.contacts?.length ?? 0"/>
            </div>

          </div>

          <TransactionPanel
            :transactionPanelOpen="transactionPanelOpen"
            :contact="contacts?.find(item => item._id === clickedItem)"
            @close-transactionpanel="transactionPanelOpen = false"
            @sync="sync = true"
          />
        </div>

      </main>

    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import TransactionsTable from '../../partials/contacts/ContactsTable02.vue'
import TransactionPanel from '../../partials/contacts/ContactPanel.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'

export default {
  name: 'Contacts',
  components: {
    DeleteButton,
    TransactionsTable,
    TransactionPanel,
    PaginationClassic,
  },

  data() {
    return {
      loading: false,
      sync: false,
      contacts: null,
      error: null,
    }
  },

  setup() {
    const sidebarOpen = ref(false)
    const selectedItems = ref([])
    const clickedItem = ref(null)
    const transactionPanelOpen = ref(false)

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    return {
      sidebarOpen,
      selectedItems,
      clickedItem,
      transactionPanelOpen,
      updateSelectedItems,
    }
  },

  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
    )
  },

  methods: {
    fetchData() {
      this.error = this.contacts = null
      this.loading = true
      fetch("http://localhost:7898/api/contacts")
        .then((response) => response.json())
        .then((data) => {
          this.contacts = data.data
          this.sync = false
        })
        .catch(err => this.error = err.toString());
    },
    handleCreateBtnClick() {
      this.transactionPanelOpen = true
      this.clickedItem = null
    },
    handleContactPanelOpen(event, contactId) {
      this.transactionPanelOpen = true
      this.clickedItem = contactId
    },
    bulkDelete() {
      for (let contact of this.selectedItems?.values()) {
        fetch(`http://localhost:7898/api/contacts/${contact}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          cache: 'default',
        })
          .then((response) => response.json())
          .then(() => {
            this.fetchData()
          })
          .catch(err => this.error = err.toString())
      }
    }
  },

  watch: {
    sync: function(newVal, ) {
      if (newVal === true) {
        this.transactionPanelOpen = false
        this.fetchData()
      }
    }
  }
}
</script>