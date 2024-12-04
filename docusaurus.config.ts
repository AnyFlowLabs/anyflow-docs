import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
