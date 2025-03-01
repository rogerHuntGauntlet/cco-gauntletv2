/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    DEFAULT_BEDROCK_MODEL: process.env.DEFAULT_BEDROCK_MODEL,
    BEDROCK_INFERENCE_PROFILE_ARN: process.env.BEDROCK_INFERENCE_PROFILE_ARN,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  }
}

module.exports = nextConfig 