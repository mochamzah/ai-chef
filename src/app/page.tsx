import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { IngredientInput } from '@/components/IngredientInput'
import { ChefHat, Flame, Sparkles, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-zinc-950 px-4 py-24 text-white md:px-6 md:py-32">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,88,12,0.15),rgba(9,9,11,0))]" />

          <div className="container relative mx-auto max-w-5xl text-center">
            {/* Headline */}
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
              Masak Jadi{" "}
              <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
                Lebih Gampang
              </span>
            </h1>

            {/* Tagline */}
            <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl">
              Tinggal masukin bahan yang ada di kulkas, kami bantu ide masakan
              rumahan yang masuk akal.
            </p>

            {/* INPUT = PRIMARY CTA */}
            <div className="mx-auto mb-4 max-w-xl">
              <IngredientInput />
            </div>

            {/* Helper text */}
            <p className="text-sm text-zinc-400">
              Minimal masukkan{" "}
              <span className="font-semibold text-white">2 bahan</span>.
              Contoh:{" "}
              <span className="text-white">ayam, telur, bawang</span>
            </p>
          </div>
        </section>


        {/* Features Section */}
        <section className="bg-white py-24" id="features">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-zinc-900 md:text-5xl">
                Dapur Kamu, Versi Lebih Pintar
              </h2>
              <p className="mt-4 text-zinc-500">
                Semua yang kamu butuhkan untuk masak lebih praktis setiap hari.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <div className="rounded-2xl border border-zinc-100 bg-white p-8 transition-all hover:border-orange-200 hover:shadow-xl">
                <div className="mb-6 inline-flex rounded-xl bg-orange-50 p-3">
                  <ChefHat className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-zinc-900">
                  Ide Masakan Pintar
                </h3>
                <p className="leading-relaxed text-zinc-500">
                  Dapatkan ide masakan otomatis dari bahan yang sudah kamu punya di rumah.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-zinc-100 bg-white p-8 transition-all hover:border-orange-200 hover:shadow-xl">
                <div className="mb-6 inline-flex rounded-xl bg-orange-50 p-3">
                  <Flame className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-zinc-900">
                  Panduan Masak Langkah Demi Langkah
                </h3>
                <p className="leading-relaxed text-zinc-500">
                  Ikuti panduan memasak yang jelas, mudah dipahami, dan cocok untuk pemula.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-zinc-100 bg-white p-8 transition-all hover:border-orange-200 hover:shadow-xl">
                <div className="mb-6 inline-flex rounded-xl bg-orange-50 p-3">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-zinc-900">
                  Masakan Cepat & Praktis
                </h3>
                <p className="leading-relaxed text-zinc-500">
                  Temukan menu rumahan yang bisa dimasak cepat tanpa ribet.
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
