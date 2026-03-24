<template>
  <v-card
    :title="value"
    variant="tonal"
    density="compact"
    :to="to ? to : null"
  >
    <template v-if="subtitle" #subtitle>
      <span v-if="subtitlePrependIcon" class="mr-1">
        <v-icon :icon="subtitlePrependIcon" size="small" />
      </span>
      <span>{{ subtitle }}</span>
    </template>
    <template v-if="prependIcon" #prepend>
      <v-icon :icon="prependIcon" />
    </template>
    <template v-if="to || appendIcon" #append>
      <v-icon v-if="to" icon="mdi-arrow-right" />
      <v-icon v-else :icon="appendIcon" />
    </template>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    subtitle: {
      type: String,
      default: ''
    },
    subtitlePrependIcon: {
      type: String,
      default: ''
    },
    prependIcon: {
      type: String,
      default: ''
    },
    appendIcon: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  }
}
</script>
