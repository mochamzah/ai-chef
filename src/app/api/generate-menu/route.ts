import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { MenuIdea } from "@/types/menu"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
    try {
        const { ingredients } = await req.json()

        if (!ingredients || ingredients.length < 2) {
            return NextResponse.json(
                { error: "Minimal 2 bahan" },
                { status: 400 }
            )
        }

        // =========================
        // 👉 PROMPT FINAL DIMULAI DI SINI
        // =========================
        const systemPrompt = `
Kamu adalah CHEF RUMAHAN INDONESIA yang berpengalaman memasak harian.
Fokus pada masakan rumahan yang praktis, masuk akal, dan mudah dimasak.
Jawaban HARUS dalam format JSON valid. Jangan tambahkan teks lain.
`

        const userPrompt = `
BAHAN YANG TERSEDIA:
${ingredients.join(", ")}

TUGAS:
Buatkan TEPAT 3 (TIGA) menu masakan rumahan Indonesia yang BERBEDA SATU SAMA LAIN.

ATURAN WAJIB:
1. Gunakan gaya masakan rumahan Indonesia.
2. Jangan menambahkan bahan yang tidak umum.
3. Boleh menambahkan bumbu dasar (garam, gula, bawang, minyak).
4. Hindari menu aneh, fusion, atau teknik mahal.
5. Cocok untuk orang awam / pemula.

OUTPUT (JSON SAJA):

[
  {
    "id": "1",
    "title": "Nama menu yang umum di Indonesia",
    "duration": "20 menit",
    "difficulty": "mudah",
    "steps_short": [
      "Tumis bawang, masukkan ayam dan kangkung, lalu beri kecap."
    ],
    "steps_full": [
      "Siapkan semua bahan agar proses memasak lebih cepat.",
      "Panaskan sedikit minyak di wajan dengan api sedang.",
      "Tumis bawang putih dan bawang merah hingga harum.",
      "Masukkan potongan ayam, aduk hingga berubah warna.",
      "Tambahkan kangkung yang sudah dicuci bersih.",
      "Tuangkan kecap manis secukupnya dan aduk rata.",
      "Masak 2–3 menit hingga kangkung layu, lalu angkat.",
      "Sajikan selagi hangat."
    ],
    "tips": "Jangan masak kangkung terlalu lama agar tetap hijau dan renyah."
  }
]
`
        // =========================
        // 👉 PROMPT FINAL SELESAI
        // =========================

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.6,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
        })

        const raw = completion.choices[0].message.content
        if (!raw) throw new Error("AI response kosong")

        // parsing aman (defensive)
        const jsonStart = raw.indexOf("[")
        const jsonEnd = raw.lastIndexOf("]") + 1
        const cleanJson = raw.slice(jsonStart, jsonEnd)

        const menus: MenuIdea[] = JSON.parse(cleanJson)

        return NextResponse.json(menus)
    } catch (error) {
        console.error("GENERATE MENU ERROR:", error)
        return NextResponse.json(
            { error: "Gagal generate menu" },
            { status: 500 }
        )
    }
}
