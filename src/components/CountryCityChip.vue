<template>
  <v-chip label size="small" density="comfortable" :to="getCountryCityUrl">
    {{ getCountryCityName }}
  </v-chip>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "country",
      examples: ["country", "city"],
    },
    country: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getCountryCityName() {
      if (this.type === "country") {
        return this.country;
      } else if (this.type === "city") {
        return this.city;
      }
      return "";
    },
    getCountryCityUrl() {
      if (this.type === "country") {
        return this.country && !this.readonly
          ? { name: "country-detail", params: { country: this.country } }
          : null;
      } else if (this.type === "city") {
        return this.city && !this.readonly
          ? {
              name: "country-city-detail",
              params: { country: this.country, city: this.city },
            }
          : null;
      }
      return null;
    },
  },
};
</script>
