import { createContext } from "react";
import Cookies from "js-cookie";
import { BACKENDURL } from "../App";
import {v4 as uuidv4, v4} from 'uuid';
//Model for the currently logged in user, mainly their authkey and username.

export const sessionContext = createContext(undefined);
/*
Can only be used or modified within a react component due to how react stat works
Usage:

    const { session, setSession } = useContext(sessionContext);

    Where 'session' is the current state, and 'setSession(newState)' is an updated state to write to session.
    calling setSession(newState) will trigger redraw of relevant components
*/

const TOKEN_COOKIE_NAME = "sessionToken"

export const Session = class{
    constructor(token, displayName, userID){
        this.token = token;
        this.displayName = displayName;
        this.userID = userID
    }
}

function SessionFromObj(obj){
    return new Session(obj.token, obj.displayName, obj.userID)
}

export function login(setSession, email, password){
    //use setSession to set new state, and return promise of true or error string
    const URL = `${BACKENDURL}/user/token`
    const MEURL = `${BACKENDURL}/user/me`

    return new Promise(async (resolve)=> {
        let body = `username=${email}&password=${password}`

        let response = await fetch(URL, {
            method: "POST",
            body: body,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        let content = await response.json()

        if(!response.ok){
            resolve(new Error(content.detail))
            return
        }

        let token = `${content.token_type} ${content.access_token}`

        response = await fetch(MEURL,{
            method: "GET",
            headers:{
                "Authorization": token
            }
        })

        content = await response.json()
        if(!response.ok){
            resolve(new Error(content.detail))
            return
        }

        let session = new Session(
            token,
            content.data.name,
            content.data.id
        )
        Cookies.set(TOKEN_COOKIE_NAME, JSON.stringify(session), {
                            expires: 1, 
                            sameSite: 'strict'
                        })

        setSession(session)
        resolve(true)

        console.log(content)
    })
}

export function logout(setSession, session){
    // use setSession to set new state, no return necessary
    Cookies.remove(TOKEN_COOKIE_NAME)
    setSession(undefined)

}

export function register(displayName, email, password){
    //return promise of true or error string, don't auto login if true, user will be redirected to login page

    const URL = `${BACKENDURL}/user/register`

    return new Promise(async (resolve)=> {
        let output = {
            id: uuidv4(),
            name: displayName,
            email: email,
            remark: "",
            password: password
        }
        
        let result = await fetch(URL,{
            method: "POST",
            body: JSON.stringify(output),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if(result.ok){
            resolve(true)
        }else{
            resolve(new Error(await result.json()))
        }

    })
}

export function checkCookies(setSession){
    //if the cookies exist, load them
    let token = Cookies.get(TOKEN_COOKIE_NAME)
    if(!token instanceof String){
        Cookies.remove(TOKEN_COOKIE_NAME)
        console.log("Expected String")
        return
    }

    if (token == undefined || token.length == 0){
        console.log("no token")
        return
    }

    token = SessionFromObj( JSON.parse(token) )

    if(!token instanceof Session){
        Cookies.remove(TOKEN_COOKIE_NAME)
        console.log("Expected Session")
        return
    }



    setSession(token)
    return
}