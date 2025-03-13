import { useParams } from "react-router";
import { useState } from 'react';
import { getPostByID, Post } from "../models/post";
import { Link, NavLink } from 'react-router';
import moment from "moment";
import { sessionContext } from "../models/session";
import { useContext } from "react";

export default function PostPage(){
    let {postID} = useParams()
    const [post, setPost] = useState(undefined)
    const [poster, setPoster] = useState (undefined)
    const { session, setSession } = useContext(sessionContext)

    getPostByID(setPost, postID)

    //TODO retrieve poster details

    if(!post){
        return <h1>Loading ...</h1>
    }else if (post instanceof Error){
        return <h1>{post.message}</h1>
    }else if (!post instanceof Post){
        return <h1>Error: Received data of unexpected type.</h1>
    }

    let authorDetails = <p>Unable to retrieve author details.</p>
    if (poster != undefined){
        //TODO
    }

    let likeAndComentArea = <p>Login to like or coment.</p>
    if (session){
        //TODO
    }

    const stats = `${post.numLikes} likes.    Posted ${moment(post.postTime).fromNow()}`

    return <div>
            <h1>{post.title}</h1>
            {authorDetails}
            <p>{post.content}</p>
            {stats}
            {likeAndComentArea}
            <p>TODO Setup Comments</p>
        </div>
}