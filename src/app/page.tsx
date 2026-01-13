import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { IngredientInput } from '@/components/IngredientInput'
import { ChefHat, Flame, Sparkles, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white selection:bg-orange-100 selection:text-orange-900 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Modern Minimalist Hero */}
        <section className="relative overflow-hidden bg-white px-4 py-24 md:py-32">
          {/* Subtle Mesh Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.08),transparent_70%)] blur-3xl opacity-60" />

          <div className="container relative mx-auto max-w-5xl text-center">
            {/* Headline */}
            <h1 className="mb-6 font-sans text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
              Masak Jadi{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Lebih Gampang
              </span>
            </h1>

            {/* Tagline */}
            <p className="mx-auto mb-12 max-w-xl text-lg text-zinc-500 font-medium leading-relaxed">
              Tinggal masukkan bahan yang tersedia di kulkas,
              kami bantu olah jadi mahakarya masakan rumahan.
            </p>

            {/* INPUT = PRIMARY CTA */}
            <div className="mx-auto mb-10 max-w-2xl">
              <IngredientInput />
            </div>

            {/* Helper Text */}
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              <Sparkles className="h-3 w-3 text-orange-500" />
              <span>Tekan Enter untuk menambah bahan</span>
            </div>
          </div>
        </section>

        {/* Minimalist Features */}
        <section className="bg-zinc-50/50 py-24 border-t border-zinc-100" id="features">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-sm border border-zinc-100 group-hover:border-orange-200 transition-all duration-300">
                  <ChefHat className="h-8 w-8 text-zinc-900 group-hover:text-orange-600 transition-colors" />
                </div>
                <h3 className="mb-3 text-base font-black text-zinc-900 uppercase tracking-tight">Ide Pintar</h3>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-[240px]">
                  Resep otomatis berbasis apa yang ada di kulkas Anda hari ini.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-sm border border-zinc-100 group-hover:border-orange-200 transition-all duration-300">
                  <Flame className="h-8 w-8 text-zinc-900 group-hover:text-orange-600 transition-colors" />
                </div>
                <h3 className="mb-3 text-base font-black text-zinc-900 uppercase tracking-tight">Langkah Detail</h3>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-[240px]">
                  Instruksi teknis ala chef profesional yang sangat mudah diikuti.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-sm border border-zinc-100 group-hover:border-orange-200 transition-all duration-300">
                  <Clock className="h-8 w-8 text-zinc-900 group-hover:text-orange-600 transition-colors" />
                </div>
                <h3 className="mb-3 text-base font-black text-zinc-900 uppercase tracking-tight">Hemat Waktu</h3>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-[240px]">
                  Cukup 30 menit untuk menghidangkan masakan lezat di meja makan.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
