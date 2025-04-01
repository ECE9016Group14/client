import { Link, NavLink } from 'react-router';
import moment from 'moment';

export function PostListing(post){
    /*
    Returns react component

    params
        post: single post adhering to /src/models/post.js
    */


    const postUrl = `/p/${post.post.id}`
    const summeryContent = `${post.post.content.substring(0,200)}...`
    const stats = `${post.post.num_likes} likes.    Posted ${moment(post.post.post_time).fromNow()}`

    return <NavLink to={postUrl}>
        <h3>{post.post.title}</h3>
        <h5>By {post.post.poster_name}</h5>
        <p>{summeryContent}</p>
        <p>{stats}</p>
    </NavLink>
}