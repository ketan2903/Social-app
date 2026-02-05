import { useEffect, useState } from "react";
import API from "../Services/api";
import PostCard from "../Components/PostCard";
import { Container } from "react-bootstrap";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container className="mt-3 mb-5">
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </Container>
  );
}

export default Feed;
