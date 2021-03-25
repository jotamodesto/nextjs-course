import { FormEvent, useContext, useRef } from "react";
import NotificationContext from "../../store/NotificationContext";
import classes from "./NewsletterRegistration.module.css";

function NewsletterRegistration() {
  const { showNotification } = useContext(NotificationContext);
  const emailInputRef = useRef<HTMLInputElement>();

  async function registrationHandler(event: FormEvent) {
    event.preventDefault();

    const email = emailInputRef.current.value;

    if (email) {
      showNotification({
        title: "Signin up...",
        message: "Registering for newsletter",
        status: "pending",
      });

      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong!");
        }

        showNotification({
          title: "Success",
          message: "Successfuly registered for newsletter",
          status: "success",
        });
      } catch (error) {
        showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      }

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
