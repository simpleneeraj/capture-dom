module.exports = {
  title: "Screenshot",
  tagline: "Take screenshots",
  url: "https://screenshotjs.vercel.app",
  baseUrl: "/",
  favicon: "icons/favicon.ico",
  organizationName: "screenshot.js",
  projectName: "screenshotjs",

  // Theme
  themeConfig: {
    prism: {
      theme: require("prism-react-renderer/themes/synthwave84"),
    },
    algolia: {
      appId: "OUEDA16KPG",
      apiKey: "97c0894508f2d1d4a2fef4fe6db28448",
      indexName: "screenshotjs",
      searchParameters: {},
    },

    navbar: {
      title: "Screenshot",
      logo: {
        alt: "NextAuth Logo",
        src: "icons/android-chrome-192x192.png",
      },
      items: [
        {
          to: "/getting-started/introduction",
          activeBasePath: "docs",
          label: "Documentation",
          position: "left",
        },
        {
          to: "/blog",
          activeBasePath: "blog",
          label: "Blog",
          position: "left",
        },
        {
          to: "/website",
          activeBasePath: "website",
          label: "Articles",
          position: "left",
        },

        {
          to: "https://www.npmjs.com/package/screenshotjs",
          label: "npm",
          position: "right",
        },
        {
          to: "https://github.com/neerajcodes/screenshotjs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    // announcementBar: {
    //   id: "new-major-announcement",
    //   content:
    //     "The default documentation is for v4 which has been released to GA 🚨 migration to <b>v4</b> docs can be found <a href='/getting-started/upgrade-v4'>here</a> 👈 The old v3 docs can be found <a href='/v3/getting-started/introduction'>here</a>.",
    //   backgroundColor: "#1786fb",
    //   textColor: "#fff",
    // },
    footer: {
      links: [
        {
          title: "About Screenshot",
          items: [
            {
              label: "Introduction",
              to: "/getting-started/introduction",
            },
          ],
        },
        {
          title: "Download",
          items: [
            {
              label: "GitHub",
              to: "https://github.com/neerajcodes/screenshotjs",
            },
            {
              label: "NPM",
              to: "https://www.npmjs.com/package/screenshotjs",
            },
          ],
        },
        {
          title: "Acknowledgements",
          items: [
            {
              label: "Contributors",
              to: "/contributors",
            },
            {
              label: "Sponsors",
              to: "https://opencollective.com/screenshotjs",
            },
            {
              label: "Images by unDraw",
              to: "https://undraw.co/",
            },
          ],
        },
      ],
      copyright: `Screenshot &copy; Simple Neeraj ${new Date().getFullYear()}`,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          lastVersion: "current",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [
            require("remark-github"),
            require("mdx-mermaid"),
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
        },
        theme: {
          customCss: require.resolve("./src/css/index.css"),
        },
      },
    ],
  ],
}
