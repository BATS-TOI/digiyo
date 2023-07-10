/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  swcMinify: true,
  images: {
    domains: [
      `digiyo-next-storage-b7fc10c5201644-staging.s3.amazonaws.com`,
      `digiyo-next-storage-b7fc10c5201644-staging.s3.us-east-1.amazonaws.com`
    ]
  }
}