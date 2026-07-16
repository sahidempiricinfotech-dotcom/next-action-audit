import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { authRepo } from "@/src/lib/repositories";
import { RoleDropdown } from "@/src/components/RoleDropdown";

export function AdminRoleSelect({ userId }: { userId: string }) {
  async function setRoleInline(role: string) {
    "use server";

    const session = await getServerSession(authOptions);
    if (!session) return null;

    return authRepo.setRole(userId, role);
  }

  return <RoleDropdown onSelect={setRoleInline} />;
}
