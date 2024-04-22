/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://y.backend:1323/:path*',
			},
		]
	},
};

export default nextConfig;
