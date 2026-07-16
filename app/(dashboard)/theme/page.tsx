import { updateThemeSetting } from "@/src/actions/config";

export default function ThemePage() {
  const updateTheme = updateThemeSetting.bind(null, "current-user");

  return (
    <main>
      <h1>Theme</h1>
      <form action={updateTheme}>
        <input name="theme" defaultValue="system" />
        <button type="submit">Update theme</button>
      </form>
    </main>
  );
}
