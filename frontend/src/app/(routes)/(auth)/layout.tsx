export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-beige-yellow">
      {children}
    </div>
  )
}
