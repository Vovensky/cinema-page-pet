<template>
<div class='pageHeader_container'>
    <div class='pageHeader'>
        <div class='pageHeader__authPanel'>
            <div class='pageHeader__authButton' @click='AuthButtonClick'> {{getUser ? 'Выйти' : "Войти"}}</div>
        </div> 
    </div>
    
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
    name: 'pageHeader',
    data() {
        return {
            auth: 'true'
        }
    },
    created() {
        this.setUser(JSON.parse(localStorage.getItem('user')))
    },
    computed: {
        ...mapGetters({
            getUser: 'user/getUser'
        })
    },
    methods: {
        ...mapActions({
            setUser: 'user/setUser',
            deleteUser: 'user/deleteUser'
        }),
        AuthButtonClick() {
            let vm = this;
            if (vm.getUser) {
                // this.$api.auth.logout() - удаляет залогинившихся пользователей
                localStorage.removeItem('user')
                vm.deleteUser()
            } else {
                vm.$emit('openAuthentication', {auth: vm.auth})
            }
        }
    }
}
</script>


<style lang='sass' scoped>
.pageHeader_container
    width: 100%
    height: 100px
    position: relative
    display: block

.pageHeader
    width: 100%
    height: 100px
    background-color: #0f1e37
    opacity: 1
    position: fixed
    border: 1px solid black
    z-index: 500
    display: flex
    justify-content: center
    align-content: center

.pageHeader__authPanel
    width: 80%
    margin-left: auto 
    margin-right: auto 
    height: 100%
    position: relative
    display: flex
    justify-content: flex-end
    align-items: center
    @media screen and (max-width:1800px)
        width: 80%
        margin-left: auto 
        margin-right: auto 

.pageHeader__authButton
    position: relative
    float: right
    display: flex
    justify-content: center
    align-content: center
    font-weight: 700
    color: black
    text-decoration: none
    padding: .8em 1em calc(.8em + 3px);
    border-radius: 3px
    background: white
    box-shadow: 0 -3px rgb(128, 128, 128) inset
    transition: 0.2s
    
    border: 1px solid #C0C0C0


.pageHeader__authButton:active:hover
    background: rgb(192,192,192)

.pageHeader__authButton:active
    background: rgb(33,147,90)
    box-shadow: 0 3px rgb(33,147,90) inset


    


</style>