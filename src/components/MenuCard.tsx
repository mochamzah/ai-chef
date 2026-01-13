import { Clock, ChefHat, Info, Utensils, Printer } from "lucide-react"
import { cn } from "@/lib/utils"
import { MenuIdea } from "@/types/menu"
import { Button } from "@/components/ui/button"

interface MenuCardProps {
    menu: MenuIdea
    onOpen: () => void
    onPrint?: () => void
    className?: string
}

export default function MenuCard({ menu, onOpen, onPrint, className }: MenuCardProps) {

    return (
        <div className={cn(
            "rounded-2xl border border-orange-200 bg-white shadow-sm flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow relative",
            className
        )}>
            {/* Decorative Top Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-orange-400 to-red-500 absolute top-0 left-0" />

            <div className="p-6 flex flex-col flex-1 justify-between pt-8">
                <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold tracking-wider text-orange-500 uppercase">
                                RECOMMENDED MENU
                            </span>
                            <h3 className="text-xl font-bold text-zinc-900 leading-tight">
                                {menu.title || "Menyiapkan menu..."}
                            </h3>
                        </div>
                    </div>

                    {menu.difficulty && (
                        <div className="flex gap-2 mb-3">
                            <span className={cn(
                                "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                                menu.difficulty.toLowerCase().includes('mudah') ? "bg-green-100 text-green-700" :
                                    menu.difficulty.toLowerCase().includes('sedang') ? "bg-yellow-100 text-yellow-700" :
                                        "bg-red-100 text-red-700"
                            )}>
                                {menu.difficulty}
                            </span>
                        </div>
                    )}

                    <p className="text-sm text-zinc-500 italic mb-4 border-l-2 border-orange-200 pl-3">
                        "{menu.description || String.fromCharCode(160)}"
                    </p>

                    <div className="my-6 grid grid-cols-2 gap-3 text-xs font-medium text-zinc-600 bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-orange-400" />
                            {(menu.prep_time || 0) + (menu.cook_time || 0)} Menit
                        </div>
                        <div className="flex items-center gap-2">
                            <ChefHat className="h-4 w-4 text-orange-400" />
                            {menu.used_ingredients?.length || 0} Bahan
                        </div>
                        <div className="flex items-center gap-2 col-span-2 border-t border-orange-100 pt-2 mt-1">
                            <Utensils className="h-4 w-4 text-orange-400" />
                            <span className="line-clamp-1">Prep: {menu.prep_time}m | Cook: {menu.cook_time}m</span>
                        </div>
                    </div>

                    {/* Match Percentage */}
                    {(menu.match_percentage ?? 0) > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">
                                <span>Kecocokan Bahan</span>
                                <span>{menu.match_percentage}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                                    style={{ width: `${menu.match_percentage}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-orange-500" />
                            Sekilas Cara Masak
                        </h4>
                        {menu.steps_detail?.slice(0, 3).map((step, idx) => (
                            <div key={idx} className="flex gap-3 text-sm text-zinc-600 leading-snug">
                                <span className="flex-shrink-0 font-bold text-orange-400 font-mono text-xs mt-0.5">0{idx + 1}</span>
                                <span className="line-clamp-2">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex gap-2">
                    <Button
                        onClick={onPrint}
                        variant="outline"
                        className="flex-1 rounded-xl font-bold border-zinc-200 hover:bg-zinc-50 hover:text-orange-600 transition-colors"
                        title="Cetak Resep PDF"
                    >
                        <Printer className="w-5 h-5" />
                    </Button>
                    <Button
                        onClick={onOpen}
                        disabled={!menu.steps_detail || menu.steps_detail.length === 0}
                        className="flex-[4] rounded-xl font-bold bg-zinc-900 text-white hover:bg-zinc-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-zinc-200"
                    >
                        Lihat Resep
                    </Button>
                </div>
            </div>
        </div>
    )
}
