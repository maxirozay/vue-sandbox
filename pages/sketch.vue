<template>
  <section class="text-xs-center">
    <h1>Sketch</h1>
    <div ref="canvas">
      <canvas id="canvas"
        class="grey lighten-4"
        @mousedown="startDrawing"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @mousemove="draw"
        @touchstart="startDrawing"
        @touchend="stopDrawing"
        @touchcancel="stopDrawing"
        @touchmove.prevent="draw"
      >
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    </div>
  </section>
</template>

<script>
  export default {
    data: function () {
      return {
        isDrawing: false,
        lastPosition: { x: 0, y: 0 },
        canvas: null,
        contex: null
      }
    },
    mounted: function () {
      this.canvas = document.getElementById('canvas')
      this.contex = this.canvas.getContext('2d')
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
      if (this.$store.state.sketch.image) {
        this.contex.putImageData(this.$store.state.sketch.image, 0, 0)
      }
    },
    beforeDestroy: function () {
      this.$store.commit('sketch/copyImage',
        this.contex.getImageData(0, 0, this.canvas.width, this.canvas.height))
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize: function (event) {
        this.canvas.width = this.$refs.canvas.offsetWidth
        this.canvas.height = 600
      },
      startDrawing: function (event) {
        this.lastPosition = this.getCursorPosition(event)
        this.isDrawing = true
      },
      stopDrawing: function (event) {
        this.isDrawing = false
      },
      draw: function (event) {
        if (!this.isDrawing) return
        const position = this.getCursorPosition(event)
        this.contex.beginPath()
        this.contex.lineJoin = 'round'
        this.contex.lineCap = 'round'
        this.contex.lineWidth = 10
        this.contex.moveTo(this.lastPosition.x, this.lastPosition.y)
        this.contex.lineTo(position.x, position.y)
        this.contex.stroke()
        this.lastPosition = position
      },
      getCursorPosition: function (event) {
        const rect = this.canvas.getBoundingClientRect()
        if (event.touches) {
          return {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top
          }
        }
        return { x: event.clientX - rect.left, y: event.clientY - rect.top }
      }
    },
    head () {
      return {
        title: 'Sketch',
        meta: [
          { hid: 'description', name: 'description', content: 'Sketch' }
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
