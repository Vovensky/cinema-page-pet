export default function(instance) {
    return {
        postComment(payload) {
            return instance.post('film/postCommentaries', payload)
        }, 
        getComment(payload) {
            return instance.post('film/getCommentaries', payload)
        }     
    }
}