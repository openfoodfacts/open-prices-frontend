<template>
  <form @submit.prevent="signIn">
    <div class="grid grid-cols-1 gap-x-6 gap-y-8">
      <div class="sm:col-span-3">
        <label
          for="Username"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Username</label
        >
        <div class="mt-2">
          <input
            type="text"
            name="Username"
            id="Username"
            v-model="signinForm.username"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="sm:col-span-3">
        <label
          for="Password"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Password</label
        >
        <div class="mt-2">
          <input
            type="text"
            name="Password"
            id="Password"
            v-model="signinForm.password"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="sm:col-span-3">
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import Cookies from 'js-cookie'
import api from '../services/api'

export default {
  data() {
    return {
      signinForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      if (this.signinForm.username != "" || this.signinForm.password != "") {
        api
          .signIn(this.signinForm.username, this.signinForm.password)
          .then((data) => {
            console.log(data);
            if (data['access_token']) {
              Cookies.set('username', this.signinForm.username)
              Cookies.set('access_token', data['access_token'])
              this.$router.push('/add')
            } else {
              alert('wrong credentials')
            }
          })
          .catch((error) => {
            console.log(error)
            alert('server error')
          })
      }
    },
  },
}
</script>
