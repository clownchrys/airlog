const withTM = require("next-transpile-modules")([
    // "vertical-timeline-component-for-react",
]);

module.exports = withTM({
  reactStrictMode: true,

  // rewrites-path
  // async rewrites() {
  //   return [
  //     { source: "/test/:path*", destination: "/:path*" },
  //   ]
  // },

  // webpack
  webpack5: true,
  webpack: (config, options) => {
    console.log(`webpack version: ${ options.webpack.version }`);
    const { module, resolve, plugins } = config;
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;

    // svg
    module.rules.push({
      test: /\.svg$/,
      use: [ "@svgr/webpack" ]
    });

    // formidable/lib/file.js
    resolve.fallback = {
      ...resolve.fallback,
      // fs: false,
      // net: false,
      // tls: false
    };
    plugins.push(
        new webpack.DefinePlugin({"global.GENTLY": false})
    )

    // returning modified config
    return config;
  },

  // next/image
  images: {
    domains: [
        "k.kakaocdn.net",
    ]
  },
});
