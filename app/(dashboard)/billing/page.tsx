import {
  getBillingProfile,
  updateBillingProfile,
} from "@/src/actions/billing";

export default async function BillingPage() {
  const profile = await getBillingProfile();
  const save = updateBillingProfile.bind(null, {
    userId: "current-user",
    displayName: "Current user",
  });

  return (
    <main>
      <h1>Billing</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <form action={save}>
        <button type="submit">Save billing profile</button>
      </form>
    </main>
  );
}
