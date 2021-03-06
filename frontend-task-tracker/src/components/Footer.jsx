import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      <Link to="/about" className="btn-link">
        About
      </Link>
    </footer>
  );
};

export default Footer;
