import { useParams } from "react-router";
import { useState } from 'react';
import { getPostByID, Post } from "../models/post";
import { Link, NavLink } from 'react-router';
import moment from "moment";
import { sessionContext } from "../models/session";
import { useContext } from "react";
import { Comment, getCommentsFromPostID, postComment } from "../models/comment";
import { didILikeThis, like, unLike } from "../models/like";
import { Button, Form } from "react-bootstrap";

export default function PostPage(){
    let {postID} = useParams()
    const [post, setPost] = useState(undefined)
    const [liked, setLiked] = useState(undefined)
    const [comments,setComments] = useState(undefined)
    const { session, setSession } = useContext(sessionContext)

    if(post == undefined){
        getPostByID(setPost, postID)
    }
    
    if(!post){
        return <h1>Loading ...</h1>
    }else if (post instanceof Error){
        return <h1>{post.message}</h1>
    }else if (!post instanceof Post){
        return <h1>Error: Received data of unexpected type.</h1>
    }
    if(comments == undefined){
        getCommentsFromPostID(setComments, postID)
    }
    
    if(liked == undefined){
        let likedResult = didILikeThis(setSession, session, postID)
        likedResult.then((x)=>{
            if(x){
                setLiked(true)
            }else{
                setLiked(false)
            }
        })
    }

    let authorLink = `/u/${post.posterID}`
    let authorDetails = <NavLink to={authorLink}>Written by {post.posterName}</NavLink>

    const handleLike = async ()=> {
        let result = await like(setSession, session, postID)
        setLiked(result)
        if (result == true){
            let updated_post = post
            updated_post.numLikes += 1
            setPost(updated_post)
        }
    }
    const handleUnlike = async ()=> {
        let result = await unLike(setSession, session, postID)
        setLiked(!result)
        if (result == true){
            let updated_post = post
            updated_post.numLikes -= 1
            setPost(updated_post)
        }
    }
    const handleComment = async (event) =>{
        event.preventDefault();
        event.stopPropagation();
        let commentText = event.target.comment.value
        event.target.comment.disabled = true
        console.log("test")

        let result = await postComment(setSession,session, postID, commentText)

        if(result instanceof Error){
            alert(result.message)
        }else{
            let updated_comments = Array.from(comments) //forces clone
            updated_comments.unshift(
                new Comment(undefined, undefined, session.displayName,Date.now(), undefined, commentText)
            )
            setComments(updated_comments)
        }
        event.target.comment.value = ""
        event.target.comment.disabled = false

    }

    let likeElement = undefined
    

    let likeAndCommentArea = <p>Login to like or comment.</p>
    if (session){
        //like stuff
        if (liked == true){
            likeElement = <Button onClick={handleUnlike}>Unlike</Button>
        }else if (liked == false){
            likeElement = <Button onClick={handleLike}>Like</Button>
        }

        //comment stuff
        likeAndCommentArea = <Form onSubmit={handleComment}>
            <Form.Control as="textarea" placeholder = "Comment" rows={3} name="comment"/>
            <Button type="submit" className="mt-5">Post Comment</Button>
        </Form>
    }

    let dispComments = <p>Loading Comments...</p>
    if(comments == undefined){
        //do nothing
    }else if(comments instanceof Error){
        dispComments = <p>{comments.message}</p>
    }else if(
        !(comments instanceof Array) ||(
            comments.length != 0 &&
            !(comments[0] instanceof Comment)
        )
    ){
        console.log(comments)
        dispComments = <p>Error: Received data of unexpected type.</p>
    }else if(comments.length == 0){
        dispComments = <p>No comments yet.</p>
    }else {
        console.log(comments)
        dispComments = []
        for (let x of comments){
            dispComments.push(
                <div>
                    <p>Posted by {x.posterName}, {moment(x.postTime).fromNow()}</p>
                    <p>{x.content}</p>
                </div>
            )
        }
    }

    

    const stats = `${post.numLikes} likes.    Posted ${moment(post.postTime).fromNow()}`

    return <div>
            <h1>{post.title}</h1>
            {authorDetails}
            <p>{post.content}</p>
            {stats}
            {likeElement}
            {likeAndCommentArea}
            {dispComments}
        </div>
}