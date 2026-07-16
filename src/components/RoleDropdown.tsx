"use client";

export function RoleDropdown({
  onSelect,
}: {
  onSelect: (role: string) => Promise<unknown>;
}) {
  return (
    <form
      action={async (formData) => {
        await onSelect(String(formData.get("role") ?? "member"));
      }}
    >
      <select name="role" defaultValue="member">
        <option value="member">Member</option>
        <option value="support">Support</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Set role</button>
    </form>
  );
}
