import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h3>Not Found</h3>
      <Link to="/" className="btn-link">
        Go to Home
      </Link>
    </>
  );
};

export default NotFound;
