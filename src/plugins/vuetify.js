import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  // https://vuetifyjs.com/en/features/theme
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#341100',
          header: '#f2e9e4',
          footer: '#bdbdbd'
        },
        variables: {
          'border-color': '#201A17'
        }
      },
      dark: {
        colors: {
          primary: '#A08D84',
          header: '#201A17',
          footer: '#424242'
        },
        variables: {
          'border-color': '#85746C'
        }
      },
    },
  },
})
