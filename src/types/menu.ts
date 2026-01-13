export type MenuIdea = {
    id: string
    title: string
    duration: string
    difficulty: "mudah" | "sedang"
    steps: string[]
    steps_short: string[]
    steps_full: string[]
    tips?: string
}
