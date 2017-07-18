<template>
  <section>
    <h1>Vue Sandbox</h1>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: 'Welcome Page',
      meta: [
        { hid: 'description', name: 'description', content: 'Welcome Page' }
      ]
    }
  },
  transition: {
    name: 'fade-transition',
    mode: 'out-in',
    duration: 100
  }
}
</script>
