import { MenuIdeaSchema } from "@/types/menu"

export const maxDuration = 90;
export const runtime = 'nodejs';

const SYSTEM_PROMPT = `
# Role: AI Chef Consultant (Nusantara Specialist)

## Profile
Anda adalah Executive Chef dari brand "Geprek Mae". Spesialisasi Anda adalah menciptakan menu Nusantara modern yang "extra crispy", praktis untuk delivery, dan memiliki nilai jual tinggi (mid-tier positioning).

## Output Guidelines (JSON Strategy)
Setiap resep yang dihasilkan harus melalui proses penalaran berikut:
1. **Analisis Bahan**: Identifikasi rasa dasar dari bahan input.
2. **Branding Name**: Buat nama menu yang menggugah selera menggunakan kata sifat kuliner (misal: "Ayam Krispi Sambal Embe Bali" bukan hanya "Ayam Sambal").
3. **The 'Chef's Secret'**: Berikan satu tips teknik (Pro-Tip) yang memastikan tekstur atau rasa tetap premium (misal: suhu minyak, teknik pemotongan).

## Schema Content:
- title: Nama menu yang kreatif & komersial.
- description: Penjelasan singkat 1-2 kalimat yang menjual (storytelling).
- match_percentage: Logika kecocokan bahan yang akurat (0-100).
- chef_notes: Tips rahasia agar masakan selevel restoran mid-tier.
- steps_detail: Langkah memasak yang sangat mendetail namun mudah diikuti (maksimal 5-7 langkah).
- prep_time: Waktu persiapan/marinasi (menit).
- cook_time: Waktu memasak aktif (menit).
- difficulty: Tingkat kesulitan (Mudah/Sedang/Sulit).
- used_ingredients: Array bahan yang digunakan dari input.

CONSTRAINTS:
1. No generic names.
2. Speed optimization.
3. Max 7 steps per menu for detail.
4. Language: Professional but relaxed Indonesian.

OUTPUT FORMAT:
JANGAN gunakan markdown. Kembalikan JSON object murni.
Pastikan field 'menus' adalah array.
Contoh: { "menus": [...] }
`;

export async function POST(req: Request) {
    try {
        if (!process.env.OPENROUTER_API_KEY) {
            throw new Error("Missing OPENROUTER_API_KEY in environment variables");
        }

        const { ingredients } = await req.json()
        console.log("Ingredients received at backend:", ingredients);

        if (!ingredients || ingredients.length < 2) {
            return new Response(JSON.stringify({ error: "Minimal 2 bahan diperlukan" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        console.log("Fetching from OpenRouter with google/gemini-3-flash-preview (Raw Fetch)...");

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "AI Chef",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-3-flash-preview",
                "messages": [
                    { "role": "system", "content": SYSTEM_PROMPT },
                    { "role": "user", "content": `Bahan: ${ingredients.join(", ")}` }
                ],
                "response_format": { "type": "json_object" }
            })
        });

        if (!response.ok) {
            const errBody = await response.text();
            console.error("OpenRouter Error:", errBody);
            throw new Error(`OpenRouter responded with ${response.status}: ${errBody}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        console.log("Raw AI Output:", content);

        if (!content) {
            throw new Error("No content received from AI");
        }

        // Parse JSON content
        let parsedContent;
        try {
            parsedContent = JSON.parse(content);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            throw new Error("Failed to parse AI response as JSON");
        }

        // Validate structure (Optional but recommended)
        if (!parsedContent.menus || !Array.isArray(parsedContent.menus)) {
            // Fallback: if AI returned array directly
            if (Array.isArray(parsedContent)) {
                parsedContent = { menus: parsedContent };
            } else {
                console.warn("Unexpected JSON structure, returning raw object");
            }
        }

        return Response.json(parsedContent);

    } catch (error: any) {
        console.error("FULL ERROR STACK:", error)
        return new Response(JSON.stringify({ error: "Gagal meracik resep: " + error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
