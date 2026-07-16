import { submitContactForm } from "./actions";

export default function ContactPage() {
  return (
    <main>
      <h1>Contact us</h1>
      <form action={submitContactForm}>
        <input name="email" type="email" aria-label="Email" />
        <textarea name="message" aria-label="Message" />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
