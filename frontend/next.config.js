/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // supaya folder public/themes bisa diakses langsung
  // misal fetch('/themes/themes_oct.json')
  assetPrefix: "",
  images: {
    domains: [], // nanti kalau mau load NFT atau icon dari URL eksternal
  },
  env: {
    VOTE_MANAGER_ADDRESS: "0xa1D5aC2C86A4215Bfb64738cd5655fEf8A21Bce8",
    SBT_REWARD_ADDRESS: "0x5ba23E827e684F8171983461f1D0FC3b41bECbC3",
  },
};

module.exports = nextConfig;
