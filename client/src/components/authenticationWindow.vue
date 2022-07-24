<template>
<div class='authentication' @click.self='closeWindow'>
    <div class='modalWindow'>
        <div class='wrapper'>
        <div class="modalWindow_header">
            <div class='modalWindow_header__header'>{{authentication ? 'Вход' : 'Регистрация'}}</div>
        </div>
        <div class='block'>
            <div class='body_menu'>
                <div class='body_menu__item'>
                    <div>Логин</div>
                    <input class='body_menu__input' type="text"
                    v-model='userInfo.login'>
                </div>
                <div class='body_menu__item'>
                    <div>Пароль</div>
                    <input class='body_menu__input' type="text" 
                    v-model="userInfo.password">
                </div>
                <div class='body_menu__item' v-if='!authentication'>
                    <div>Повторите пароль</div>
                    <input class='body_menu__input' type="text"
                    v-model='passwordConfirmed'>
                </div>
                <div class='body_menu__item'>
                <button class='body_auth-button' type='text' @click='requestOnServer' >{{authentication ? 'Войти' : 'Зарегистрироваться'}}</button>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class='block'>
                <div class='footer__item'>{{authentication ? 'Еще не зарегистрированы?' : 'Уже есть аккаунт?'}} 
                    <span class='footer__login' @click='changeAuth'> {{authentication ? 'Зарегистрироваться' : 'Войти'}} </span>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>

</template>

<script>

export default {
    name: 'authenticationWindow',
    inheritAttrs: false,
    props: ['auth'],
    data() {
        return {
            userInfo: {
                login: 'testUser',
                password: 1234567890,
            },
            passwordConfirmed: '',
            usersObject: {},
            authentication: this.auth
        }
    },
    methods: {
        closeWindow() {
            this.$emit('closeWindow')
        },

        changeAuth() {
            this.authentication = !this.authentication
        },

        passwordValidator() {
            let vm = this
            vm.passwordValidation = true;
            if(!vm.authentication) {
                vm.passwordValidation = (vm.userInfo.password == vm.passwordConfirmed)
                console.log(`password: ${vm.passwordValidation}`)
            }
        },

        requestOnServer() {
            let vm = this

            if(vm.authentication) {
                vm.signIn()
            } else {
                vm.passwordValidator()
                vm.passwordValidation ? vm.signUp() : console.log('Пароли не совпадают')
            }
        //     vm.passwordValidator()
        //     if(vm.passwordValidation) {
        //         // this.$load = 
        //     fetch(`http://localhost:8000/users/${sign}`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json; charset=utf-8'
        //         },
        //         body: JSON.stringify(this.userInfo)
        //     }).then(response => {
        //         if(response.status==200) {
        //         return response.json()
        //         } else {return response.text()}
        //     }).then(response => {
        //     console.log(response)
        //     }) 
        // } else {console.log(`пароли не совпадают`)}
        },

    signIn() {
        this.$load( async () => {
            const data = (await this.$api.auth.signIn({
                login: this.userInfo.login,
                password: this.userInfo.password,
            })).data
            localStorage.setItem('user', JSON.stringify(data))
            this.$store.dispatch('user/setUser', data)
            this.closeWindow()
        })
    },

    signUp() {
       this.$load( async () => {
            const data = (await this.$api.auth.signUp({
                login: this.userInfo.login,
                password: this.userInfo.password,
            })).data
            localStorage.setItem('user', JSON.stringify(data))
            this.$store.dispatch('user/setUser', data)
            this.closeWindow()
        }) 
    }

    }
}

</script>

<style lang='sass' scoped>

.authentication
    width: 100%
    height: 100%
    background-color: rgba(0,0,0,0.3)
    position: fixed
    display: flex
    z-index: 600
    justify-content: center
    align-items: center
    flex-direction: row

    .modalWindow
        width: 500px
        border: 1px solid black
        display: block
        background-color: white
        opacity: 1

    .wrapper
        padding: 40px
        box-sizing: border-box

    .modalWindow_header
        width: 80%
        background: white
        display: flex
        margin-right: auto 
        margin-left: auto

    .modalWindow_header__header
        font-size: 14px
        font-weight: 700
        color: black
        font-size: 24px

    .footer
        width: 100%
        height: 60px
        background-color: white
        color: black
        font-weight: normal
        box-sizing: border-box

    .footer__item
            text-align: left
            font-size: 14px

    .footer__login
        color: #87CEFA
        &:hover
            text-decoration: underline
            cursor: pointer
            &:active
                color: orange


    .block
        position: relative
        width: 80%
        margin-bottom: auto
        order: 1px solid black
        margin-right: auto 
        margin-left: auto
        margin-bottom: 50px
        
    .body_menu
        display: block
        width: 100%
        padding-top: 15px
        line-height: 15px

    .body_menu__item
        display: block
        margin-top: 10px
        text-align: left
        width: 100%
        background-color: #FFF5EE
        color: black
        font-family: BlinkMacSystemFont, Arial, sans-serif
        font-size: 14px
        font-weight: 700
        margin-top: 30px

    .body_menu__input
        width: 100%
        height: 40px
        border: 1px solid #DBDBDB
        padding: 0 14px;
        box-sizing: border-box
        font-size: 14px
        &:focus
            background-color: #E0FFFF

    .body_auth-button
        width: 100%
        height: 50px
        background: #558cb7
        border: none
        color: rgb(255,255,255)
        border-radius: 3px
        font-weight: 700
        transition: 0.7s
        &:hover
            background-color: #4682B4
            cursor: pointer

</style>
