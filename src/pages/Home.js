import { PostListing } from "../components/PostListing";
import { getHomePosts } from "../models/post"
import { useState } from 'react';

export default function Home(){
    const [posts, setPosts] = useState(undefined)
    getHomePosts(setPosts)

    let output = <h1>Loading...</h1>

    if(posts != undefined){
        output = []
        for(let post of posts){
            output.push(<PostListing post={post}/>)
        }
    }

    return output
}