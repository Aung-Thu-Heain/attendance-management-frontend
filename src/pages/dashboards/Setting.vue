<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-file-input
            label="Upload logo"
            prepend-icon="mdi-camera"
            variant="filled"
          ></v-file-input>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            hint="BEHS-Bonetawpyae"
            label="Site description"
            persistent-hint
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            hint="For example, flowers or used cars"
            label="Checkin time"
            model-value="Grocery delivery"
            variant="solo"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            hint="www.example.com/page"
            label="Checkout time"
            variant="solo"
            persistent-hint
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            hint="For example, flowers or used cars"
            label="Checkin limit"
            model-value="Grocery delivery"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            hint="www.example.com/page"
            label="Checkout limit"
            variant="outlined"
            persistent-hint
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
