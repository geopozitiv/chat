<template>
  <form>
      <v-text-field
        v-model.trim="name"
        :error-messages="nameError"
        label="Name"
        required
      ></v-text-field>
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
      <v-text-field
        v-model="passwordTwo"
        :error-messages="passwordTwoErrors"
        :type="'password'"
        name="input-10-1"
        label="Password"
        hint="Repeat password"
        @input="$v.passwordTwo.$touch()"
        @blur="$v.passwordTwo.$touch()"
      ></v-text-field>
      <v-btn class="mr-4" @click="submitHandler()">submit</v-btn>
  </form>
</template>

<script>
import {email, required, minLength, sameAs} from 'vuelidate/lib/validators';

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    passwordTwo: '',
    name: '',
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(8)},
    passwordTwo: {
        required: required,
        sameAs: sameAs('password')
    },
    name: {required},
  },
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength && errors.push('Must be at least 8 characters')
      return errors
    },
    passwordTwoErrors () {
      const errors = []
      if (!this.$v.passwordTwo.$dirty) return errors
      !this.$v.passwordTwo.required && errors.push('Password is required')
      !this.$v.passwordTwo.sameAs && errors.push('Password is not mach')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('e-mail is required')
      return errors
    },
    nameError () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Name is required')
      return errors
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        const login = await this.$store.dispatch('USER_SIGNUP', formData)
        if(login === "ok") {
          this.$router.push({name:'Chat'})
        }
      } catch (e) {
          console.log(e)
      }
    }
  }
}
</script>
