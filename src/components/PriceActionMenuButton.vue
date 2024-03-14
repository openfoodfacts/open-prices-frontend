<template>
  <v-btn size="small" icon density="comfortable" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu activator="parent" transition="slide-y-transition">
      <v-list>
        <v-list-item :slim="true" prepend-icon="mdi-pencil" disabled>{{ $t('Common.Edit') }}</v-list-item>
        <v-list-item :slim="true" prepend-icon="mdi-delete">{{ $t('Common.Delete') }}</v-list-item>
      </v-list>
    </v-menu>
  </v-btn>  
</template>

<script>
</script>
