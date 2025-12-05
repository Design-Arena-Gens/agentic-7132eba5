export const metadata = {
  title: '3D Fashion Showcase - Field Parka Collection',
  description: 'Interactive 3D fashion show featuring high-quality field parka jacket and pants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  )
}
