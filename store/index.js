export const state = () => ({
    users : [
        { username : "root" , password : "1234"},
        { username : "admin" , password : "admin"}
    ]
})

export const actions = {

}

export const mutations = {
    addUser(state , {username , password}){
        state.users.push({username , password})
    }
}

export const getters = {

}