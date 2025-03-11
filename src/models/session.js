import { createContext } from "react";
import Cookies from "js-cookie";
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
const DISTPLAY_NAME_COOKIE_NAME = "displayName"

export const Session = class{
    constructor(token, displayName){
        this.token = token;
        this.displayName = displayName;

        Cookies.set(TOKEN_COOKIE_NAME, token, { 
            expires: 7, 
            secure: true,
            sameSite: 'strict'
        })

        Cookies.set(DISTPLAY_NAME_COOKIE_NAME, displayName, { 
            expires: 7, 
            secure: true,
            sameSite: 'strict'
        })
    }
}

export function login(setSession, email, password){
    //use setSession to set new state, and return promise of true or error string
    console.log(`Email:${email}, Pass:${password}`)
    if(password === "dev"){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setSession(new Session("undefined", "devman"))
                resolve(true);
            }, 1000);
        });
    }else{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new Error("Invalid Email / Password."));
            }, 1000);
        });
    }
}

export function logout(setSession, session){
    // use setSession to set new state, no return necessary
    setSession(undefined)
    Cookies.remove(TOKEN_COOKIE_NAME)
    Cookies.remove(DISTPLAY_NAME_COOKIE_NAME)
}

export function checkAuth(setSession, session){
    //return promise of either true or false
    //use setSession to force logout if auth is bad
    //is the current login valid
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 100);
    });
}

export function register(displayName, email, password){
    //return promise of true or error string, don't auto login if true, user will be redirected to login page
    if(password === "dev"){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }else{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new Error("Invalid Email / Password."));
            }, 1000);
        });
    }
}

export function checkCookies(setSession){
    //if the cookies exist, load them
    const token = Cookies.get(TOKEN_COOKIE_NAME)
    const displayName = Cookies.get(DISTPLAY_NAME_COOKIE_NAME)

    if (token instanceof String && displayName instanceof String){
        setSession( new Session(token, displayName))
    }
}