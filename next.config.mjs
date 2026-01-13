/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'oaidalleapiprodscus.blob.core.windows.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'openrouter.ai',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.fal.ai',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.fal.run',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.replicate.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'replicate.delivery',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig
