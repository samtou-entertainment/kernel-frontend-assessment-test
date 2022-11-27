<template>
  <tr class="cursor-pointer">
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="flex items-center">
        <label class="inline-flex">
          <span class="sr-only">Select</span>
          <input :id="transaction.id" class="form-checkbox" type="checkbox" :value="value" @change="check" :checked="checked" @click.stop />
        </label>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2">
      <div class="flex items-center">
        <div class="flex items-center justify-center bg-slate-100 rounded-full w-9 h-9 text-sm font-semibold uppercase text-slate-500 mr-2">
          {{ transaction.firstName?.charAt(0)}}{{transaction.lastName?.charAt(0) }}
        </div>
        <div class="font-medium text-slate-800 capitalize">{{transaction.fullName}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{transaction.date}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">
        <div class="text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 bg-rose-100 text-rose-500">{{transaction.telephone?.value}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="text-right font-medium text-emerald-500">{{transaction.email}}</div>
    </td>
  </tr>  
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ContactsTableItem02',
  props: ['transaction', 'value', 'selected'],
  setup(props, context) {
    const checked = computed(() => props.selected.includes(props.value))

    function check() {
      let updatedSelected = [...props.selected]
      if (this.checked) {
        updatedSelected.splice(updatedSelected.indexOf(props.value), 1)
      } else {
        updatedSelected.push(props.value)
      }
      context.emit('update:selected', updatedSelected)
    }

    return {
      check,
      checked,
    }
  },
}
</script>