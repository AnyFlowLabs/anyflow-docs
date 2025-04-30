import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';
import fs from 'fs';

const config: Config = {
  title: 'AnyFlow',
  tagline: 'Multichain Smart Contract Deployments',
  favicon: 'img/icon.svg',

  // Set the production url of your site here
  url: 'https://docs.anyflow.pro',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AnyFlowLabs', // Usually your GitHub org/user name.
  projectName: 'anyflow-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsed: false,
        },
        blog: false,
        gtag: {
          trackingID: 'G-7DZB6LNJ0F',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Plugin copied from https://github.com/prisma/docs
    async function pluginLlmsTxt(context) {
      return {
        name: "llms-txt-plugin",
        loadContent: async () => {
          const { siteDir } = context;
          const contentDir = path.join(siteDir, "docs");
          const allMd: string[] = [];

          // recursive function to get all md files
          const getMdFiles = async (dir: string) => {
            const entries = await fs.promises.readdir(dir, { withFileTypes: true });

            for (const entry of entries) {
              const fullPath = path.join(dir, entry.name);
              if (entry.isDirectory()) {
                await getMdFiles(fullPath);
              } else if (entry.name.endsWith(".md")) {
                const content = await fs.promises.readFile(fullPath, "utf8");
                allMd.push(content);
              }
            }
          };

          await getMdFiles(contentDir);
          return { allMd: allMd };
        },
        postBuild: async ({ content, routes, outDir }) => {
          const { allMd } = content as { allMd: string[] };

          // Write concatenated MD content
          const concatenatedPath = path.join(outDir, "llms-full.txt");
          const allContent = allMd.join("\n\n---\n\n")
          await fs.promises.writeFile(concatenatedPath, allContent);

          // we need to dig down several layers:
          // find PluginRouteConfig marked by plugin.name === "docusaurus-plugin-content-docs"
          const docsPluginRouteConfig = routes.filter(
            (route) => route.plugin.name === "docusaurus-plugin-content-docs"
          )[0];

          // docsPluginRouteConfig has a routes property has a record with the path "/" that contains all docs routes.
          const allDocsRouteConfig = docsPluginRouteConfig.routes?.filter(
            (route) => route.path === "/"
          )[0];

          let llmsTxt = '';

          // A little type checking first
          if (!allDocsRouteConfig?.props?.version) {
            llmsTxt = allContent
          } else {
            // this route config has a `props` property that contains the current documentation.
            const currentVersionDocsRoutes = (
              allDocsRouteConfig.props.version as Record<string, unknown>
            ).docs as Record<string, Record<string, unknown>>;

            // for every single docs route we now parse a path (which is the key) and a title
            const docsRecords = Object.entries(currentVersionDocsRoutes).map(([path, record]) => {
              return `- [${record.title}](${path}): ${record.description}`;
            });

            // Build up llms.txt file
            llmsTxt = `# ${context.siteConfig.title}\n\n## Docs\n\n${docsRecords.join("\n")}`;
          }

          // Write llms.txt file
          const llmsTxtPath = path.join(outDir, "llms.txt");
          try {
            fs.writeFileSync(llmsTxtPath, llmsTxt);
          } catch (err) {
            throw err;
          }
        },
      };
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/anyflow-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      // title: 'AnyFlow',
      logo: {
        alt: 'AnyFlow Logo',
        src: 'img/logo-dark.svg',
        srcDark: 'img/logo-light.svg',
      },
      items: [
        {
          // type: 'docSidebar',
          // sidebarId: 'tutorialSidebar',
          to: '/docs/intro',
          position: 'left',
          label: 'Getting Started',
        },
        { to: '/docs/how_it_works', label: 'How it works', position: 'left' },
        { to: '/docs/anyflow_cli', label: 'Anyflow CLI', position: 'left' },
        { to: '/docs/faq', label: 'FAQ', position: 'left' },
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/AnyFlowLabs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            { label: 'Anyflow CLI', to: '/docs/anyflow_cli' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.com/invite/aCygGwBWya',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/anyflow_',
            },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/AnyFlowLabs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AnyFlow. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
