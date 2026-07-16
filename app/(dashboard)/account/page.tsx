import { getSessionUser } from "@/src/actions/auth";

export default async function AccountPage() {
  const user = await getSessionUser();

  return (
    <main>
      <h1>Account</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
