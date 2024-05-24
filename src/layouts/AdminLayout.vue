<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Attendance Management"></v-app-bar>

    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          subtitle="sandra_a88@gmailcom"
          title="Sandra Adams"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Users"
          value="users"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-security"
          title="Roles"
          value="roles"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-google-classroom"
          title="Classes"
          value="classes"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cog-outline"
          title="Setting"
          value="setting  "
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="" style="min-height: 300px">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>
