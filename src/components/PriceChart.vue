<template>
  <div id="vega-lite-chart" style="width:100%;" />
</template>

<script>
import embed from 'vega-embed'
import { useTheme } from 'vuetify'



export default {
  props: {
    priceList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      theme: useTheme()
    }
  },
  computed: {
    chartMarkType() {
      return (this.priceList.length > 1) ? 'line' : 'point'
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
        width: 'container',
        autosize: { type: 'fit', resize: true},
        data: {
          values: this.priceList
        },
        mark: {
          type: this.chartMarkType,
          point: true,
          tooltip: true
        },
        encoding: {
          x: {timeUnit: 'yearmonthdate', field: 'date', type: 'temporal', axis: { title: this.$t('Common.Date') }},
          // y: {field: 'price', type: 'quantitative'}
          y: {aggregate: 'mean', field: 'price', type: 'quantitative', axis: { title: this.$t('Common.Price') }},
        }
      }
      embed('#vega-lite-chart', vlSpec, {actions: false, theme: this.theme.global.name})
    }
  }
}
</script>
