import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import API from "../Services/api";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const submitPost = async (e) => {
    e.preventDefault();

    if (!text && !image) {
      alert("Post cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    if (image) {
      formData.append("image", image);
    }

    try {
      await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/feed");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <Container  fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh",  padding: "40px",  background: "#f5f7fb"  }}>
      <Card className="p-3 shadow-sm rounded-4" style={{ width: "100%", maxWidth: "700px" ,minHeight: "200px" }}>
        <h3 className="text-center fw-bold mb-1">Create Post</h3>

        <Form onSubmit={submitPost}>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="What's on your mind?"
            className="mb-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {image && (
            <div className="mb-3 text-center">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="img-fluid rounded"
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <Form.Label className="mb-0">
              <i className="bi bi-image fs-5 me-2"></i>
              <Form.Control
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              Add Photo
            </Form.Label>

            <Button
              type="submit"
              className="rounded-pill px-4"
            >
              Post
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default CreatePost;
