'use strict'

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const org = 'murosan'
const repositoryName = 'shogi-board'
const repositoryUrl = `https://github.com/${org}/${repositoryName}`
const githubio = `https://${org}.github.io`
const playgroundUrl = `/${repositoryName}/playground/`

const isProd = process.env.NODE_ENV === 'production'

const siteConfig = {
  title: 'Shogi Board',
  tagline: 'ブラウザで棋譜並べや検討ができる将棋盤',
  url: githubio,
  baseUrl: `/${repositoryName}/`,

  projectName: repositoryName,
  organizationName: org,

  headerLinks: [
    { href: playgroundUrl, label: 'Playground' }, // デプロイ前にビルドする
    { doc: 'features', label: 'Docs' },
    { href: repositoryUrl, label: 'GitHub' },
    { blog: true, label: 'Blog' },
  ],

  headerIcon: 'img/icon.svg',
  footerIcon: 'img/icon.svg',
  favicon: 'img/favicon.ico',

  colors: {
    primaryColor: 'rgb(49, 53, 61)',
    secondaryColor: 'rgb(67, 75, 90)',
  },

  copyright: `Copyright © ${new Date().getFullYear()} ${org}`,

  gaTrackingId: isProd ? 'UA-104937240-2' : undefined,
  gaGtag: isProd || undefined,

  // https://cdnjs.com/libraries/highlight.js/
  highlight: {
    theme: 'vs2015',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/shogi-board.jpg',
  twitterImage: 'img/shogi-board.jpg',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  repoUrl: repositoryUrl,
  playgroundUrl,
}

module.exports = siteConfig
