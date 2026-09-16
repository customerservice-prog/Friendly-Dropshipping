/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
    ];
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/robots.txt', headers: [{key:'Cache-Control',value:'public, max-age=3600, stale-while-revalidate=86400'}] },
      { source: '/sitemap.xml', headers: [{key:'Cache-Control',value:'public, max-age=3600, stale-while-revalidate=86400'}] },
    ];
  },
};
export default nextConfig;
