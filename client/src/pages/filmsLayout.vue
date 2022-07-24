<template>
  <div id='films-layout'>
    <pageHeader @openAuthentication='openAuthentication'/>
    <authenticationWindow class='center' v-if='isHidden' @closeWindow='closeWindow' :auth='auth' />
    <router-view></router-view>
  </div>
</template>

<script>
import pageHeader from '@/components/pageHeader.vue'
import authenticationWindow from '../components/authenticationWindow.vue'
import {mapActions} from 'vuex';

export default {
  components: {
    pageHeader,
    authenticationWindow
  },
  data() {
    return {
      isHidden: false,
      auth: null,
    }
  },
  methods: {
    ...mapActions({
      loadReactions: 'reactions/loadReactions', 
      loadMocks: 'films/loadMocks'}),

    closeWindow() {
      this.isHidden = false
    },

    openAuthentication(obj) {
      let vm = this;
      vm.isHidden = true;
      vm.auth = obj.auth
    }
  },
  created() {
    this.loadReactions()
    this.loadMocks()
  }

}
</script>
