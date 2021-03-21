<template>
  <div class="app-container">
    <header>
          <nav class="navbar">
            <NuxtLink to="/" class="navbar-logo">
                <img class="fill-current mr-3" src="@/assets/images/logo.png">
                Laraholder
            </NuxtLink>
 
            <div class="nav">
                <NuxtLink to="/" class="item-link">Home</NuxtLink>
                <NuxtLink to="/how-to-use" class="item-link">How to use</NuxtLink>
                <NuxtLink to="/contact-us" class="item-link">Contact us</NuxtLink>
            </div>

        </nav>
    </header>

    <section class="content">
      <Nuxt />
    </section>
  </div>
</template>