import openPricesApi from '../services/openPricesApi'


export default {
  data() {
    return {
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      loading: false,
      priceListError: '',
      priceRequestId: 0,
    }
  },
  methods: {
    beforeInitPrices() {},
    onPricesLoaded() {},
    initPrices() {
      const requestId = ++this.priceRequestId
      this.beforeInitPrices()
      this.priceList = []
      this.priceTotal = null
      this.pricePage = 0
      this.priceListError = ''
      this.loading = false
      return this.getPrices(requestId)
    },
    getPrices(requestId = this.priceRequestId) {
      // the scroll handler calls this too: don't stack requests, and don't
      // retry on its own once an error is displayed (see retryPrices)
      if (requestId !== this.priceRequestId || this.loading || this.priceListError) return
      if ((this.priceTotal != null) && (this.priceList.length >= this.priceTotal)) return

      const requestedPage = this.pricePage + 1
      this.loading = true
      return openPricesApi.getPrices({...this.getPricesParams, page: requestedPage})
        .then((data) => {
          if (requestId !== this.priceRequestId) return
          if (!data || !Array.isArray(data.items)) {
            throw new Error('Invalid prices API response')
          }
          // only move forward once the page actually landed
          this.pricePage = requestedPage
          this.priceList.push(...data.items)
          this.priceTotal = data.total
          this.loading = false
          this.onPricesLoaded(data.items)
        })
        .catch(() => {
          if (requestId !== this.priceRequestId) return
          this.loading = false
          this.priceListError = this.$t('Common.PriceLoadingFailed')
        })
    },
    retryPrices() {
      this.priceListError = ''
      return this.getPrices()
    },
  }
}
