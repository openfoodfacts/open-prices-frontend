<template>
  <v-card :title="value" variant="tonal" density="compact" :to="to ? to : null">
    <template v-if="subtitle" #subtitle>
      <span v-if="subtitlePrependIcon" class="mr-1">
        <v-icon :icon="subtitlePrependIcon" size="small" />
      </span>
      <span>{{ subtitle }}</span>
      <v-chip
        v-if="todayValue > 0"
        class="ml-2"
        color="success"
        variant="flat"
        size="x-small"
        label
      >
        <!-- small screens: no room for the label (e.g. "aujourd'hui") -->
        <span v-if="$vuetify.display.xs">+{{ todayValue }}</span>
        <span v-else>{{ $t("Common.CountToday", { count: todayValue }) }}</span>
      </v-chip>
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
      default: 0,
    },
    subtitle: {
      type: String,
      default: "",
    },
    subtitlePrependIcon: {
      type: String,
      default: "",
    },
    prependIcon: {
      type: String,
      default: "",
    },
    appendIcon: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    todayValue: {
      type: Number,
      default: 0, // if > 0: "+N today" chip in the subtitle
    },
  },
};
</script>
