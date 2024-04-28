import env from '@next/env'
 
const projectDir = process.cwd();
env.loadEnvConfig(projectDir);

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		if (process.env.API_URL == null || process.env.API_URL.length == 0) {
			console.warn("Enviroment variable 'API_URL' is not set!");
			console.warn("An error occurred while loading configuration. Not loading API proxy");
			return [];
		}

		return [
			{
				source: '/api/:path*',
				destination: `${process.env.API_URL}/:path*`,
			},
		]
	},
};

export default nextConfig;
