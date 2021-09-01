<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";

body {
  line-height: 1.5;
  font-size: 16px;
  font-family: $font-hei;
  color: #333;
  background: white;
  max-width: 450px;
  margin-left: auto !important;
  margin-right: auto !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
