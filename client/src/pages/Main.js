import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Main component for creating travel posts.
 */
function Main() {
    // Extract user name from the URL query parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get('name');

    // State variables to manage post form data
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);

    // Event handler for image selection
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setPostImage(selectedImage);
    };

    // Event handler for title input change
    const handleTitleChange = (event) => {
        setPostTitle(event.target.value);
    };

    // Event handler for post content input change
    const handlePostChange = (event) => {
        setPostContent(event.target.value);
    };

    // Event handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("content", postContent);
        formData.append("title", postTitle);
        if (postImage) {
            formData.append("image", postImage);
        }

        try {
            const response = await fetch("http://localhost:8000/api/posts", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                // Clear input fields and file selection after successful submission
                setPostTitle('');
                setPostContent('');
                setPostImage(null);
            } else {
                console.error("Error uploading post.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="main-container">
            <div>
                <div className="greeting">
                    <p className="greeting-text">Hey, <span className="user-name">{userName}!</span></p>
                </div>
            </div>

            <div className='post-form'>
                <h2>
                    Here, you can read other people's <a href="/posts">Posts</a> <br /><br />
                    OR, <br /><br />
                    Create your own travel post:
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="postTitle"
                        placeholder="Location you visited"
                        value={postTitle}
                        onChange={handleTitleChange}
                    />
                    <textarea
                        name="postContent"
                        placeholder="Write your travel experience here..."
                        value={postContent}
                        onChange={handlePostChange}
                    ></textarea>
                    <label className="image-upload-label">
                        Upload an Image: <br /><br />
                        <input
                            type="file"
                            name="postImage"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                    <button type="submit">Submit Post</button>
                </form>
            </div>
        </div>
    );
}

export default Main;


