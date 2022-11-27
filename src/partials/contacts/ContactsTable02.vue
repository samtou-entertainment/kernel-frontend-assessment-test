<template>
  <div class="bg-white">
    <div>
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-slate-500 border-t border-b border-slate-200">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div class="flex items-center">
                  <label class="inline-flex">
                    <span class="sr-only">Select all</span>
                    <input id="parent-checkbox" class="form-checkbox" type="checkbox" @click="checkAll" />
                  </label>
                </div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Full Name</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Created At</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Telephone</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-right">Email Address</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200 border-b border-slate-200">
            <TransactionItem
              v-for="transaction in transactions"
              :key="transaction.id"
              :transaction="transaction"
              v-model:selected="selected"
              :value="transaction.id"
              @click.stop="$emit('open-transactionpanel', $event, transaction.id)"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import TransactionItem from './ContactsTableItem02.vue'

import moment from "moment";

export default {
  name: 'ContactsTableItem02',
  components: {
    TransactionItem,
  },
  props: ['selectedItems', 'contacts'],
  setup(props, { emit }) {

    const selectAll = ref(false)
    const selected = ref([])

    const checkAll = () => {
      selected.value = []
      if (!selectAll.value) {
        selected.value = transactions.value.map(transaction => transaction.id)
      }
    }
    
    watch(selected, () => {
      selectAll.value = transactions.value.length === selected.value.length
      emit('change-selection', selected.value)
    })    

    const transactions = ref(props.contacts.map(item => ({
      ...item,
      id: item._id,
      image: null,
      name: 'Form Builder CP',
      fullName: item.firstName + ' ' + item.lastName,
      date: moment(item.createdAt, "YYYYMMDD").fromNow(),
      status: 'Pending',
      amount: '$1,299.22',
    })))

    return {
      selectAll,
      selected,
      checkAll,
      transactions,
    }
  }
}
</script>