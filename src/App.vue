<template>
  <div
    id="demo"
    :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]"
  >
      <div class="container">
        <router-view @authenticated="onAuthenticated" :authenticated="authenticated"/>
      </div>
      <sidebar-menu
        :menu="menu"
        :collapsed="collapsed"
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
        @item-click="onItemClick"
      >
          <span slot="toggle-icon" class="icon-equalizer"></span>
      </sidebar-menu>
      <div
        v-if="isOnMobile && !collapsed"
        class="sidebar-overlay"
        @click="collapsed = true"
      />
    </div>
</template>


<script>
  export default {
    data() {
      return {
        menu: [
          {
            href: '/',
            title: 'Home',
            icon: 'icon-home3'
          },
          {
            href: '/maps',
            title: 'Maps',
            icon: 'icon-map'
          },
          {
            href: '/about',
            title: 'About',
            icon: 'icon-question'
          }
        ],
      collapsed: false,
      isOnMobile: false,
      authenticated: false,
      }
    },
    mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onToggleCollapse (collapsed) {
      console.log(collapsed)
      this.collapsed = collapsed
    },
    onItemClick () {
      console.log('onItemClick')
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
      }
    },
    onAuthenticated() {
      console.debug("Authenticated");
      this.authenticated = true;
    }
  }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');
body,
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}
#demo {
  padding-left: 350px;
  transition: 0.3s ease;
}
#demo.collapsed {
  padding-left: 50px;
}
#demo.onmobile {
  padding-left: 50px;
}
.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;
}
.onmobile .container {
  padding: 10px;
}
.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}
.demo {
  padding: 50px;
}
pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}
</style>
