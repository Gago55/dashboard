export const state = () => ({
    users : [
        { username : "root" , password : "1234"},
        { username : "admin" , password : "admin"}
    ],
    loginError : false ,
    isAuth : false ,
    authUser : ""
})

export const actions = {
    login({commit , state} , {username,password}){
        state.users.forEach(user => {
            if(user.username === username)
                if(user.password === password){
                    // state.isAuth = true
                    // state.authUser = username
                    commit('setIsAuth' , true)
                    commit('setAuthUser' , username)
                    localStorage.setItem("username" , username)
                }
        })
        if(!state.isAuth)
            commit("setLoginError" , true)
            // state.loginError = true
    }
}

export const mutations = {
    addUser(state , {username , password}){
        state.users.push({username , password})
    },
    setIsAuth(state , value){
        state.isAuth = value
    },
    setAuthUser(state,value){
        state.authUser = value
    },
    setLoginError(state , value){
        state.loginError = value
    }
}

export const getters = {
    getLoginError : state => state.loginError ,
    getIsAuth : state => state.isAuth ,
}