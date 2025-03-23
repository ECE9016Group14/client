export function didILikeThis(setSession, session, postID){
    // return promise
    // if success, resolve promise to true or false as appropriate
    // if fail, resolve to false, alert if you want, and if necessary call logout(setSession, session) in session.js
    return new Promise((resolve)=>{
        resolve(false)
    })
}

export function like(setSession, session, postID){
    // return promise
    // if success, resolve promise to true
    // if fail, resolve to false, alert user if you want, and if necessary call logout(setSession, session) in session.js
    return new Promise((resolve)=>{
        resolve(true)
    })
}

export function unLike(setSession, session, postID){
    // return promise
    // if success, resolve promise to true
    // if fail, resolve to false, alert user if you want, and if necessary call logout(setSession, session) in session.js
    return new Promise((resolve)=>{
        resolve(true)
    })
}