import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <Link to="/Home" style={{ color: "#2e5fae" }}>
        Go back home
      </Link>
    </div>
  );
}
export default NotFound;