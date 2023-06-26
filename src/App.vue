<template>
  <Form/>
  <Table/>
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
  components:{
    Form:defineAsyncComponent(()=>import('./components/Form.vue')),
    Table:defineAsyncComponent(()=>import('./components/Table.vue'))
  }
}
</script>

<style>

</style>
