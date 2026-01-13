'use client'

import React from 'react'
import { Clock, ChefHat, CheckCircle2 } from 'lucide-react'
import { MenuIdea } from '@/types/menu'
import { cn } from '@/lib/utils'

interface MenuCardProps {
    menu: MenuIdea
    className?: string
    onView: (menu: MenuIdea) => void
}

export function MenuCard({ menu, className, onView }: MenuCardProps) {
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    const difficultyStyles = {
        mudah: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        sedang: 'bg-orange-50 text-orange-700 border-orange-100',
    }

    return (
        <div className={cn(
            "group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-500 hover:border-orange-200 hover:shadow-xl",
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]",
            className
        )}>
            {/* Header: Title & Difficulty */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-zinc-900 leading-tight group-hover:text-orange-600 transition-colors">
                    {menu.title}
                </h3>
                <span className={cn(
                    "shrink-0 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                    difficultyStyles[menu.difficulty]
                )}>
                    {menu.difficulty}
                </span>
            </div>

            {/* Meta: Duration */}
            <div className="flex items-center gap-2 mb-6 text-sm text-zinc-500 font-medium">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>{menu.duration}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-300 mx-1" />
                <ChefHat className="w-4 h-4 text-zinc-400" />
                <span className="capitalize">{menu.difficulty}</span>
            </div>

            {/* Steps List (Short) */}
            <div className="flex-1 space-y-4">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Cara Cepat</p>
                <div className="space-y-3">
                    {menu.steps_short.map((step, index) => (
                        <div key={index} className="flex gap-3 items-start">
                            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                            </div>
                            <p className="text-sm text-zinc-600 leading-snug font-medium line-clamp-2">
                                {step}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips (Optional) */}
            {menu.tips && (
                <div className="mt-6 p-3 rounded-xl bg-orange-50/50 border border-orange-100 text-[11px] text-orange-700 italic flex gap-2">
                    <span className="font-bold">Tips:</span>
                    <span>{menu.tips}</span>
                </div>
            )}

            {/* Action Button */}
            <button
                onClick={() => onView(menu)}
                className="mt-8 w-full py-3 px-4 bg-zinc-900 text-white text-sm font-bold rounded-2xl hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95"
            >
                Lihat Selengkapnya
            </button>
        </div>
    )
}
