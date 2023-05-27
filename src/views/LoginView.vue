<template>
  <div class="d-flex justify-center align-center border-b" style="height:100vh">
    <v-card title="Login" width="450" class="" :loading="isLoading" :disabled="isLoading">
      <v-card-text>
        <v-alert class="mb-3 px-3" v-if="alert" type="error" dismissible dense outlined>Email/Password yang anda masukan
          salah</v-alert>
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field v-model="username" name="username" :readonly="isLoading" :rules="[required]" class="mb-2"
            clearable label="username"></v-text-field>

          <v-text-field v-model="password" name="password" type="password" :readonly="isLoading" :rules="[required]"
            clearable label="Password" placeholder="Enter your password"></v-text-field>
          <br>
          <v-btn block color="secondary" :disabled="isLoading" size="large" type="submit" variant="elevated">
            Sign In
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { useUserStore } from "@/store/userStore";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app";

// const show = ref(false)

const UserStore = useUserStore()
const router = useRouter()
const curRouter = useRoute()
const { snackbarAct } = useAppStore()
const { login } = UserStore
const { isLoading } = storeToRefs(UserStore)
const form = ref(false)
const username = ref('test@example.com')
const password = ref('password')
const alert = ref(false)
// const rules = reactive({
//   required: (value) => !!value || "Required.",
//   min: (v) => v.length >= 6 || "Min 6 characters",
//   emailMatch: () => `The email and password you entered don't match`,
// })

const required = (v) => !!v || 'Field is required'
const onSubmit = async () => {
  // router.push('/home')
  // if (!form.value) return
  const loginSuccessful = await login(username.value, password.value)
  if (loginSuccessful) {
    // login successful, perform any additional actions such as redirecting to a dashboard page
    // loading = false
    snackbarAct(true, 'Berhasil Login', 'green')
    let nextUrl = curRouter.query.redirect == null ? '/home' : curRouter.query.redirect
    // console.log(nextUrl)
    router.push(nextUrl)
  } else {
    // login unsuccessful, show error message to the user
    // loading = false
    alert.value = true
  }
}
</script>
