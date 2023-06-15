import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

// There are two ways to use the context in a component
// 1. use AuthContext.Consumer which uses a function in which the context is passed as an argument to the function and the function returns the jsx code to be rendered.
// 2. using useContext hook from React library.

// 2nd Way of using the context (better way)
const Navigation = (props) => {
  const context = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <button onClick={context.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

// 1st way of using context.
// const Navigation = (props) => {
//   return (
//     <AuthContext.Consumer>
//       {(context) => {
//         return (
//           <nav className={classes.nav}>
//             <ul>
//               {context.isLoggedIn && (
//                 <li>
//                   <a href="/">Users</a>
//                 </li>
//               )}
//               {context.isLoggedIn && (
//                 <li>
//                   <a href="/">Admin</a>
//                 </li>
//               )}
//               {context.isLoggedIn && (
//                 <li>
//                   <button onClick={props.onLogout}>Logout</button>
//                 </li>
//               )}
//             </ul>
//           </nav>
//         );
//       }}
//     </AuthContext.Consumer>
//   );
// };

export default Navigation;
