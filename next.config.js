/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    sendGridApiKey: process.env.NEXT_PUBLIC_SENDGRID_API_KEY,
  },
}
