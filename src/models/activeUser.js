import { createContext } from "react";

//Model for the currently logged in user, mainly their authkey and username.

export const ActiveUserContext = createContext(null);
/*
Can only be used or modified within a react component due to how react stat works
Usage:

    const { activeUser, setActiveUser } = useContext(ActiveUserContext);

    Where 'activeUser' is the current state, and 'setActiveUser(newState)' is an updated state to write to activeUser.
    calling setActiveUser(newState) will trigger redraw of relevant components
*/

export const ActiveUser = class{
    constructor(auth, displayName){
        this.auth = auth;
        this.displayName = displayName;
    }
}

export function login(email, password){
    //return promise of either an ActiveUser object or string with error info
}

export function logout(activeUser){
    //return not necessary, assumes every logout successful
}

export function checkAuth(activeUser){
    //return promise of either true or false
    //is the current login valid
}

export function register(email, password){
    //return promise of true or error string, don't auto login if true, user will be prompted to login if true
}