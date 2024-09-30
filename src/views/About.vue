<template>
  <h2 class="text-h6">
    {{ $t('Common.About') }}
  </h2>

  <br>

  <v-sheet v-for="fieldset in fieldsetsGeneral" :id="fieldset.id" :key="fieldset.title" tag="section" class="mb-4">
    <i18n-t :keypath="fieldset.title" tag="h2" class="mb-1">
      <template #op_name>
        {{ APP_NAME }}
      </template>
    </i18n-t>
    <i18n-t v-for="answer in fieldset.answers" :key="answer" :keypath="answer" tag="p">
      <template #op_name>
        {{ APP_NAME }}
      </template>
      <template #op_api_url>
        <a :href="APP_API_URL" target="_blank">API</a>
      </template>
      <template #off_url>
        <OpenFoodFactsLink display="link" />
      </template>
      <template #odbl_url>
        <a :href="LICENSE_ODBL_URL" target="_blank">{{ LICENSE_ODBL_NAME }}</a>
      </template>
      <template #ccbysa_url>
        <a :href="LICENSE_CC_BY_SA_URL" target="_blank">{{ LICENSE_CC_BY_SA_NAME }}</a>
      </template>
    </i18n-t>
  </v-sheet>

  <section id="faq" class="mb-4">
    <h2 class="mb-1">
      {{ $t('Common.FrequentlyAskedQuestions') }}
    </h2>

    <v-sheet v-for="fieldset in fieldsetsFAQ" :key="fieldset.title" tag="div" class="mb-2">
      <i18n-t :keypath="fieldset.title" tag="h3" class="mb-1">
        <template #op_name>
          {{ APP_NAME }}
        </template>
        <template #off_name>
          {{ OFF_NAME }}
        </template>
        <template #osm_name>
          {{ OSM_NAME }}
        </template>
      </i18n-t>
      <i18n-t v-for="answer in fieldset.answers" :key="answer" :keypath="answer" tag="p">
        <template #op_name>
          {{ APP_NAME }}
        </template>
        <template #op_api_url>
          <a :href="APP_API_URL" target="_blank">API</a>
        </template>
        <template #op_dumb_prices_url>
          <a :href="APP_DUMP_PRICES_URL" class="text-lowercase" target="_blank">{{ $t('Common.Prices') }}</a>
        </template>
        <template #op_dumb_proofs_url>
          <a :href="APP_DUMP_PROOFS_URL" class="text-lowercase" target="_blank">{{ $t('Common.Proofs') }}</a>
        </template>
        <template #op_dumb_locations_url>
          <a :href="APP_DUMP_LOCATIONS_URL" class="text-lowercase" target="_blank">{{ $t('Common.Locations') }}</a>
        </template>
        <template #off_url>
          <OpenFoodFactsLink display="link" />
        </template>
        <template #osm_url>
          <OpenStreetMapLink display="link" />
        </template>
        <template #off_contact_email_url>
          <a :href="'mailto:' + OFF_CONTACT_EMAIL">{{ OFF_CONTACT_EMAIL }}</a>
        </template>
        <template #osm_name>
          {{ OSM_NAME }}
        </template>
        <template #odbl_url>
          <a :href="LICENSE_ODBL_URL" target="_blank">{{ LICENSE_ODBL_NAME }}</a>
        </template>
      </i18n-t>
    </v-sheet>
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    OpenFoodFactsLink: defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue')),
    OpenStreetMapLink: defineAsyncComponent(() => import('../components/OpenStreetMapLink.vue')),
  },
  data() {
    return {
      APP_NAME: constants.APP_NAME,
      APP_API_URL: constants.APP_API_URL,
      APP_DUMP_PRICES_URL: constants.APP_DUMP_PRICES_URL,
      APP_DUMP_PROOFS_URL: constants.APP_DUMP_PROOFS_URL,
      APP_DUMP_LOCATIONS_URL: constants.APP_DUMP_LOCATIONS_URL,
      OFF_NAME: constants.OFF_NAME,
      OFF_CONTACT_EMAIL: constants.OFF_CONTACT_EMAIL,
      OSM_NAME: constants.OSM_NAME,
      LICENSE_ODBL_NAME: constants.LICENSE_ODBL_NAME,
      LICENSE_ODBL_URL: constants.LICENSE_ODBL_URL,
      LICENSE_CC_BY_SA_NAME: constants.LICENSE_CC_BY_SA_NAME,
      LICENSE_CC_BY_SA_URL: constants.LICENSE_CC_BY_SA_URL,
      fieldsetsGeneral: [
        {
          id: 'why',
          title: 'About.WhyTitle',
          answers: [
            'About.WhyAnswer1',
            'About.WhyAnswer2',
          ]
        },
        {
          id: 'how',
          title: 'About.HowTitle',
          answers: [
            'About.HowAnswer1',
          ]
        },
        {
          id: 'license',
          title: 'About.LicenseTitle',
          answers: [
            'About.LicenseAnswer1',
            'About.LicenseAnswer2',
          ]
        }
      ],
      fieldsetsFAQ: [
        {
          title: 'About.WhatOFFTitle',
          answers: [
            'About.WhatOFFAnswer'
          ]
        },
        {
          title: 'About.WhyOFFTitle',
          answers: [
            'About.WhyOFFAnswer'
          ]
        },
        {
          title: 'About.HowContribute',
          answers: [
            'About.HowContributeAnswer'
          ]
        },
        {
          title: 'About.HowUseData',
          answers: [
            'About.HowUseDataAnswer1',
            'About.HowUseDataAnswer2',
            'About.HowUseDataAnswer3'
          ]
        },
        {
          title: 'About.HowContact',
          answers: [
            'About.HowContactAnswer'
          ]
        },
        {
          title: 'About.HowSupport',
          answers: [
            'About.HowSupportAnswer'
          ]
        },
        {
          title: 'About.WhyOSM',
          answers: [
            'About.WhyOSMAnswer'
          ]
        },
        {
          title: 'About.HowRetailer',
          answers: [
            'About.HowRetailerAnswer'
          ]
        },
        {
          title: 'About.WhyNoScraping',
          answers: [
            'About.WhyNoScrapingAnswer1',
            'About.WhyNoScrapingAnswer2'
          ]
        }
      ]
    }
  }
}
</script>
