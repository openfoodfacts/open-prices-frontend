<template>
  <h2 class="text-h6 mb-1">
    {{ $t('Common.AddPrices') }}
  </h2>

  <v-row>
    <v-col v-for="addData in addDataList" :key="addData.url" cols="12" sm="6" md="4" xl="3">
      <v-card class="fill-height">
        <v-card-title>{{ addData.name }}</v-card-title>
        <v-card-text>{{ addData.description }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" :href="addData.url" :title="$t('Common.View')">
            {{ $t('Common.View') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      addDataList: [
        {name: this.$t('Common.PriceTags'), description: '', url: '/prices/add/multiple'},
        {name: this.$t('Common.AddProofs'), description: '', url: '/proofs/add/multiple'},
      ]
    }
  }
}
</script>
