import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const About = () => {
  return (
    <div>
      <h2>About</h2>
      <h4 style={{ marginTop: "10px" }}>Version 1.0.0</h4>
      <div style={{ cursor: "pointer" }}>
        <Link to="/" className="btn-link">
          <FaArrowLeft style={{ margin: "0px 7px", color: "#23527c" }} />
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default About;
