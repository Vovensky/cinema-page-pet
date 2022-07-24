<template>
        <div class='commentaries_wrapper' >
            <div class='commentaries' >
                <div v-if='comments'>
                <div class='commentaries_header' v-for='(comment) of comments' :key='comment.time'>
                    <div class='commentaries__header-value'>
                        <span> {{comment.userName}} </span>
                        <span style='padding-left: 15px'> {{comment.fullDate}} {{comment.time}}</span>
                    </div>
                    <div class='commentaries__header-body'>
                        <span> {{comment.commentValue}}</span>
                    </div> 
                </div>
                </div>
                <div v-else>
                    <div class='commentaries__header-body' style='font-size: 24px; color: green; padding: 20px 10px 10px 15px'>
                        <span> Никто пока не оставил комментарий к фильму</span>
                    </div> 
                </div>
            </div>
            <div class='commentaries_input'>
                <div class='commentaries_input__userName'>
                    <div class='commentaries_input__label'> Введите никнейм </div>
                    <input type='text' class='commentaries_input__input' placeholder='Ваш никнейм' v-model='userName'/>
                </div>
                <div class='commentaries_input__comment'> 
                    <textarea type='text' class='commentaries_input__textarea' placeholder="Введите комментарий" v-model='commentValue'/>
                </div>
                <div> 
                    <button @click='postComment' class='commentaries_input__button'> Добавить комментарий</button>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'CommenTaries',
    data() {
        return {
            userName: '',
            commentValue: '',
            comments: null,
        }
    },
    created() {
        this.$load( async() => {
            let data = (await this.$api.comment.getComment({
                filmId: this.$route.params.id,
            })).data
            data = data.reverse()
            this.comments=data   
        })
    },
    methods: {
        postComment() {
            this.$load( async () => {
            if(this.commentValue.length <= 0) {
                return
            } else {
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let time = date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds()
            let fullDate = day+'-'+month+'-'+year
            const data = (await this.$api.comment.postComment({
                userName: this.userName,
                commentValue: this.commentValue,
                filmId: this.$route.params.id,
                fullDate: fullDate,
                time: time,
            })).data
            this.comments = data.reverse()
            }
        })
    }
    }
}
</script>

<style lang='sass' scoped>
.commentaries_wrapper
    display: flex
    @media screen and (max-width: 1000px) 
        width: 100%
        display: block

.commentaries
    display: block
    width: 60%
    box-sizing: border-box
    padding: 0px 30px
    @media screen and (max-width: 1000px) 
        width: 100%
        display: block

    .commentaries_header
        text-align: left
        diplay: block

    .commentaries__header-value
        padding: 20px 10px 10px 15px
        line-height: 20px
        font-size: 12px

    .commentaries__header-body
        padding: 0px 10px 10px 15px
        line-height: 20px
        border-bottom: 2px solid #e9e9e9 

.commentaries_input
    display: block
    width: 40%
    box-sizing: border-box
    @media screen and (max-width: 1000px) 
        width: 100%
        display: block

    .commentaries_input__userName
        width: 100%
        padding: 30px 30px 10px 30px
        line-height: 20px
        box-sizing: border-box
        text-align: left

    .commentaries_input__comment
        width: 100%
        padding: 0px 30px 30px 30px
        line-height: 20px
        box-sizing: border-box
        text-align: left

    .commentaries_input__label
        padding: 0px 0px 10px 0px
        box-sizing: border-box
        font-weight: bold
        color: green
        
    
    .commentaries_input__textarea
        width: 100%
        height: 100px
        font-family: Avenir, Helvetica, Arial, sans-serif
        font-size: 16px
        padding-top: 10px
        &:hover
            cursor: pointer
    
    .commentaries_input__input
        width: 100%
        height: 2em
        font-family: Avenir, Helvetica, Arial, sans-serif
        font-size: 16px
        box-sizing: border-box
        &:hover
            cursor: pointer

    .commentaries_input__button
        width: 200px
        height: 50px
        font-size: 16px
        background-color: rgba(255,255,255,1)
        border: 3px solid #F7CA18
        &:hover
            background-color: #F7CA18
            transition: background-color 0.5s



</style>
