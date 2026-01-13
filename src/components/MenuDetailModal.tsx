"use client"

import { X, Utensils, Info } from "lucide-react"
import { MenuIdea } from "@/types/menu"
import { Button } from "@/components/ui/button"

type Props = {
    menu: MenuIdea
    onClose: () => void
}

export default function MenuDetailModal({ menu, onClose }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl animate-in zoom-in duration-300">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-black text-zinc-900 leading-tight pr-8">
                    {menu.title || "Detail Menu"}
                </h2>

                {/* Content */}
                <div className="space-y-6">
                    {/* Story / Description */}
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <h4 className="flex items-center gap-2 font-bold text-orange-700 mb-2 text-xs uppercase tracking-wide">
                            <Utensils className="h-4 w-4" />
                            Cerita Dibalik Menu
                        </h4>
                        <p className="text-zinc-700 italic text-sm leading-relaxed">
                            "{menu.description}"
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 text-sm font-bold text-zinc-400 uppercase tracking-widest border-y border-zinc-100 py-4 justify-between">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-zinc-600">🔪 {menu.prep_time || 0}m</span>
                            <span className="text-zinc-200">|</span>
                            <span className="flex items-center gap-2 text-zinc-600">🍳 {menu.cook_time || 0}m</span>
                        </div>
                        <span className="flex items-center gap-2">🔥 {menu.difficulty || "Sedang"}</span>
                    </div>

                    {/* Used Ingredients */}
                    {menu.used_ingredients && menu.used_ingredients.length > 0 && (
                        <div>
                            <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">Bahan Terpakai</h3>
                            <div className="flex flex-wrap gap-2">
                                {menu.used_ingredients.map((ing, i) => (
                                    <span key={i} className="rounded-full bg-zinc-50 px-3 py-1.5 text-[11px] font-bold text-zinc-600 border border-zinc-100">
                                        {ing}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Steps */}
                    <div>
                        <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                            Langkah Memasak
                        </h3>

                        {menu.steps_detail && menu.steps_detail.length > 0 ? (
                            <ol className="space-y-4">
                                {menu.steps_detail.map((step, index) => (
                                    <li key={index} className="flex gap-4 text-sm text-zinc-700 leading-relaxed">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[10px] font-black text-orange-600 border border-orange-200 shadow-sm">
                                            {index + 1}
                                        </span>
                                        <span className="pt-0.5">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className="text-sm text-zinc-400 italic">Chef sedang menulis langkah demi langkah...</p>
                        )}
                    </div>

                    {/* Chef's Secret Notes */}
                    <div className="bg-zinc-900 text-white p-5 rounded-xl shadow-lg shadow-zinc-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Info className="h-24 w-24" />
                        </div>
                        <h4 className="flex items-center gap-2 font-bold text-orange-400 mb-2 text-xs uppercase tracking-wide relative z-10">
                            <Info className="h-4 w-4" />
                            Rahasia Chef
                        </h4>
                        <p className="text-zinc-300 text-sm leading-relaxed font-medium relative z-10">
                            {menu.chef_notes}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <Button
                    onClick={onClose}
                    className="mt-10 h-14 w-full rounded-2xl font-black text-base bg-zinc-900"
                >
                    Siap Memasak!
                </Button>
            </div>
        </div>
    )
}
