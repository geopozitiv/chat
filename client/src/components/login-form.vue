<template>
  <form>
      <v-text-field
        v-model.trim="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :type="'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-btn class="mr-4" @click.prevent="submit()">submit</v-btn>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'


export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Must be at least 8 characters')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('e-mail is required')
      return errors
    },
  },
  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        const login = await this.$store.dispatch('USER_SIGNIN', formData)
        if(login === "ok") this.$router.push('/chat')
      } catch (e) {
         console.log(e)
      }
    }
  }
}
</script>