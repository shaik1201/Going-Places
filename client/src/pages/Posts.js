import React, { useState, useEffect } from 'react';
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
