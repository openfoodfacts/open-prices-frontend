<template>
    <div class="col-sm">
      <select @change="changeLanguage">
        <option v-for="language in supportedLocales" :key="language.code" :value="language.code" :selected="language.code">
          {{ language.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { useI18n } from 'vue-i18n'
  import { useRouter } from "vue-router"
  import localeManager from "../i18n/localeManager.js"

  export default {
    setup() {
      const { t, locale } = useI18n()

      const supportedLocales = localeManager.supportedLocales
      const router = useRouter()

      const changeLanguage = async (event) => {
        const newLocale = event.target.value

        await localeManager.changeLanguage(newLocale)

        try {
          await router.replace({ params: { locale: newLocale } })
        } catch(e) {
          console.log(e)
          router.push("/")
        }
      }

      return { t, locale, supportedLocales, changeLanguage }
    }
  }
</script>
  