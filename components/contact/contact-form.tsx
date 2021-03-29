import { FormEvent, useEffect, useRef, useState } from "react";

import Notification, { NotificationProps } from "../ui/notification";
import classes from "./contact-form.module.css";

function ContactForm() {
  const emailInputRef = useRef<HTMLInputElement>();
  const nameInputRef = useRef<HTMLInputElement>();
  const messageInputRef = useRef<HTMLTextAreaElement>();

  const [requestStatus, setRequestStatus] = useState<
    "success" | "pending" | "error"
  >();
  const [requestError, setRequestError] = useState<string>();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendContactDara(contactDetails: any) {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactDetails),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message ?? "Deu algo errado! 😕");
    }
  }

  async function sendMessageHandler(event: FormEvent) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const name = nameInputRef.current.value;
    const message = messageInputRef.current.value;

    const contactMessage = { email, name, message };

    setRequestStatus("pending");

    try {
      await sendContactDara(contactMessage);
      setRequestStatus("success");

      emailInputRef.current.value = "";
      nameInputRef.current.value = "";
      messageInputRef.current.value = "";
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification: NotificationProps;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Aguarde...",
      message: "Estou enviando sua mensagem 📨",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Recebi sua mensagem! 😀",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>Como posso ajudar?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Seu e-mail</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Seu nome</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Sua mensagem</label>
          <textarea id="message" rows={5} required ref={messageInputRef} />
        </div>

        <div className={classes.actions}>
          <button>Enviar</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
