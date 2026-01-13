'use client'

import React, { useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Search, X, Loader2 } from 'lucide-react'

export function IngredientInput() {
    const router = useRouter()
    const [inputValue, setInputValue] = useState('')
    const [ingredients, setIngredients] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

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

        // Add current input value as ingredient if it's not empty before submitting
        if (inputValue.trim()) {
            const trimmed = inputValue.trim().replace(/,$/, '')
            if (trimmed && !ingredients.includes(trimmed)) {
                const newIngredients = [...ingredients, trimmed]
                setIngredients(newIngredients)
                if (newIngredients.length >= 2) {
                    performRedirect(newIngredients)
                }
                return
            }
        }

        if (ingredients.length < 2) return
        performRedirect(ingredients)
    }

    const performRedirect = (ingredientsList: string[]) => {
        setIsLoading(true)
        const query = ingredientsList.map(encodeURIComponent).join(',')
        router.push(`/results?ingredients=${query}`)
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="flex flex-col gap-4">
                {/* Input Area */}
                <div className="relative group">
                    <div className="flex flex-wrap items-center gap-2 p-2 min-h-[3.5rem] bg-white rounded-2xl shadow-lg border border-zinc-100 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                        <div className="pl-2 text-zinc-400">
                            <Search className="h-5 w-5" />
                        </div>

                        {/* Chips */}
                        {ingredients.map((ing, idx) => (
                            <span
                                key={idx}
                                className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 text-sm font-medium rounded-lg border border-orange-100 animate-in fade-in zoom-in duration-200"
                            >
                                {ing}
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(idx)}
                                    className="hover:text-orange-900 rounded-full transition-colors"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </span>
                        ))}

                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={() => addIngredient(inputValue)}
                            disabled={isLoading}
                            placeholder={ingredients.length === 0 ? "Masukkan bahan (pisahkan dengan koma atau Enter)" : ""}
                            className="flex-1 min-w-[120px] h-10 bg-transparent border-none outline-none text-zinc-900 placeholder:text-zinc-400 disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Validation & Submit */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-zinc-500 font-medium">
                        {ingredients.length < 2 ? (
                            <span className="text-zinc-400">Minimal masukkan 2 bahan masakan.</span>
                        ) : (
                            <span className="text-emerald-600 flex items-center gap-1">
                                ✓ {ingredients.length} bahan siap diolah!
                            </span>
                        )}
                    </p>

                    <Button
                        onClick={handleSubmit}
                        disabled={(ingredients.length < 2 && !inputValue.trim()) || isLoading}
                        className="w-full sm:w-auto h-12 px-8 rounded-xl font-bold gap-2 shadow-orange-200"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sabar ya...
                            </>
                        ) : (
                            'Buat Ide Menu'
                        )}
                    </Button>
                </div>
            </div>

            <p className="mt-4 text-center text-xs text-zinc-400">
                Tips: Tekan <span className="px-1.5 py-0.5 bg-zinc-100 rounded border">Enter</span> atau <span className="px-1.5 py-0.5 bg-zinc-100 rounded border">,</span> untuk menambah bahan.
            </p>
        </div>
    )
}
