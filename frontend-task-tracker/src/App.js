import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import Tasks from "./components/Tasks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Account from "./components/Account";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin();

    return () => {};
  }, [isLoggedIn]);

  const checkLogin = async () => {
    setIsLoggedIn(await auth.isLoggedIn());
  };

  return (
    <Router>
      <div className="container">
        <ToastContainer />

        <ProtectedRoute
          path="/"
          exact
          component={Tasks}
          isLoggedIn={isLoggedIn}
        />

        <Route
          path="/account"
          render={(props) => (
            <>
              <Header /> <Account {...props} isLoggedIn={isLoggedIn} />
            </>
          )}
        />

        <Route
          path="/about"
          render={(props) => (
            <>
              <Header /> <About {...props} />
            </>
          )}
        />
        {/* <Route path="/about" component={About} /> */}

        <Footer />
      </div>
    </Router>
  );
}

export default App;
