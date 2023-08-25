const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
}

const withNextIntl = require("next-intl/plugin")(
  "./i18n.js"
);

module.exports = withNextIntl(nextConfig);
