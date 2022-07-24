<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      foo: '1фвыфвфвф'
    }
  }
}
</script>

<style lang='sass'>
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  

body
  margin: 0px
  background: rgb(15, 30, 55)
  color: black
  text-shadow: inset 1px 1px 1px 1px white

body::-webkit-scrollbar 
  width: 10px

body::-webkit-scrollbar-track
  background: #0f1e37;        /* цвет зоны отслеживания */

body::-webkit-scrollbar-thumb
  background-color: #0f1e37;    /* цвет бегунка */
  border-radius: 20px;       /* округлось бегунка */
  border: 1px solid white
</style>
