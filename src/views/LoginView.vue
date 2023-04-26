<template>
  <div class="d-flex justify-center align-center border-b" style="height:100vh">
    <v-card title="Login" width="450" class="">
      <v-card-text>
        <v-alert class="px-3" v-if="alert" type="error" dismissible dense outlined>Email/Password yang anda masukan
          salah</v-alert>
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field v-model="username" :readonly="loading" :rules="[required]" class="mb-2" clearable
            label="Username"></v-text-field>

          <v-text-field v-model="password" type="password" :readonly="loading" :rules="[required]" clearable label="Password"
            placeholder="Enter your password"></v-text-field>

          <br>

          <v-btn :loading="loading" block color="success" size="large" type="submit" variant="elevated">
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
import { useRouter } from "vue-router";

const show = ref(false)
const { login, isLoading: loading } = useUserStore()
const router = useRouter()
const form = ref(false)
const username = ref('userdemo')
const password = ref('password')
// const rules = reactive({
//   required: (value) => !!value || "Required.",
//   min: (v) => v.length >= 6 || "Min 6 characters",
//   emailMatch: () => `The email and password you entered don't match`,
// })

const required = (v) =>  !!v || 'Field is required'

const onSubmit = async () => {
      const loginSuccessful = await login(username.value, password.value)
      if (loginSuccessful) {
        // login successful, perform any additional actions such as redirecting to a dashboard page
        router.push('/home')
      } else {
        // login unsuccessful, show error message to the user
      }
    }


</script>
