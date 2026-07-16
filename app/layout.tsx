export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header>Acme Console</header>
        {children}
      </body>
    </html>
  );
}
