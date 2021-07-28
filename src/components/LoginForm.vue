<template>
  <!-- Login Form -->
  <div
    class="text-white font-bold text-center p-5 mb-4 "
    v-if="log_show_alert"
    :class="log_alert_variant"
  >
    {{ log_alert_msg }}
  </div>
  <vee-form @submit="login" :validation-schema="loginSchema">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="
                    block
                    w-full
                    py-1.5
                    px-3
                    text-gray-800
                    border border-gray-300
                    transition
                    duration-500
                    focus:outline-none
                    focus:border-black
                    rounded
                  "
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="
                    block
                    w-full
                    py-1.5
                    px-3
                    text-gray-800
                    border border-gray-300
                    transition
                    duration-500
                    focus:outline-none
                    focus:border-black
                    rounded
                  "
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button :disabled="log_in_submission" type="submit" :class="classObject">
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email|min:5',
        password: 'required|min:4|max:100',
      },
      log_in_submission: false,
      log_show_alert: false,
      log_alert_variant: 'bg-blue-500',
      log_alert_msg: 'Please wait',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    async login(values) {
      this.log_alert_variant = 'bg-blue-500';
      this.log_in_submission = true;
      this.log_show_alert = true;
      this.log_alert_msg = 'Please wait! Logging in';
      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.log_in_submission = false;
        this.log_alert_variant = 'bg-red-500';
        this.log_alert_msg = 'Invalid login details!';
        return;
      }

      this.log_alert_variant = 'bg-green-500';
      this.log_alert_msg = 'Success, You are logged in!';
      window.location.reload();
    },
  },
  computed: {
    classObject() {
      return {
        block: true,
        'w-full': true,
        'bg-purple-600': !this.log_in_submission,
        'text-white': !this.log_in_submission,
        'py-1.5': true,
        'px-3': !this.log_in_submission,
        rounded: true,
        transition: true,
        'bg-gray-600': this.log_in_submission,
        'hover:bg-purple-700': !this.log_in_submission,
        'disabled:opacity-50': this.log_in_submission,
      };
    },
  },
};
</script>
