export default function ClerkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div>{children}</div>
    </div>
  );
}
