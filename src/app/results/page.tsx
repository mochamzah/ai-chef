'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { MenuCard } from "@/components/MenuCard"
import { MenuCardSkeleton } from "@/components/MenuCardSkeleton"
import { MenuDetailModal } from "@/components/MenuDetailModal"
import { MenuIdea } from "@/types/menu"
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, AlertCircle, Utensils } from 'lucide-react'

function ResultsContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const ingredientsParam = searchParams.get('ingredients')

    const [menus, setMenus] = useState<MenuIdea[]>([])
    const [selectedMenu, setSelectedMenu] = useState<MenuIdea | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!ingredientsParam) return

        const fetchMenus = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const ingredients = ingredientsParam.split(',').filter(i => i.trim() !== '')

                const response = await fetch('/api/generate-menu', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ingredients }),
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || 'Gagal mengambil rekomendasi menu')
                }

                setMenus(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMenus()
    }, [ingredientsParam])

    // Empty State (No Ingredients)
    if (!ingredientsParam) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="mb-8 relative">
                    <div className="bg-orange-100/50 absolute inset-0 rounded-full blur-2xl animate-pulse" />
                    <div className="relative rounded-full bg-white shadow-xl shadow-orange-100 p-8 border border-orange-50">
                        <Utensils className="h-16 w-16 text-orange-500" />
                    </div>
                </div>
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Kulkas Anda Kosong? 🧐</h2>
                <p className="mt-4 max-w-sm text-lg text-zinc-500 font-medium leading-relaxed">
                    Sepertinya Anda belum memasukkan bahan masakan. Yuk, beri tahu Chef AI apa yang ada di dapur Anda!
                </p>
                <Button
                    onClick={() => router.push('/')}
                    size="lg"
                    className="mt-10 rounded-2xl font-bold px-10 shadow-lg shadow-orange-200"
                >
                    Kembali ke Beranda
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <button
                        onClick={() => router.push('/')}
                        className="group mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-orange-600 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Ganti Bahan
                    </button>
                    <h1 className="text-3xl font-extrabold text-zinc-900 md:text-5xl">
                        Hasil <span className="text-orange-600">Rekomendasi</span>
                    </h1>
                    <p className="mt-2 text-zinc-500 font-medium">
                        Ide masakan kreatif berdasarkan bahan pilihanmu.
                    </p>
                </div>
            </div>

            {/* Error State */}
            {error && !isLoading && (
                <div className="mx-auto max-w-md rounded-3xl border border-zinc-100 bg-white p-8 text-center shadow-lg animate-in fade-in zoom-in duration-500">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
                        <AlertCircle className="h-8 w-8 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900">Masakan Belum Siap</h3>
                    <p className="mt-3 text-zinc-500 leading-relaxed">
                        Sepertinya ada sedikit kendala saat meracik ide menu. Mari kita coba sekali lagi atau sesuaikan bahannya.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button
                            onClick={() => window.location.reload()}
                            className="rounded-xl font-bold"
                        >
                            Coba Lagi
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/')}
                            className="rounded-xl font-bold border-zinc-200"
                        >
                            Ganti Bahan
                        </Button>
                    </div>
                </div>
            )}

            {/* Loading & Success States */}
            {isLoading && (
                <div className="mb-8 flex items-center gap-3 animate-pulse">
                    <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                    <p className="text-sm font-bold text-zinc-600 uppercase tracking-widest">Chef AI sedang meracik ide...</p>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    <>
                        <MenuCardSkeleton />
                        <MenuCardSkeleton />
                        <MenuCardSkeleton />
                    </>
                ) : (
                    !error && menus.map((menu) => (
                        <MenuCard
                            key={menu.id}
                            menu={menu}
                            onView={(menu) => setSelectedMenu(menu)}
                            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        />
                    ))
                )}
            </div>

            {/* Detail Modal */}
            <MenuDetailModal
                menu={selectedMenu}
                onClose={() => setSelectedMenu(null)}
            />
        </div>
    )
}

export default function ResultsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-50/50">
            <Navbar />
            <main className="flex-1">
                <Suspense fallback={
                    <div className="flex h-[60vh] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
                    </div>
                }>
                    <ResultsContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    )
}
