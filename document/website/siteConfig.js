'use strict'

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const org = 'murosan'
const repositoryName = 'shogi-board'
const repositoryUrl = `https://github.com/${org}/${repositoryName}`
const githubio = `https://${org}.github.io`

const siteConfig = {
  title: 'ブラウザ将棋盤',
  tagline: repositoryName,
  url: githubio,
  baseUrl: `/${repositoryName}/`,

  projectName: repositoryName,
  organizationName: org,

  headerLinks: [
    { doc: 'doc1', label: 'Docs' },
    { doc: 'doc4', label: 'API' },
    { page: 'help', label: 'Help' },
    { blog: true, label: 'Blog' },
  ],

  headerIcon: 'img/docusaurus.svg',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon.png',

  colors: {
    primaryColor: 'rgb(32, 35, 41)',
    secondaryColor: 'rgb(67, 75, 90)',
  },

  copyright: `Copyright © ${new Date().getFullYear()} ${org}`,

  highlight: {
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  repoUrl: repositoryUrl,
}

module.exports = siteConfig
