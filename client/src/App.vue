<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="#c0c2ce">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> HelpDesk </v-list-item-title>
          <v-list-item-subtitle> MINE </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group color="#e81d76">
          <v-list-item color="#e81d76" c v-for="(item, i) in items" :key="i" :to='item.link' link>
            <v-list-item-icon>
              <v-icon v-text="item.icon" color="#e81d76"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title color="#ffff" v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#1a1b1f" >
      <v-app-bar-nav-icon color="#e81d76" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="name"><span class="nipa">MINE</span> helpdesk</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
       drawer: null,
     items: [
        { title: 'Home', icon: 'mdi-home', link: '/' },
         { title: 'Create New Ticket', icon: 'mdi-note-plus', link: '/add-post' },
          { title: 'Admin', icon: 'mdi-account', link: '/admin' }
        
      ],
  }),
};
</script>
<style scoped>
.nipa{
  color: #e81d76;
  font-size: 2rem;
  font-weight: bold;
}
.name{
  font-size: 1rem;
  color: #ffff;
}
</style>
