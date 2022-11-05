const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// csp options dont allow inline styles, possibly use hash or nonce?
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

const headers = async () => {
  return [
    {
      // Apply these headers to all routes in your application.
      source: '/:path*',
      headers: securityHeaders,
    },
  ];
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // note that strict mode causes an additional render of a page, as well as an additional subscriber to onAuthStateChanged
  // https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice
  reactStrictMode: true,
  headers: headers,
};

module.exports = withBundleAnalyzer(nextConfig);
