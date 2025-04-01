import { BACKENDURL } from "../App"
import { sqlToJsDate } from "../utils"

export function User(ID, Name, Remark, CreateTime){
    this.id = ID
    this.name = Name
    this.remark = Remark
    this.createTime = CreateTime
}

function parseFromJson(json){
    const data = JSON.parse(json)

    return new User(
        data.ID,
        data.Name,
        data.Remark,
        sqlToJsDate(data.CreateTime)
    )
}

export function getUser(setUser, userID){
    //gets a user by id, returns a promise
    //on success, promise resolves to true and setUser is used to change page state
    const URL = `${BACKENDURL}/user/id/${userID}`

    return new Promise(async (resolve) =>{
        try{
            let response = await fetch(URL)
            let content = await response.json()
            if (!response.ok){
                setUser(new Error(content.detail))
                resolve(new Error(content.detail) )
                return
            }

            setUser(new User(
                content.data.id,
                content.data.name,
                content.data.remark,
                undefined
            ))
            resolve(true)
        }catch(e){
            setUser(Error("Unable to get user."))
            console.log(e)
            resolve(e)
        }
    })
}

export function changeRemark(setSession, session, newRemark){
    //Lets a user change their profile description
    //returns promise
        //On success, promise resolves to true
        //On fail, promise resolves to error with message
        //if session expired, call logout in session.js

    return new Promise(async (resolve)=>{
        alert("TODO: Currently disabled.")
        resolve(true)
    } )
}