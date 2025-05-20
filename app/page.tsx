import { HalftoneCards } from "@/components/halftone-cards"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 to-green-100">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Interactive Halftone Pattern Cards</h1>
      <HalftoneCards />
    </main>
  )
}
