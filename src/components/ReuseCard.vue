<template>
  <v-card class="fill-height">
    <v-img :src="reuse.background_image_url" height="200px" cover />
    <v-card-title>{{ reuse.name }}</v-card-title>
    <v-card-text>{{ reuse.description }}</v-card-text>
    <div class="px-4 mb-2">
      <v-chip v-for="tag in reuse.tags" :key="tag" class="mr-1" density="comfortable">
        {{ tag }}
      </v-chip>
      <!-- <v-chip v-if="reuse.author" class="mr-1" density="comfortable" prepend-icon="mdi-account">{{ reuse.author }}</v-chip> -->
      <v-chip v-if="reuse.date" density="comfortable" prepend-icon="mdi-clock-outline">
        {{ reuse.date }}
      </v-chip>
    </div>
    <v-card-actions>
      <v-btn color="primary" append-icon="mdi-open-in-new" :href="reuse.url" target="_blank" :title="$t('Common.View')">
        {{ $t('Common.View') }}
      </v-btn>
      <v-spacer />
      <v-btn v-if="reuse.code_url" icon="mdi-xml" :href="reuse.code_url" target="_blank" :title="$t('Common.SourceCode')" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    reuse: {
      type: Object,
      required: true
    }
  }
}
</script>
