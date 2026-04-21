<template>
  <v-text-field 
    v-model="query" 
    :placeholder="resolvedPlaceholder" 
    :aria-label="resolvedPlaceholder"
    prepend-inner-icon="mdi-magnify" 
    :append-inner-icon="query ? 'mdi-close' : ''" 
    variant="outlined"
    density="compact" 
    hide-details 
    single-line 
    class="search-bar" 
    @input="onInput" 
    @click:append-inner="clear" 
  />
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: null,
        },
        kind: {
            type: String,
            default: '',
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            query: this.modelValue,
            debounceTimer: null,
        }
    },
    computed: {
        resolvedPlaceholder() {
            if (this.placeholder !== null) return this.placeholder
            return this.$t('Common.SearchBar.Placeholder', { kind: this.kind })
        },
    },
    watch: {
        modelValue(val) {
            if (val !== this.query) this.query = val
        },
    },
    methods: {
        onInput() {
            clearTimeout(this.debounceTimer)
            if (!this.query) {
                this.$emit('update:modelValue', '')
                return
            }
            this.debounceTimer = setTimeout(() => {
                this.$emit('update:modelValue', this.query)
            }, 300)
        },
        clear() {
            clearTimeout(this.debounceTimer)
            this.query = ''
            this.$emit('update:modelValue', '')
        },
    },
}
</script>