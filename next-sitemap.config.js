/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.yourdomain.com',
  generateRobotsTxt: true, // Will create robots.txt automatically
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*'], // optional
}
