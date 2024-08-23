/** @type {import('next').NextConfig} */
const nextConfig = {
    //This is defining resources that can get remote images in config level. Here Google signup images are being refered according to this example
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**'
            }
        ]
    }
};

export default nextConfig;
