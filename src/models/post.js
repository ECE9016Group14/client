import { sqlToJsDate } from "../utils"

export function Post(ID, PosterID, PosterName, NumLikes, PostTime, Title, Content){
    this.id = ID
    this.posterID = PosterID
    this.posterName = PosterName
    this.numLikes = NumLikes
    this.postTime = PostTime
    this.title = Title
    this.content = Content
}

function parseFromJson(json){
    //takes a json string with either a single post or list of posts, parses and returns them
    //field names must match

    const data = JSON.parse(json)
    if (data instanceof Array){
        //multiple posts
        var results = []
        for (let thisPost of data){
            results.push(new Post(
                thisPost.ID,
                thisPost.PosterID,
                thisPost.PosterName,
                thisPost.NumLikes,
                sqlToJsDate(thisPost.PostTime),
                thisPost.Title,
                thisPost.Content
            ))
        }
        return results
    }else{
        return new Post(
            data.ID,
            data.PosterID,
            data.PosterName,
            data.NumLikes,
            sqlToJsDate(data.PostTime),
            data.Title,
            data.Content
        )
    }
}

export function getHomePosts(setPosts){
    //get the posts for the home page, return promise
    //on success promise resolves to true, and setPosts is used to modify state
    //setPosts takes a list of post objects

    return new Promise(async (resolve) => {
        try{
            const posts = parseFromJson(await(await fetch('/MOCK_POSTS.json')).text())
            setPosts(posts)
            resolve(true)
        }catch(e){
            console.log(e)
            resolve(new Error("Failed to retrieve posts."))
        }        
    })
}

export function getPostByID(setPost, postID){
    //gets a specific post by its id
    //on success promise resolves to true, and setPost is used to modify state
    //setPost takes a single post object

    //for demo reasons, just gets the first post
    return new Promise(async (resolve, reject) => {
        try{
            const posts = parseFromJson(await(await fetch('/MOCK_POSTS.json')).text())
            setPost(posts[0])
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

    return new Promise(async (resolve) => {
        try{
            const posts = parseFromJson(await(await fetch('/MOCK_POSTS.json')).text())
            setPosts(posts)
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
    return new Promise(async (resolve) =>{
        resolve("junkPath")
    })

}

export function deletePost(setSession, session, postID){
    //remove a post
    //return promise
    //oon success promise resolves to true
    return new Promise(async (resolve) => {
        resolve(true)
    })
}