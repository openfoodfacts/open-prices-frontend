<template>
  <div id="vega-lite-chart" />
</template>

<script>
import embed from 'vega-embed'

export default {
  props: {
    priceList: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      var vlSpec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        description: 'A simple bar chart with embedded data.',
        data: {
          values: this.priceList
        },
        mark: 'line',
        encoding: {
          x: {timeUnit: 'yearmonthdate', field: 'date', type: 'temporal', axis: { title: this.$t('Common.Date') }},
          // y: {field: 'price', type: 'quantitative'}
          y: {aggregate: 'mean', field: 'price', type: 'quantitative', axis: { title: this.$t('Common.Price') }}
        }
      }
      embed('#vega-lite-chart', vlSpec, {actions: false})
    }
  }
}
</script>
