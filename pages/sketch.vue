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
        lastPosition: { x: 0, y: 0 }
      }
    },
    mounted: function () {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize: function (event) {
        const c = document.getElementById('canvas')
        c.width = this.$refs.canvas.offsetWidth
        c.height = 600
      },
      startDrawing: function (event) {
        const c = document.getElementById('canvas')
        this.lastPosition = this.getCursorPosition(c, event)
        this.isDrawing = true
      },
      stopDrawing: function (event) {
        this.isDrawing = false
      },
      draw: function (event) {
        if (!this.isDrawing) return
        const c = document.getElementById('canvas')
        const ctx = c.getContext('2d')
        const position = this.getCursorPosition(c, event)
        ctx.beginPath()
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.lineWidth = 10
        ctx.moveTo(this.lastPosition.x, this.lastPosition.y)
        ctx.lineTo(position.x, position.y)
        ctx.stroke()
        this.lastPosition = position
      },
      getCursorPosition: function (canvas, event) {
        const rect = canvas.getBoundingClientRect()
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
    }
  }
</script>
