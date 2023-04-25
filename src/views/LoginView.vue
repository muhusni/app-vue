<template>
  <div class="d-flex">
    <v-card title="Login" width="450" class="ma-auto justify-center">
      <v-card-text>
        <v-alert class="px-3" v-if="alert" type="error" dismissible dense outlined>Email/Password yang anda masukan
          salah</v-alert>
        <v-form ref="form" @submit.prevent="submit" method="POST">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field :color="this.$vuetify.theme.dark ? 'secondary' : 'primary'" label="Email"
                  v-model="form.username" :rules="[rules.required]" counter>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field :color="this.$vuetify.theme.dark ? 'secondary' : 'primary'" v-model="form.password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                  :type="show ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 6 characters"
                  counter @click:append="show = !show"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn :color="this.$vuetify.theme.dark ? 'secondary' : 'primary'" elevation="2" block type="submit"
                  :class="this.$vuetify.theme.dark ? 'primary--text' : 'secondary--text'" raised>LOGIN</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";

const show = ref(false)
const rules = reactive({
  required: (value) => !!value || "Required.",
  min: (v) => v.length >= 6 || "Min 6 characters",
  emailMatch: () => `The email and password you entered don't match`,
})

const form = reactive({
  username: "",
  password: "",
})
</script>
