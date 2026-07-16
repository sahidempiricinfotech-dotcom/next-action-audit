import { inviteTeamMember } from "./actions";

export default function TeamPage() {
  return (
    <main>
      <h1>Team</h1>
      <form action={inviteTeamMember}>
        <input name="email" type="email" />
        <input name="invitedById" defaultValue="current-user" hidden />
        <button type="submit">Invite member</button>
      </form>
    </main>
  );
}
