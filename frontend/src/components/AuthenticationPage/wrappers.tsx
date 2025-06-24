export function TitleWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col justify-center items-center mb-6">
      {children}
    </div>
  )
}

export function FormWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      {children}
    </div>
  )
}
