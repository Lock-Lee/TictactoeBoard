import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe Game',
  description: 'Play Tic-Tac-Toe against an AI bot. Sign in with Google to track your score!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
