import { useState } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/feed");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="login-card p-4" style={{ width: "100%", maxWidth: "600px" ,minHeight: "200px" }}>
        <h3 className="text-center fw-bold mb-1">Welcome Back </h3>
        <p className="text-center text-muted mb-4">
          Login to continue
        </p>

        <Form onSubmit={login}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        <p className="text-center mt-4 mb-0">
          Don’t have an account?{" "}
          <Link to="/signup" className="fw-semibold">
            Sign up
          </Link>
        </p>
      </Card>
    </Container>
  );
}

export default Login;
