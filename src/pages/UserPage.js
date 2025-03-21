import { useParams } from "react-router"
import { changeRemark, getUser, User } from "../models/user"
import { Session } from "../models/session"

import { useState } from 'react';
import { sessionContext } from "../models/session";
import { useContext } from "react";
import { getPostsByPosterID, Post } from "../models/post";
import PostPage from "./PostPage";
import { PostListing } from "../components/PostListing";
import { Button, Form } from "react-bootstrap";



export default function UserPage(){
    let {userID} = useParams()
    const [user, setUser] = useState (undefined)
    const [posts, setPosts] = useState (undefined)
    const { session, setSession } = useContext(sessionContext)

    const handleRemarkChange = async (event) => {
        //called when the logged in user hits save
        event.preventDefault();
        event.stopPropagation();
        let new_remark = event.target.remark.value

        let result = await changeRemark(setSession, session, new_remark)
        if (result instanceof Error){
            alert(result.message)
        }else{
            let newUser = user
            newUser.remark = new_remark
            setUser(newUser)
            alert("Remark Updated!")
        }
    }

    getUser(setUser, userID)

    // handles all cases where user is invalid
    if(user == undefined){
        return <h1>Loading...</h1>
    }else if (user instanceof Error){
        return <h1>Error: {user.message}</h1>
    }else if (!user instanceof User){
        return <h1>Error: Received data of unknown type.</h1>
    }

    // checks if were looking at the logged in user's page (so they get the options to change stuff)
    let isLoggedInUser = false
    if(session instanceof Session){
        isLoggedInUser = user.id === session.userID
    }

    let remarksSection = <p>{user.remark}</p>

    if(isLoggedInUser){
        //let the user change their remark
        remarksSection = <Form onSubmit={handleRemarkChange}>
            <Form.Control as="textarea" rows={3} name="remark">
                {user.remark}
            </Form.Control>
            <Button type="submit" className="mt-5">Update Remark</Button>
        </Form>
    }

    getPostsByPosterID(setPosts,user.id)

    let postSection = <h1>Loading...</h1>
    if(posts && (!posts instanceof Array || !posts[0] instanceof Post)){
        postSection = <h1>Error: Received data of unknown type.</h1>
    }else if (posts instanceof Array && posts.length === 0){
        postSection = <p>This user hasn't posted anything yet.</p>
    }else if (posts instanceof Array && posts[0] instanceof Post){
        postSection = []
        for (let post of posts){
            postSection.push(<PostListing post={post}/>)
            if(isLoggedInUser){
                //Add button that lets user delete post
                postSection.push(<p>Todo</p>)
            }
        }
    }

    return<div>
        <h1>{user.name}</h1>
        {remarksSection}
        {postSection}
    </div>
}