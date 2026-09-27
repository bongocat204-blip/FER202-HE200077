import React, { useState, useEffect } from "react";

function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <h3>Bài 1: User Posts (User ID: {userId})</h3>
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "4px",
            }}
          >
            <h4 style={{ margin: "0 0 5px 0", textTransform: "capitalize" }}>
              {post.title}
            </h4>
            <p style={{ margin: 0 }}>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserPosts;
