import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "BLUR_INPUT") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: action.val.includes("@") };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "BLUR_INPUT") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: action.val.trim().length > 6 };
};

const Login = (props) => {
  const context = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //// USE REDUCER
  // to manage complex state instead of directly using useState
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //// GUIDE TO USE EFFECT:
  // If we dont pass anything in the dependencies, then it will run on any change inside the component.
  // If we pass an empty array, then it will run only when the component is first loaded.
  // If we pass arguments in the dependencies array, then it will run everytime any of those arguments change.

  // The cleanup function (the one which is returned) is called everytime before calling the useEffect, except the first time.
  // useEffect(() => {
  //   console.log("EFFECT RUNNING");

  //   return () => {
  //     console.log("EFFECT CLEANUP");
  //   };
  // }, []);

  // const { isValid: emailIsValid } = emailState.isValid;
  // const { isValid: passwordIsValid } = passwordState.isValid;

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      console.log("Validating form input.");

      // setFormIsValid(
      //   enteredEmail.includes("@") && enteredPassword.trim().length > 6
      // );
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log("CleanUp Function");
      clearTimeout(timerIdentifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "BLUR_INPUT" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "BLUR_INPUT" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      context.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          type="email"
          label="Email"
          value={emailState.value}
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          type="password"
          label="Password"
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
