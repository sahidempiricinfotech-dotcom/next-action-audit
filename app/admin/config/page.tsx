import { getPublicConfig } from "@/src/actions/config";

export default async function AdminConfigPage() {
  const config = await getPublicConfig();

  return (
    <main>
      <h1>Public configuration</h1>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </main>
  );
}
