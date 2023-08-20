import React, { useState, useEffect } from 'react';
import img1 from '../assets/road.jpg'
import img2 from '../assets/fruits.jpg'
import img3 from '../assets/tree.jpg'
import Navbar from '../Navbar';
import PostBox from '../Postbox';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/getPosts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);
    console.log(posts);

    return (
        <div className="posts-container">
            {posts.map(post => (
                <PostBox key={post._id} post={post} />
            ))}
        </div>
    );
}

export default Posts;
