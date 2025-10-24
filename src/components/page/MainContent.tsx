import React from "react"

interface MainContentProps {
  renderContent: () => React.ReactNode
}

export default function MainContent({ renderContent }: MainContentProps) {
  return (
    <main className="flex-1 overflow-auto p-8 animate-fade-in">
      {renderContent()}
    </main>
  )
}
