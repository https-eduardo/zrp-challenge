<template>
  <div class="flex h-full">
    <panel-sidebar />
    <nuxt-page class="my-6 mx-8" />
    <u-notifications :ui="{ position: 'top-0 bottom-auto right-0' }" />
  </div>
</template>
