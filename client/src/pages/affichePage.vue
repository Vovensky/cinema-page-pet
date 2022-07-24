<template>
    <div class='content' v-if='films'>
        <filmList class="filmlist" :films = 'films' />
    </div>
</template>

<script>
import filmList from '@/components/filmList'
import {mapGetters} from 'vuex'
export default {
    components: {
        filmList
    },
    computed: {
        ...mapGetters({
            getMocks: 'films/getMocks'}),
        films() {
            let mocks = this.getMocks
            return mocks
        },
    },
}
</script>

<style lang='sass' scoped>

.content
    display: flex
    height: 100%

.filmlist
    width: 1200px
    margin-left: auto
    margin-right: auto


</style>