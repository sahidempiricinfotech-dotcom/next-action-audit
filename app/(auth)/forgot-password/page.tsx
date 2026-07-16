import { resetPasswordForUser } from "@/src/actions/auth";

export default function ForgotPasswordPage() {
  const reset = resetPasswordForUser.bind(null, "requested-user");

  return (
    <main>
      <h1>Reset password</h1>
      <form action={reset}>
        <input name="credentialHash" type="password" />
        <button type="submit">Reset password</button>
      </form>
    </main>
  );
}
