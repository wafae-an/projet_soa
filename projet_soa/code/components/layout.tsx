interface LayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {children}
    </div>
  )
}
