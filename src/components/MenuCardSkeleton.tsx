import React from 'react'

export function MenuCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="h-7 w-3/4 bg-zinc-200 rounded-lg" />
                <div className="h-6 w-16 bg-zinc-100 rounded-full" />
            </div>

            {/* Meta Skeleton */}
            <div className="flex items-center gap-2 mb-6">
                <div className="h-4 w-4 bg-zinc-200 rounded-full" />
                <div className="h-4 w-20 bg-zinc-100 rounded-md" />
                <div className="h-1 w-1 bg-zinc-200 rounded-full" />
                <div className="h-4 w-4 bg-zinc-200 rounded-full" />
                <div className="h-4 w-16 bg-zinc-100 rounded-md" />
            </div>

            {/* Steps List Skeleton */}
            <div className="flex-1 space-y-4">
                <div className="h-3 w-24 bg-zinc-100 rounded-md" />
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-zinc-100" />
                            <div className="h-4 flex-1 bg-zinc-50 rounded-md" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Button Skeleton */}
            <div className="mt-8 h-11 w-full bg-zinc-200 rounded-2xl" />
        </div>
    )
}
