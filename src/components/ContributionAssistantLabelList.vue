<template>
  <v-row v-if="labels.length">
    <v-col
      v-for="(label, index) in labels"
      :key="index"
      cols="6"
      md="6"
      xl="4"
    >
      <v-card>
        <v-card-text>
          <v-img style="height:150px" :src="label.imageSrc" />
          <v-chip label size="small" density="comfortable">
            {{ $t('Common.Source') }} {{ label.boundingSource }}
          </v-chip>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            color="error"
            variant="outlined"
            prepend-icon="mdi-delete"
            @click="removeLabel(index)"
          >
            {{ $t('Common.Delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: {
      labels: {
        type: Array,
        default: () => []
      }
    },
    emits: ['removeLabel'],
    methods: {
      removeLabel(index) {
        this.$emit('removeLabel', index)
      }
    }
  }
</script>
