import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import Tasks from "./components/Tasks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Account from "./components/Account";
import NotFound from "./components/NotFound";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  return (
    <div className="container">
      <ToastContainer />

      {location.pathname !== "/" && <Header />}

      <Switch>
        <ProtectedRoute path="/" exact component={Tasks} />
        <Route path="/account" component={Account} />
        <Route path="/about" component={About} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
        {/* <Route
          path="/about"
          render={(props) => (
            <>
              <Account {...props} />
            </>
          )}
        /> */}
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
