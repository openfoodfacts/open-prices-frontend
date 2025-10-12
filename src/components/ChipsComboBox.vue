<template>
  <v-combobox
    :model-value="localValue"
    :items="items"
    :label="label"
    variant="outlined"
    chips
    clearable
    closable-chips
    multiple
    @update:modelValue="updateValue"
  >
    <template #chip="{ props, item }">
      <v-chip v-bind="props">
        <strong>{{ item.raw }}</strong>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      default: () => {}
    },
    items: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ""
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      localValue: this.modelValue,
    };
  },
  watch: {
    modelValue(val) {
      this.localValue = val;
    },
  },
  methods: {
    updateValue(val) {
      this.localValue = val;
      this.$emit('update:modelValue', val);
    },
  },
}
</script>