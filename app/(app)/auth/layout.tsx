export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className="bg-primary h-screen w-full flex items-center justify-center">{children}</div>;
  }
  