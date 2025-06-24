export function TitleCardWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-beige-yellow py-12">
      <div className="container mx-auto px-4">{children}</div>
    </div>
  )
}
