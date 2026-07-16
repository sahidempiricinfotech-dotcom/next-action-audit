import { deleteUser } from "./actions";
import {
  impersonateUser,
  purgeUserData,
} from "@/src/actions/admin";
import { updateUserRole } from "@/src/actions/auth";
import { AdminRoleSelect } from "@/src/components/AdminRoleSelect";

export default function AdminUsersPage() {
  const userId = "selected-user";
  const remove = deleteUser.bind(null, userId);
  const purge = purgeUserData.bind(null, userId);
  const impersonate = impersonateUser.bind(null, userId);
  const setRole = updateUserRole.bind(null, userId);

  return (
    <main>
      <h1>Users</h1>
      <form action={remove}><button type="submit">Delete user</button></form>
      <form action={purge}><button type="submit">Purge user data</button></form>
      <form action={impersonate}><button type="submit">Impersonate</button></form>
      <form action={setRole}>
        <input name="role" defaultValue="support" />
        <button type="submit">Update role</button>
      </form>
      <AdminRoleSelect userId={userId} />
    </main>
  );
}
