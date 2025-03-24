import { useParams } from "react-router";
import { useState } from 'react';
import { getPostByID, Post } from "../models/post";
import { Link, NavLink } from 'react-router';
import moment from "moment";
import { sessionContext } from "../models/session";
import { useContext } from "react";
import { getCommentsFromPostID } from "../models/comment";

export default function PostPage(){
    let {postID} = useParams()
    const [post, setPost] = useState(undefined)
    const [comments,setComments] = useState(undefined)
    const { session, setSession } = useContext(sessionContext)

    getPostByID(setPost, postID)
    
    if(!post){
        return <h1>Loading ...</h1>
    }else if (post instanceof Error){
        return <h1>{post.message}</h1>
    }else if (!post instanceof Post){
        return <h1>Error: Received data of unexpected type.</h1>
    }

    getCommentsFromPostID(setComments, postID)

    let authorLink = `/u/${post.posterID}`
    let authorDetails = <NavLink to={authorLink}>Written by {post.posterName}</NavLink>

    let likeAndCommentArea = <p>Login to like or comment.</p>
    if (session){
        //TODO
    }

    let dispComments = <p>Loading Comments...</p>
    if(comments == undefined){
        //do nothing
    }else if(comments instanceof Error){
        dispComments = <p>{comments.message}</p>
    }else if(
        !comments instanceof Array ||(
            comments.length != 0 &&
            comments[0] instanceof Comment
        )
    ){
        dispComments = <p>Error: Received data of unexpected type.</p>
    }else if(comments.length == 0){
        dispComments = <p>No comments yet.</p>
    }else {
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
            {likeAndCommentArea}
            {dispComments}
        </div>
}