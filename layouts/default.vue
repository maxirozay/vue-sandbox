<template>
  <v-app dark toolbar footer>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      overflow
      enable-resize-watcher
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://vuejs.org/images/logo.png" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Menu</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile
          to
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container>
        <nuxt/>
      </v-container>
    </main>
    <v-footer>
      <span>footer</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        title: 'Vue Sandbox',
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Sketch', to: '/sketch' }
        ]
      }
    }
  }
</script>
