/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Alastair's Guides",
  tagline: "Dinosaurs are cool",
  url: "https://alastair87.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "alastair87", // Usually your GitHub org/user name.
  projectName: "alastair87.github.io", // Usually your repo name.
  themes: ["@docusaurus/theme-live-codeblock"],
  themeConfig: {
    navbar: {
      title: "Alastair's Guides",
      logo: {
        alt: "alastair87",
        src: "img/alastair87.png",
      },
      items: [
        { to: "/blog", label: "Blog", position: "left" },
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Guides",
        },       
        {
          href: "https://github.com/alastair87",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Guides",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Twitter",
              href: "https://twitter.com/abacus876",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/alastair87/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Alastair Cooper. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/alastair87/alastair87.github.io/edit/content/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/alastair87/alastair87.github.io/edit/content/blog/",
            // path: "./blog",
            // routeBasePath: "/"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
