import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';
import fs from 'fs';

// Function to strip frontmatter from markdown content
function stripFrontmatter(content: string): string {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  return content.replace(frontmatterRegex, '');
}

// Function to convert markdown to plain text (less aggressive conversion)
function markdownToPlainText(content: string): string {
  return content
    // Remove frontmatter
    .replace(/^---[\s\S]*?---\n/, '')
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Convert headers to plain text but keep the text
    .replace(/^#{1,6}\s+(.+)$/gm, '$1')
    // Convert links to include both text and URL
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    // Convert code blocks - keep the content but remove the backticks
    .replace(/```[\w]*\n([\s\S]*?)\n```/g, '$1')
    // Convert inline code - keep the content but remove single backticks
    .replace(/`([^`]+)`/g, '$1')
    // Keep emphasis markers as they might be part of content (like file_names)
    // Only remove bold/italic when it's clearly markdown formatting
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // Bold
    .replace(/\*([^*]+)\*/g, '$1')      // Italic (single asterisk)
    // Keep underscores in content - don't remove them
    // Convert list markers to simple dashes
    .replace(/^\s*[-*+]\s+/gm, '- ')
    .replace(/^\s*\d+\.\s+/gm, '• ')
    // Remove excessive whitespace but preserve paragraph breaks
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

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

  onBrokenLinks: 'warn',
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
    function pluginLlmsTxt(context) {
      return {
        name: "llms-txt-plugin",
        async loadContent() {
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
                // Convert markdown to plain text
                const plainText = markdownToPlainText(content);
                // Add file path as a header for context
                const relativePath = path.relative(contentDir, fullPath);
                const contentWithHeader = `File: ${relativePath}\n\n${plainText}`;
                allMd.push(contentWithHeader);
              }
            }
          };

          await getMdFiles(contentDir);
          return { allMd: allMd };
        },
        async contentLoaded({ content, actions }) {
          const { createData, addRoute } = actions;
          const { allMd } = content as { allMd: string[] };

          // Create the concatenated content file
          const allContent = allMd.join("\n\n==========\n\n");

          // Create a JavaScript module that exports the content
          const moduleContent = `export default ${JSON.stringify(allContent)};`;
          const contentPath = await createData('llms-content.js', moduleContent);

          // Add route that serves plain text
          addRoute({
            path: '/llmstxt',
            component: '@site/src/components/PlainTextResponse',
            modules: {
              content: contentPath,
            },
            exact: true,
          });
        },
        async postBuild({ content, outDir }) {
          const { allMd } = content as { allMd: string[] };
          const allContent = allMd.join("\n\n==========\n\n");

          // Write llms.txt file for production
          const llmsTxtPath = path.join(outDir, "llms.txt");
          try {
            fs.writeFileSync(llmsTxtPath, allContent);
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
