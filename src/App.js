import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const storedLoginInformation = localStorage.getItem("loggedIn");

  //   if (storedLoginInformation === "1") setIsLoggedIn(true);
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem("loggedIn", "1");
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem("loggedIn");
  //   setIsLoggedIn(false);
  // };

  const context = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!context.isLoggedIn && <Login />}
        {context.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
