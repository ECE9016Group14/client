import { useParams } from "react-router"
import { getUser, User } from "../models/user"
import { Session } from "../models/session"

import { useState } from 'react';
import { sessionContext } from "../models/session";
import { useContext } from "react";


export default function UserPage(){
    let {userID} = useParams()
    const [user, setUser] = useState (undefined)
    const { session, setSession } = useContext(sessionContext)

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

    return<h1>{user.id}</h1>
}