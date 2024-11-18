export default function manifest() {
    return {
        name: 'Kank AI',
        short_name: 'KankAI',
        description: 'Aplikasi Chat AI canggih yang memberikan pengalaman interaktif dan responsif dengan kecerdasan buatan. Dapatkan jawaban instan untuk pertanyaan Anda, buat percakapan alami, dan nikmati komunikasi yang lebih efisien.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
