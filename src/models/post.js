import { BACKENDURL } from "../App"
import { sqlToJsDate } from "../utils"
import {v4 as uuidv4, v4} from 'uuid';
import moment from "moment";

export function Post(ID, PosterID, PosterName, NumLikes, PostTime, Title, Content){
    this.id = ID
    this.poster_id = PosterID
    this.poster_name = PosterName
    this.num_likes = NumLikes
    this.post_time = PostTime
    this.title = Title
    this.content = Content
}

function parseFromJson(json){
    
    //takes a json string with either a single post or list of posts, parses and returns them
    //field names must match

    const data = json
    if (data instanceof Array){
        //multiple posts
        var results = []
        for (let thisPost of data){
            results.push(new Post(
                thisPost.id,
                thisPost.poster_id,
                thisPost.poster_name,
                thisPost.num_likes,
                sqlToJsDate(thisPost.post_time),
                thisPost.title,
                thisPost.content
            ))
        }
        return results
    }else{
        return new Post(
            data.id,
            data.poster_id,
            data.poster_name,
            data.num_likes,
            sqlToJsDate(data.post_time),
            data.title,
            data.content
        )
    }
}

export function getHomePosts(setPosts){
    let URL = `${BACKENDURL}/post/get-all`
    //get the posts for the home page, return promise
    //on success promise resolves to true, and setPosts is used to modify state
    //setPosts takes a list of post objects

    return new Promise(async (resolve) => {
        try{
            let response = await fetch(URL,{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let content = await response.json()
            if (!response.ok){
                setPosts(new Error(content.detail))
                resolve(new Error(content.detail))
                return
            }
            const posts = parseFromJson(content.data)
            setPosts(posts)
            resolve(true)
        }catch(e){
            console.log(e)
            resolve(new Error("Failed to retrieve posts."))
        }        
    })
}

export function getPostByID(setPost, postID){
    let URL = `${BACKENDURL}/post/get/${postID}`
    //gets a specific post by its id
    //on success promise resolves to true, and setPost is used to modify state
    //setPost takes a single post object

    //for demo reasons, just gets the first post
    return new Promise(async (resolve, reject) => {
        try{
            //const posts = parseFromJson(await(await fetch('/MOCK_POSTS.json')).text())
            let response = await fetch(URL)
            let content = await response.json()
            if (!response.ok){
                setPost(new Error(content.detail))
                resolve(new Error(content.detail))
                return
            }
            let post = parseFromJson(content.data)
            setPost(post)
            console.log(post)
            resolve(true)
        }catch(e){
            console.log(e)
            resolve(new Error("Failed to retrieve posts."))
        }
    })
}

export function getPostsByPosterID(setPosts, posterID){
    //gets all posts from a specific account
    //on success promise resolves to true, and setPosts is used to modify state
    //setPosts takes a list of post objects
    let URL = `${BACKENDURL}/post/get-all`

    return new Promise(async (resolve) => {
        try{
            let response = await fetch(URL,{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let content = await response.json()
            if (!response.ok){
                setPosts(new Error(content.detail))
                resolve(new Error(content.detail))
                return
            }
            const posts = parseFromJson(content.data)

            let userPosts = []
            for(let i = 0; i < posts.length; i++){
                let thisPost = posts[i]
                if(thisPost.poster_id === posterID){
                    userPosts.push(thisPost)
                }
            }
            setPosts(userPosts)
            resolve(true)
        }catch(e){
            console.log(e)
            resolve(new Error("Failed to retrieve posts."))
        }        
    })
}

export function postPost(setSession, session, title, content){
    //submit a new post
    //title and content are strings, session is Session object
    //server should init remaining fields
    //return promise
    //on success promise resolves to new posts id (for redirect to post)
    //on fail promise resolved to error with appropriate message, if necessary call session.logout() for invalid session

    const URL = `${BACKENDURL}/post/add`
    let post = new Post(
        uuidv4(),
        session.userID,
        session.displayName,
        0,
        moment().format('YYYY-MM-DD HH:mm:ss'),
        title,
        content
    )
    console.log(post)

    return new Promise(async (resolve) =>{
        let response = await fetch(URL,{
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Authorization": session.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if(response.ok){
            resolve(post.id)
            return
        }else{
            let content = await response.json()
            resolve(new Error(content.detail[0].msg))
            return
        }
        
    })

}

export function deletePost(setSession, session, postID){
    //remove a post
    //return promise
    //oon success promise resolves to true
    const URL = `${BACKENDURL}/post/delete/${postID}`
    return new Promise(async (resolve) => {
        let response = await fetch(URL,{
            method: "DELETE",
            headers: {
                "Authorization": session.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok){
            resolve(new Error("Could not delete post"))
            return
        }
        resolve(true)
    })
}