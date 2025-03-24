import { Navigate, useNavigate } from "react-router";
import { sessionContext } from "../models/session";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { postPost } from "../models/post";

export default function NewPost(){
    const { session, setSession } = useContext(sessionContext);
    let navigate = useNavigate()

    const handlePost = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        let titleText = event.target.title.value
        let bodyText = event.target.body.value

        if (!titleText){
            alert("Title Required.")
            return
        } else if  (!bodyText){
            alert("Body required.")
            return
        }

        let result = await postPost(setSession, session, titleText, bodyText)
        console.log(result)
        if(result instanceof Error){
            alert(result.message)
        }else{
            let newPostUrl = `/p/${result}`
            navigate(newPostUrl)
        }
    }

    if(!session){
        //Redirect if not logged in
        return <Navigate replace to="/"/>
    }

    return <Form onSubmit={handlePost}>
        <Form.Control placeholder="Title" name="title"/>
        <Form.Control as="textarea" placeholder="Body" name="body" rows={3}/>
        <Button type="submit" className="mt-5" >Post</Button>
    </Form>
}