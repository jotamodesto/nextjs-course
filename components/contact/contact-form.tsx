import { FormEvent, useRef } from "react";
import classes from "./contact-form.module.css";

function ContactForm() {
  const emailInputRef = useRef<HTMLInputElement>();
  const nameInputRef = useRef<HTMLInputElement>();
  const messageInputRef = useRef<HTMLTextAreaElement>();

  async function sendMessageHandler(event: FormEvent) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const name = nameInputRef.current.value;
    const message = messageInputRef.current.value;

    const contactMessage = { email, name, message };

    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactMessage),
      headers: { "Content-Type": "application/json" },
    });

    emailInputRef.current.value = "";
    nameInputRef.current.value = "";
    messageInputRef.current.value = "";
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
    </section>
  );
}

export default ContactForm;
