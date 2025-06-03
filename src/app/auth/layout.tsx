export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex h-screen w-screen flex-col items-center justify-center">
      {children}
    </div>
  );
}
