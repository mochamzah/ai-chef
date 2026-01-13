import Link from 'next/link'
import { Utensils } from 'lucide-react'

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-orange-600">
                    <Utensils className="h-6 w-6" />
                    <span>AI Chef</span>
                </Link>
                <div className="hidden space-x-6 md:flex">
                    <Link href="#features" className="text-sm font-medium text-zinc-600 hover:text-orange-600">Features</Link>
                    <Link href="#about" className="text-sm font-medium text-zinc-600 hover:text-orange-600">About</Link>
                </div>
                <button className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-700">
                    Get Started
                </button>
            </div>
        </nav>
    )
}
