<template>
  <v-row v-if="croppedImages.length">
    <v-col
      v-for="(imageSrc, index) in croppedImages"
      :key="index"
      cols="6"
      md="4"
    >
      <v-card style="height: 200px;" class="pa-2">
        <v-btn 
          density="compact"
          icon="mdi-delete"
          style="left:calc(100% - 30px); z-index: 3;"
          color="error"
          @click="removeCrop(index)"
        />
        <v-img :src="imageSrc" class="cropped-image" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: {
      croppedImages: {
        type: Array,
        default: () => []
      }
    },
    emits: ['removeCrop'],
    methods: {
      removeCrop(index) {
        this.$emit('removeCrop', index)
      }
    }
  }
</script>
