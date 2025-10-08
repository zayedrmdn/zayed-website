/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://zayedrmdn.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://zayedrmdn.com'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority based on page importance
    const priorities = {
      '/': 1.0,
      '/#about': 0.9,
      '/#projects': 0.9,
      '/#experience': 0.8,
      '/#skills': 0.7,
      '/#contact': 0.8,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};