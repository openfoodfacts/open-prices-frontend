<template>
  <!-- info icon with a tooltip, to explain a form field (e.g. next to its label) -->
  <v-tooltip open-on-click location="top" max-width="300">
    <template #activator="{ props }">
      <!-- binding the activator props makes the icon focusable (role="button") -->
      <v-icon
        v-bind="props"
        class="float-right"
        size="small"
        icon="mdi-information-outline"
        :aria-label="$t('Common.Help')"
      />
    </template>
    <slot />
  </v-tooltip>
</template>
