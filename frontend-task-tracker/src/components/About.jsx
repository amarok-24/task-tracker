import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const About = () => {
  return (
    <div>
      <h2>About</h2>
      <h4 style={{ marginTop: "10px" }}>Version 1.0.0</h4>
      <div style={{ cursor: "pointer" }}>
        <FaArrowLeft style={{ margin: "0px 7px", color: "#23527c" }} />
        <Link to="/" class="btn-link">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default About;
