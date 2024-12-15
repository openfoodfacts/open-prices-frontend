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
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-list-item class="w-100">
            <template #prepend>
              <v-chip label size="small" density="comfortable">
                <span>
                  {{ $t('Common.Source') }} {{ label.boundingSource }}
                </span>
              </v-chip>
            </template>
            <template #append>
              <div class="justify-self-end">
                <v-btn
                  color="error"
                  variant="outlined"
                  prepend-icon="mdi-delete"
                  @click="removeLabel(index)"
                >
                  {{ $t('Common.Delete') }}
                </v-btn>
              </div>
            </template>
          </v-list-item>
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
