'use client'

import React, { useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, X, Loader2, UtensilsCrossed, Egg, Fish, Leaf, Beef } from 'lucide-react'
import { cn } from '@/lib/utils'

export function IngredientInput() {
    const router = useRouter()
    const [inputValue, setInputValue] = useState('')
    const [ingredients, setIngredients] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const addIngredient = (value: string) => {
        const trimmed = value.trim().replace(/,$/, '')
        if (trimmed && !ingredients.includes(trimmed)) {
            setIngredients((prev) => [...prev, trimmed])
        }
        setInputValue('')
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            addIngredient(inputValue)
        } else if (e.key === 'Backspace' && !inputValue && ingredients.length > 0) {
            removeIngredient(ingredients.length - 1)
        }
    }

    const removeIngredient = (index: number) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputValue.trim()) {
            addIngredient(inputValue)
        }
        if (ingredients.length < 2 && !inputValue.trim()) return

        const finalIngredients = inputValue.trim()
            ? [...ingredients, inputValue.trim().replace(/,$/, '')]
            : ingredients

        if (finalIngredients.length >= 2) {
            performRedirect(finalIngredients)
        }
    }

    const performRedirect = (ingredientsList: string[]) => {
        setIsLoading(true)
        const query = ingredientsList.map(encodeURIComponent).join(',')
        router.push(`/results?ingredients=${query}`)
    }

    const popularPairings = [
        { name: 'Ayam', icon: <Beef className="h-3 w-3" /> },
        { name: 'Telur', icon: <Egg className="h-3 w-3" /> },
        { name: 'Ikan', icon: <Fish className="h-3 w-3" /> },
        { name: 'Sayur', icon: <Leaf className="h-3 w-3" /> },
    ]

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="flex flex-col gap-6">
                {/* Input Area */}
                <div className={cn(
                    "relative flex flex-wrap items-center gap-2 p-3 min-h-[4rem] bg-white rounded-2xl border transition-all duration-300",
                    isFocused
                        ? "border-orange-500 ring-4 ring-orange-500/10 shadow-[0_0_20px_rgba(234,88,12,0.1)]"
                        : "border-zinc-200 shadow-sm"
                )}>
                    <div className="pl-2 text-zinc-400">
                        <Search className="h-5 w-5" />
                    </div>

                    {/* Chips / Badges */}
                    {ingredients.map((ing, idx) => (
                        <Badge
                            key={idx}
                            variant="orange"
                            className="pl-3 pr-1.5 py-1 gap-1 text-sm animate-in fade-in zoom-in duration-200"
                        >
                            {ing}
                            <button
                                type="button"
                                onClick={() => removeIngredient(idx)}
                                className="p-0.5 hover:bg-orange-200 rounded-full transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false)
                            if (inputValue.trim()) addIngredient(inputValue)
                        }}
                        disabled={isLoading}
                        placeholder={ingredients.length === 0 ? "Masukkan bahan (cth: ayam, telur)" : ""}
                        className="flex-1 min-w-[150px] h-10 bg-transparent border-none outline-none text-zinc-900 placeholder:text-zinc-400 font-medium"
                    />
                </div>

                {/* Popular Pairings */}
                <div className="flex flex-col gap-3">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-center">Bahan Populer</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {popularPairings.map((pair) => (
                            <button
                                key={pair.name}
                                type="button"
                                onClick={() => addIngredient(pair.name)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 hover:bg-orange-50 text-zinc-600 hover:text-orange-700 text-xs font-bold rounded-full border border-zinc-100 hover:border-orange-200 transition-all"
                            >
                                {pair.icon}
                                {pair.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit Action */}
                <div className="flex justify-center mt-2">
                    <Button
                        onClick={handleSubmit}
                        disabled={(ingredients.length < 2 && !inputValue.trim()) || isLoading}
                        size="lg"
                        className="h-14 px-12 rounded-2xl font-black text-lg gap-2 bg-zinc-900 shadow-xl shadow-zinc-200 hover:scale-105 transition-transform active:scale-95"
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                <UtensilsCrossed className="h-5 w-5" />
                                Racik Menu Sekarang
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
