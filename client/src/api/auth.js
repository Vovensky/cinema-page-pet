export default function(instance) {
    return {
        signIn(payload) {
            return instance.post('users/signIn', payload)
        },
        signUp(payload) {
            return instance.post('users/signUp', payload)
        },
        // logout(){
        //     return instance.delete('users/logout')
        // }        
    }
}