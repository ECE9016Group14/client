import { BACKENDURL } from "../App"
import { sqlToJsDate } from "../utils"
import {v4 as uuidv4, v4} from 'uuid';
import moment from "moment";


export function Comment(id, posterID, posterName, postTime, parentPostID, content){
    this.id = id
    this.posterID = posterID
    this.posterName = posterName
    this.postTime = postTime
    this.parentPostID = parentPostID
    this.content = content
}

function parseFromJson(json){
    const data = json
    if(
        ! data instanceof Array
    ){
        return Error("Expected list")
    }

    let comments = []
    for(let comment of data){
        comments.push(
            new Comment(
                comment.id,
                comment.poster_id,
                comment.poster_name,
                sqlToJsDate( comment.post_time),
                comment.parent_post_id,
                comment.content
            )
        )
    }

    return comments
}

export function getCommentsFromPostID(setComments, postID){
    //returns a promise
    //on success, pass array of comments into setComments() to update webpage state, then resolve promise to true
    //on fail, pass error object into setComments(), message contained will be displayed to user, resolve promise to false
    const URL = `${BACKENDURL}/comment/get-all`
    return new Promise(async (resolve)=>{
        try{
            const response = await fetch(URL)
            const content = await response.json()
            if (!response.ok){
                setComments(new Error(content.detail))
                resolve(new Error(content.detail))
                return
            }
            const comments = parseFromJson(content.data)
            let this_posts_comments = []
            for (let i = 0; i < comments.length; i++){
                let this_comment = comments[i]
                if (this_comment.parentPostID === postID){
                    this_posts_comments.push(this_comment)
                }
            }
            console.log(postID)
            setComments(this_posts_comments)
            resolve(true)
        }catch(e){
            console.log(e)
            resolve(new Error("Failed to retrieve posts."))
        }  
    })
}

export function postComment(setSession, session, parentPostID, commentText){
    // returns a promise
    //on success, resolve promise to true, this will cause page to reload comments
    //on fail, resolve promise to Error(message), and if necessary trigger a logout by calling logout(setSession, session) in session.js
    const URL = `${BACKENDURL}/comment/add`

    const comment = {
        'id':uuidv4(),
        'poster_id':session.userID,
        'poster_name':session.displayName,
        'post_time':moment().format('YYYY-MM-DD HH:mm:ss'),
        'parent_post_id':parentPostID,
        'content':commentText
    }

    return new Promise(async (resolve)=>{
        let response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(comment),
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
    })
}