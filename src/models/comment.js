import { sqlToJsDate } from "../utils"

export function Comment(id, posterID, posterName, postTime, parentPostID, content){
    this.id = id
    this.posterID = posterID
    this.posterName = posterName
    this.postTime = postTime
    this.parentPostID = parentPostID
    this.content = content
}

function parseFromJson(json){
    const data = JSON.parse(json)
    if(
        ! data instanceof Array
    ){
        return Error("Expected list")
    }

    let comments = []
    for(let comment of data){
        comments.push(
            new Comment(
                comment.ID,
                comment.PosterID,
                comment.PosterName,
                sqlToJsDate( comment.PostTime),
                comment.ParentPostID,
                comment.Content
            )
        )
    }

    return comments
}

export function getCommentsFromPostID(setComments, postID){
    //returns a promise
    //on success, pass array of comments into setComments() to update webpage state, then resolve promise to true
    //on fail, pass error object into setComments(), message contained will be displayed to user, resolve promise to false
    return new Promise(async (resolve)=>{
        try{
            const comments = parseFromJson(await(await fetch('/MOCK_COMMENTS.json')).text())
            setComments(comments)
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
    return new Promise((resolve)=>{
        resolve(true)
    })
}