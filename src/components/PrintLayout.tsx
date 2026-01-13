import { MenuIdea } from "@/types/menu"
import { Clock, ChefHat, Square, Flame } from "lucide-react"

interface PrintLayoutProps {
    menu: MenuIdea | null
}

const highlightTime = (text: string) => {
    // Regex looking for numbers followed by specific keywords (menit, jam, detik, minute, hour, second)
    // and potentially ranges like "3-5 menit"
    const parts = text.split(/(\d+(?:-\d+)?\s*(?:menit|jam|detik|minute|hour|second|minutes|hours|seconds))/gi);
    return (
        <span>
            {parts.map((part, i) =>
                // Simple check: if it matches the regex pattern, bold it.
                /^\d+(?:-\d+)?\s*(?:menit|jam|detik|minute|hour|second|minutes|hours|seconds)/i.test(part) ?
                    <strong key={i} className="font-bold text-black">{part}</strong> :
                    part
            )}
        </span>
    );
};

export function PrintLayout({ menu }: PrintLayoutProps) {
    if (!menu) return null

    return (
        <div className="hidden print:block font-sans text-zinc-900 bg-white">
            <div className="max-w-[210mm] mx-auto p-8"> {/* Fallback padding if @page ignores */}

                {/* Header Section */}
                <div className="mb-12 text-center border-b border-zinc-200 pb-8">
                    <h1 className="text-4xl font-serif font-bold mb-4 tracking-tight text-zinc-900">
                        {menu.title}
                    </h1>

                    <div className="inline-flex items-center gap-6 text-sm text-zinc-500 font-medium uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {(menu.prep_time || 0) + (menu.cook_time || 0)} Menit
                        </span>
                        <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                        <span className="flex items-center gap-2">
                            <Flame className="w-4 h-4" />
                            {menu.difficulty}
                        </span>
                        <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                        <span className="flex items-center gap-2">
                            <ChefHat className="w-4 h-4" />
                            Chef Recipe
                        </span>
                    </div>

                    <p className="mt-6 text-lg text-zinc-600 italic font-serif leading-relaxed max-w-2xl mx-auto">
                        "{menu.description}"
                    </p>
                </div>

                {/* Main Content - Single Column Stream */}
                <div className="space-y-12">

                    {/* Ingredients Section */}
                    <section>
                        <h3 className="text-xl font-bold mb-6 border-b-2 border-zinc-900 inline-block pb-1">
                            Bahan-Bahan
                        </h3>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                            {menu.used_ingredients.map((ing, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Square className="w-5 h-5 text-zinc-300 shrink-0 mt-0.5" />
                                    <span className="text-zinc-700 leading-snug">{ing}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Instructions Section */}
                    <section>
                        <h3 className="text-xl font-bold mb-6 border-b-2 border-zinc-900 inline-block pb-1">
                            Instruksi Memasak
                        </h3>
                        <div className="space-y-6">
                            {menu.steps_detail.map((step, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 text-zinc-900 font-bold flex items-center justify-center font-serif text-lg group-hover:bg-zinc-200 print:bg-zinc-100 print:text-black">
                                        {i + 1}
                                    </div>
                                    <p className="text-zinc-700 leading-relaxed text-base pt-1">
                                        {highlightTime(step)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Chef Notes - Elegant Box */}
                    {menu.chef_notes && (
                        <section className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 print:border-zinc-200">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-zinc-500 mb-3">
                                Catatan Chef
                            </h4>
                            <p className="italic text-zinc-600 font-serif">
                                {menu.chef_notes}
                            </p>
                        </section>
                    )}
                </div>

                {/* New Footer */}
                <div className="mt-16 pt-8 border-t border-zinc-100 text-center">
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                        Dihasilkan secara otomatis oleh AI Chef Consultant
                    </p>
                </div>
            </div>
        </div>
    )
}
