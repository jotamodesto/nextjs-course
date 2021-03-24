import { FormEvent, useRef } from "react";
import classes from "./NewsletterRegistration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>();

  async function registrationHandler(event: FormEvent) {
    event.preventDefault();

    const email = emailInputRef.current.value;

    if (email) {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      emailInputRef.current.value = "";
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
