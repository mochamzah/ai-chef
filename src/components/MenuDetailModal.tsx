'use client'

import React, { useEffect } from 'react'
import { X, Clock, ChefHat, CheckCircle2 } from 'lucide-react'
import { MenuIdea } from '@/types/menu'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface MenuDetailModalProps {
    menu: MenuIdea | null
    onClose: () => void
}

export function MenuDetailModal({ menu, onClose }: MenuDetailModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (menu) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [menu])

    if (!menu) return null

    const difficultyStyles = {
        mudah: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        sedang: 'bg-orange-50 text-orange-700 border-orange-100',
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className={cn(
                "relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden",
                "rounded-t-[2.5rem] sm:rounded-3xl", // Bottom sheet mobile, rounded desktop
                "animate-in slide-in-from-bottom sm:zoom-in duration-300",
                "max-h-[90vh] flex flex-col"
            )}>
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-zinc-900 line-clamp-1">{menu.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className={cn(
                            "px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                            difficultyStyles[menu.difficulty]
                        )}>
                            {menu.difficulty}
                        </span>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span>{menu.duration}</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <ChefHat className="h-4 w-4 text-orange-500" />
                                Langkah Detail (Pemula)
                            </h3>
                            <div className="space-y-6">
                                {menu.steps_full.map((step, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-600 text-sm font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                            {index + 1}
                                        </div>
                                        <p className="text-zinc-600 font-medium leading-relaxed pt-1">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {menu.tips && (
                        <div className="mt-12 p-6 rounded-[2rem] bg-orange-50 border border-orange-100/50 shadow-inner relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="h-20 w-20 text-orange-900" />
                            </div>
                            <div className="relative">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-orange-800 uppercase tracking-widest mb-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Rahasia Chef
                                </h4>
                                <p className="text-orange-900 font-bold italic leading-relaxed">
                                    "{menu.tips}"
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-zinc-100 bg-zinc-50/50">
                    <Button
                        onClick={onClose}
                        className="w-full rounded-2xl h-12 font-bold text-lg"
                    >
                        Tutup
                    </Button>
                </div>
            </div>
        </div>
    )
}
