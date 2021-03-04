<template>
  <b-dropdown
    id="dropdown-form"
    text="Profile"
    ref="dropdown"
    class="animated w-25 ml-lg-5"
    variant="light"
  >
    <b-dropdown-form class="w-100 p-5">
      <b-form-group
        label="Email"
        label-for="dropdown-form-email"
        @submit.stop.prevent
      >
        <b-form-input
          id="dropdown-form-email"
          size="sm"
          placeholder="email@example.com"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="dropdown-form-password">
        <b-form-input
          id="dropdown-form-password"
          type="password"
          size="sm"
          placeholder="Password"
        >
        </b-form-input>
      </b-form-group>
      <b-form-checkbox class="mb-3">Remember me</b-form-checkbox>
      <b-button variant="primary" size="md" @click="onClick">Sign In</b-button>
    </b-dropdown-form>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item-button> New around here? Sign up </b-dropdown-item-button>
    <b-dropdown-item-button> Forgot Password? </b-dropdown-item-button>
  </b-dropdown>
</template>
