import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd, onLogout }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <>
          <Button
            color={showAdd ? "blue" : "darkgreen"}
            text={showAdd ? "Close" : "Add"}
            onClick={onAdd}
          />

          <Button color="firebrick" text="Logout" onClick={onLogout} />
        </>
      )}
    </header>
  );
};

Header.defaultProps = { title: "Task Tracker" };

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
