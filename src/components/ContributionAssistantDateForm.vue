<template>
  <v-form>
    <h3 class="required mb-1">
      2. Select the date of the pictures
    </h3>
    <v-text-field
      v-model="date"
      label="Date"
      type="date"
      :max="currentDate"
      :onChange="onDateChange"
      hide-details="auto"
    />
  </v-form>
</template>
  
<script>
  export default {
    props: {
      initialDate : {
        type: String,
        default: () => new Date().toISOString().substring(0, 10)
      }
    },
    emits: ['date'],
    data() {
      return {
        currentDate: new Date().toISOString().substring(0, 10),
        date: this.initialDate
      }
    },
    watch: {
      initialDate: {
        immediate: true,
        handler(newInitialDate) {
          this.date = newInitialDate
        }
      }
    },
    methods: {
      onDateChange() {
        this.$emit("date", this.date)
      },
    }
  }
  </script>
  