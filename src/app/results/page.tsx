'use client'

import React, { useEffect, useState, Suspense, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import MenuCard from "@/components/MenuCard"
import { MenuCardSkeleton } from "@/components/MenuCardSkeleton"
import MenuDetailModal from "@/components/MenuDetailModal"
import { MenuIdea } from "@/types/menu"
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, AlertCircle, Utensils } from 'lucide-react'

import { experimental_useObject } from '@ai-sdk/react'
import { z } from 'zod'
import { MenuIdeaSchema } from "@/types/menu"
import { PrintLayout } from '@/components/PrintLayout'

function ResultsContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const ingredientsParam = searchParams.get('ingredients')

    const [selectedMenu, setSelectedMenu] = useState<MenuIdea | null>(null)
    const [statusIndex, setStatusIndex] = useState(0)

    // Manual State for Non-Streaming
    const [object, setObject] = useState<{ menus: any[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const loadingMessages = [
        'Sedang konsultasi dengan Chef Gemini...',
        'Meracik bumbu rahasia...',
        'Menghitung takaran pas...',
        'Mempercantik plating...'
    ]

    const submit = async (params: { ingredients: string[] }) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/generate-menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Gagal menghubungi AI");
            }
            const data = await res.json();
            console.log("AI Response Data:", data);
            setObject(data);
        } catch (err: any) {
            console.error("Fetch Error:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const hasCalledApi = useRef(false);

    useEffect(() => {
        if (ingredientsParam && !hasCalledApi.current) {
            console.log("Manually fetching ingredients:", ingredientsParam);
            const ingredients = ingredientsParam.split(',').filter(i => i.trim() !== '')
            submit({ ingredients })
            hasCalledApi.current = true;
        }
    }, [ingredientsParam])

    // Cycle status messages
    useEffect(() => {
        if (!isLoading) return
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % loadingMessages.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [isLoading])

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

    const displayMenus = object?.menus || [];
    console.log("Menus to Render:", displayMenus);

    const [printingMenu, setPrintingMenu] = useState<MenuIdea | null>(null)

    const handlePrint = (menu: MenuIdea) => {
        setPrintingMenu(menu);
        setTimeout(() => {
            window.print();
            // Reset after print dialog closes (approximate, or just keep it rendered but hidden)
            // Actually better to keep it null until print requested, then render, then print.
            // But we need to wait for render.
            // Let's rely on CSS mostly: Always render PrintLayout if printingMenu is set, 
            // and hide everything else via 'print:hidden'.
        }, 300);
    }

    // ...

    return (
        <>
            {/* Screen Content - Hidden when printing */}
            <div className={`container mx-auto px-4 py-8 md:py-16 print:hidden`}>
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    {/* ... existing header content ... */}
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

                        {/* DEBUG UI */}
                        {error && (
                            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-xs overflow-auto max-h-40">
                                <strong>Error:</strong> {JSON.stringify(error.message || error, null, 2)}
                            </div>
                        )}
                        {!isLoading && displayMenus.length === 0 && !error && (
                            <div className="mt-4 p-4 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 text-xs text-center font-bold">
                                ⚠️ Menunggu respon dari AI...
                            </div>
                        )}
                    </div>
                </div>

                {/* Error State */}
                {error && !isLoading && (
                    <div className="mx-auto max-w-md rounded-3xl border border-zinc-100 bg-white p-8 text-center shadow-lg animate-in fade-in zoom-in duration-500">
                        {/* ... existing error UI ... */}
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

                {/* Loading UI State */}
                {isLoading && (
                    <div className="mb-8 flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                        <p className="text-sm font-bold text-zinc-600 uppercase tracking-widest animate-pulse">
                            {loadingMessages[statusIndex]}
                        </p>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2].map((i) => {
                        // Check if menu exists at this index
                        const menuData = displayMenus[i];

                        if (menuData) {
                            return (
                                <MenuCard
                                    key={i}
                                    menu={menuData as MenuIdea}
                                    onOpen={() => setSelectedMenu(menuData as MenuIdea)}
                                    onPrint={() => handlePrint(menuData as MenuIdea)}
                                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                />
                            )
                        }

                        // Only show skeleton if still loading
                        if (isLoading) {
                            return <MenuCardSkeleton key={i} />
                        }

                        // If not loading and no data, show nothing (or empty slot)
                        return null;
                    })}
                </div>

                {/* Detail Modal */}
                {selectedMenu && (
                    <MenuDetailModal
                        menu={selectedMenu}
                        onClose={() => setSelectedMenu(null)}
                    />
                )}
            </div>

            {/* Print Layout - Only visible when printing AND printingMenu is set */}
            <div className="hidden print:block">
                <PrintLayout menu={printingMenu} />
            </div>
        </>
    )
}

export default function ResultsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-50/50">
            <div className="print:hidden">
                <Navbar />
            </div>
            <main className="flex-1">
                <Suspense fallback={
                    <div className="flex h-[60vh] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
                    </div>
                }>
                    <ResultsContent />
                </Suspense>
            </main>
            <div className="print:hidden">
                <Footer />
            </div>
        </div>
    )
}
