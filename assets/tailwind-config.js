// Tailwind CSS configuration file (loaded before Tailwind CDN)
// Ensures Tailwind uses class-based dark mode (requires tailwind v3+)
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: 'class'
    };
}
