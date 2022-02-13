<template>
  <nav class="px-2 py-12 sm:px-6">

    <div class="brand">
      Fun Times
    </div>

    <div class="menu">
      <nuxt-link to="/">Practice</nuxt-link>
      <nuxt-link to="/puzzles">Setup</nuxt-link>
      <nuxt-link to="/about">Info</nuxt-link>
    </div>

  </nav>
</template>

<style lang="postcss" scoped>
  nav {
    @apply relative flex items-center justify-between h-16;
    color:aliceblue;
  }

  .menu a {
    @apply px-3 py-2 rounded-md
  }

  .menu a.nuxt-link-exact-active {
    @apply border-white border-2
  }

  .brand {
    font-family: 'Bangers';
    font-size:40px;
    color:aliceblue;
  }
</style>
