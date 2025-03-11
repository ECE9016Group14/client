export const Post = new class{
    constructor(ID, PosterName, NumLikes, PostTime, Title, Content){
        this.id = ID
        this.posterName = PosterName
        this.numLikes = NumLikes
        this.postTime = PostTime
        this.title = Title
        this.content = Content
    }
}

export function getHomePosts(setPosts){
    //get the posts for the home page, return promise
    //on success promise resolves to true, and setPosts is used to modify state
    //setPosts takes a list of post objects

    return new Promise((resolve, reject) => {
        //TODO 
    })
}

export function getPostByID(setPost, postID){
    //gets a specific post by its id
    //on success promise resolves to true, and setPost is used to modify state
    //setPost takes a single post object
}

export function getPostsByPosterName(setPosts, posterName){
    //gets all posts from a specific account name
    //on success promise resolves to true, and setPosts is used to modify state
    //setPosts takes a list of post objects
}

export function postPost(session, title, content){
    //submit a new post
    //title and content are strings, session is Session object
    //server should init remaining fields
    //return promise
    //on success promise resolves to new posts id (for redirect to post)
}

export function deletePost(session, postID){
    //remove a post
    //return promise
    //oon success promise resolves to true
}