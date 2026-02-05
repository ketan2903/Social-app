import { Card, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import API from "../Services/api";

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [showImage, setShowImage] = useState(false); // 🔥 NEW

  const likePost = async () => {
    const res = await API.put(`/posts/${post._id}/like`);
    setLikes(res.data.likes);
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!commentText) return;

    const res = await API.post(`/posts/${post._id}/comment`, {
      text: commentText,
    });

    setComments(res.data.comments);
    setCommentText("");
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="mb-1">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-semibold">{post.username}</span>
            <span className="post-date">
              {new Date(post.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })}
            </span>
          </div>
</Card.Title>

        {post.text && <Card.Text>{post.text}</Card.Text>}

        {post.image && (
          <img
            src={`http://localhost:5000${post.image}`}
            alt="post"
            className="post-image"
            onClick={() => setShowImage(true)}
          />
        )}

        <div className="d-flex gap-3 mt-2">
          <Button className="rounded-pill px-3" style={{backgroundColor: likes.includes(post.username) ? "#ff4d4d" : "#f1f1f1",
                  color: likes.includes(post.username) ? "white" : "#333",border: "none"}}
                  onClick={likePost}><i className="bi bi-heart-fill me-1"></i>{likes.length}
          </Button>

          <Button className="rounded-pill px-3" style={{ backgroundColor: showComments ? "#e0e0e0" : "#f1f1f1",
                  color: "#333",border: "none"}} onClick={() => setShowComments(!showComments)}>
                  <i className="bi bi-chat me-1"></i>{comments.length}
          </Button>
        </div>

        {showComments && (
          <div className="mt-3">
            {comments.map((c, index) => (
              <p key={index}>
                <strong>{c.username}</strong>: {c.text}
              </p>
            ))}

            <Form onSubmit={addComment}>
              <Form.Control
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="mb-2"
              />
              <Button type="submit" size="sm">
                Comment
              </Button>
            </Form>
          </div>
        )}
      </Card.Body>

        <Modal
        show={showImage}
        onHide={() => setShowImage(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton />
        <Modal.Body className="text-center">
          <img
            src={`http://localhost:5000${post.image}`}
            alt="full"
            style={{ width: "90%", height: "auto" }}
          />
        </Modal.Body>
      </Modal>


    </Card>
  );
}

export default PostCard;
