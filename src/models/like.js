import { BACKENDURL } from "../App"
import {v4 as uuidv4, v4} from 'uuid';

export function didILikeThis(setSession, session, postID){
    const URL = `${BACKENDURL}/like/get_by_post_and_user?`
    // return promise
    // if success, resolve promise to true or false as appropriate
    // if fail, resolve to false, alert if you want, and if necessary call logout(setSession, session) in session.js
    return new Promise(async(resolve)=>{
        try{
            let response = await fetch(URL+ new URLSearchParams({
                post_id: postID,
                user_id: session.userID,
            }).toString())
            let content = response.json()
            if(!response.ok){
                resolve(false)
                return
            }


            resolve(true)
        }catch(e){
            resolve(false)
        }
    })
}

export function like(setSession, session, postID){
    const URL = `${BACKENDURL}/like/add`
    // return promise
    // if success, resolve promise to true
    // if fail, resolve to false, alert user if you want, and if necessary call logout(setSession, session) in session.js
    let like = {
        'id': uuidv4(),
        'user_id': session.userID,
        'post_id': postID
    }
    return new Promise(async (resolve)=>{
        try{
            let response = await fetch(URL,{
                method: "POST",
                body: JSON.stringify(like),
                headers: {
                    "Authorization": session.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let content = await response.json()
            if(!response.ok){
                resolve(new Error(content.detail))
                return
            }
            resolve(true)
        }catch(e){
            console.log(e)
        }
    })
}

export function unLike(setSession, session, postID){
    const URL = `${BACKENDURL}/like/delete/${session.userID}/${postID}`
    // return promise
    // if success, resolve promise to true
    // if fail, resolve to false, alert user if you want, and if necessary call logout(setSession, session) in session.js
    return new Promise(async (resolve)=>{
        try{
            let response = await fetch(URL,{
                method: "DELETE",
                headers: {
                    "Authorization": session.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            //let content = await response.json()
            if(!response.ok){
                resolve(true)
                return
            }
            resolve(true)
        }catch(e){
            console.log(e)
        }
    })
}