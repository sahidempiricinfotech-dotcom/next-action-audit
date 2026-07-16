import {
  updateEmailPreferences,
  updateProfile,
} from "./actions";
import { tokenRepo } from "@/src/lib/repositories";

export default function SettingsPage() {
  async function deleteSessionToken(formData: FormData) {
    "use server";

    return tokenRepo.delete(String(formData.get("sessionToken") ?? ""));
  }

  return (
    <main>
      <h1>Settings</h1>
      <form action={updateProfile}>
        <input name="name" aria-label="Display name" />
        <button type="submit">Update profile</button>
      </form>
      <form action={updateEmailPreferences}>
        <input name="userId" defaultValue="current-user" hidden />
        <label><input name="newsletter" type="checkbox" /> Newsletter</label>
        <label><input name="productUpdates" type="checkbox" /> Product updates</label>
        <button type="submit">Save email preferences</button>
      </form>
      <form action={deleteSessionToken}>
        <input name="sessionToken" aria-label="Session token" />
        <button type="submit">Delete session</button>
      </form>
    </main>
  );
}
