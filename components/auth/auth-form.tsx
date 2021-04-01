import { FormEvent, useRef, useState } from "react";
import { signIn } from "next-auth/client";
import classes from "./auth-form.module.css";

async function createUser(email: string, password: string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin(prevState => !prevState);
  }

  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result.error) {
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
      }

      console.log(result);
    } else {
      try {
        const result = await createUser(email, password);
        console.log(result);

        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
