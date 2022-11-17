/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

//module.exports = nextConfig;

module.exports = {
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
  },
  async redirects() {
    return [
      {
        source: "/new",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

// module.exports = {
// async redirects() {
//   return [
//     {
//       source: "/new",
//       destination: "/login",
//       permanent: true,
//     },
//   ];
// },
// };
