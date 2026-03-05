require('dotenv').config(); // load .env
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const SITE_URL = 'https://www.example.com'; // replace with your actual domain

// Helper to generate slug from productName
function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

async function generateSitemap() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, productName, created_at');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  // Static pages
  const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/about', priority: 0.8 },
    { url: '/contact', priority: 0.8 }
  ];

  const staticUrls = staticPages
    .map(
      (page) =>
        `<url>
          <loc>${SITE_URL}${page.url}</loc>
          <changefreq>weekly</changefreq>
          <priority>${page.priority}</priority>
        </url>`
    )
    .join('');

  // Product pages
  const productUrls = products
    .map((product) => {
      const slug = slugify(product.productName);
      const lastmod = new Date(product.created_at).toISOString();
      return `<url>
        <loc>${SITE_URL}/products/${slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
    })
    .join('');

  // Combine all URLs
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${productUrls}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully! Check public/sitemap.xml');
}

generateSitemap();