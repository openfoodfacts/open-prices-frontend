<template>
  <v-dialog>
    <v-card>
      <v-card-title>Find your location</v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-form @submit.prevent="search">
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="locationSearchForm.q"
                label="Search for a place..."
                type="text"
                :rules="[fieldRequired]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn type="submit" :loading="loading" :disabled="!formFilled">Search</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text v-if="results && Array.isArray(results)">
        <h3>Results <small>{{ results.length }}</small></h3>
        <div class="d-flex flex-wrap ga-3">
          <v-card
            v-for="location in results"
            elevation="1"
            @click="selectLocation(location)"
          >
            <v-card-text>📍 {{ location.display_name }}</v-card-text>
          </v-card>
        </div>
      </v-card-text>
      <v-card-text v-if="results && (typeof results === 'string')">{{ results }}</v-card-text>

      <v-divider v-if="results"></v-divider>

      <v-card-text v-if="recentLocations.length">
        <h3>
          Recent locations <small>{{ recentLocations.length }}</small>
          <v-btn class="ml-2" variant="outlined" size="small" @click="clearRecentLocations">Clear</v-btn>
        </h3>
        <div class="d-flex flex-wrap ga-3">
          <v-card
            v-for="location in recentLocations"
            elevation="1"
            @click="selectLocation(location)"
          >
            <v-card-text>📍 {{ location.display_name }}</v-card-text>
          </v-card>
        </div>
      </v-card-text>

      <v-divider v-if="recentLocations.length"></v-divider>

      <v-card-text>
        <div class="float-right">powered by <a href="https://nominatim.openstreetmap.org" target="_blank">OpenStreetMap Nominatim</a></div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      locationSearchForm: {
        q: ''
      },
      loading: false,
      results: null,
      recentLocations: api.getRecentLocations()
    }
  },
  computed: {
    formFilled() {
      return Object.values(this.locationSearchForm).every(x => !!x)
    },
    // recentLocations() {  // TODO: make reactive
    //   return api.getRecentLocations()
    // },
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    search() {
      this.results = null
      this.loading = true
      api.openstreetmapNominatimSearch(this.locationSearchForm.q)
      .then((data) => {
        this.loading = false
        if (data.length) {
          this.results = data
        } else {
          this.results = 'No results found'
        }
      })
    },
    clearRecentLocations() {
      api.clearRecentLocations()
      this.recentLocations = []
    },
    selectLocation(location) {
      api.addRecentLocation(location)
      this.$emit('location', location)
      this.close()
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>
