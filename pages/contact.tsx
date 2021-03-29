import Head from "next/head";
import ContactForm from "../components/contact/contact-form";

function ContactPage() {
  return (
    <>
      <Head>
        <title>Entre em contato</title>
        <meta
          name="description"
          content="Me envie suas sugestões ou apenas entre em contato"
        />
      </Head>
      <ContactForm />
    </>
  );
}

export default ContactPage;
