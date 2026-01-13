export function Footer() {
    return (
        <footer className="border-t bg-zinc-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold text-zinc-900">AI Chef</h3>
                        <p className="text-sm text-zinc-500 mt-1">Transforming cooking with intelligence.</p>
                    </div>
                    <p className="text-xs text-zinc-400">
                        &copy; {new Date().getFullYear()} AI Chef. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
