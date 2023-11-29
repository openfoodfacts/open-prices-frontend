<template>
  <main>
    <div
      class="px-4 py-6 mt-10 sm:px-0 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
    >
      <div class="sm:text-center lg:text-left">
        <form @submit.prevent="login">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
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
                  v-model="loginForm.username"
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
                  v-model="loginForm.password"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import Cookies from 'js-cookie'
import api from "../services/api";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      console.log("methods.login", this.loginForm);
      if (this.loginForm.username != "" || this.loginForm.password != "") {
        api
          .login(this.loginForm.username, this.loginForm.password)
          .then((data) => {
            console.log(data);
            if (data['access_token']) {
              Cookies.set('username', this.loginForm.username);
              Cookies.set('access_token', data['access_token']);
              this.$router.push('/add')
            } else {
              alert('wrong credentials')
            }
          })
          .catch((error) => {
            console.log(error)
            alert('wrong credentials error')
          })
      }
    },
  },
};
</script>
