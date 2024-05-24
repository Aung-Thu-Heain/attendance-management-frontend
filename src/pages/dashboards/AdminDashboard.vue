<template>
  <v-card class="mt-8 mx-8 overflow-visible" max-width="400">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
      rounded="lg"
    >
      <v-sparkline
        :labels="labels"
        :model-value="value"
        color="white"
        line-width="2"
        padding="16"
        width="900"
        height="300"
      ></v-sparkline>
    </v-sheet>
    <v-card-actions class="justify-center">
      <v-btn variant="text" class="font-weight-light" block>
        Go to Report
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
  }),
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
