import os
import re

# Central Config Base URL controlling all production route index paths
SITE_BASE_URL = "https://briancrouse77.github.io/shadecast/"

# Load the source template index_src.html
with open('index_src.html', 'r', encoding='utf-8') as f:
    index_src = f.read()

# Helper function to replace domain URLs based on the central config
def apply_site_base_url(html_content):
    # Replace the template placeholder token
    temp = html_content.replace('{{SITE_BASE_URL}}', SITE_BASE_URL)
    # Replace any literal github staging domain occurrences to ensure compliance
    temp = temp.replace('https://briancrouse77.github.io/shadecast/', SITE_BASE_URL)
    return temp

# 1. Generate the main root index.html
main_index = apply_site_base_url(index_src)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(main_index)
print("Generated root index.html successfully.")

# Define the routes and their specific metadata mappings
routes = [
    {
        "dir": "best-driving-sunglasses",
        "id": "driving"
    },
    {
        "dir": "best-fishing-sunglasses",
        "id": "fishing"
    },
    {
        "dir": "best-disc-golf-sunglasses",
        "id": "disc-golf"
    },
    {
        "dir": "best-running-sunglasses",
        "id": "running"
    },
    {
        "dir": "best-skiing-sunglasses",
        "id": "skiing"
    }
]

# 2. Generate subpage index files
for route in routes:
    os.makedirs(route["dir"], exist_ok=True)
    
    # Extract route-specific metadata block from template
    template_pattern = r'<template id="seo-' + route["id"] + r'">(.*?)</template>'
    template_match = re.search(template_pattern, index_src, re.DOTALL)
    if not template_match:
        print(f"Error: Template seo-{route['id']} not found in index_src.html!")
        continue
    template_content = template_match.group(1).strip()
    
    content = index_src
    
    # Strip default home page metadata
    content = re.sub(r'<title>.*?</title>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta name="description" content=".*?">', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<link rel="canonical" href=".*?">', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta property="og:.*?" content=".*?">', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta name="twitter:.*?" content=".*?">', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<script type="application/ld\+json">.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    
    # Insert route-specific SEO block
    content = content.replace('<!-- Primary SEO Metadata -->', '<!-- Primary SEO Metadata -->\n  ' + template_content)
    
    # Modify static script & style paths to go up one directory
    content = content.replace('href="style.css"', 'href="../style.css"')
    content = content.replace('src="app.js"', 'src="../app.js"')
    content = content.replace('href="manifest.json"', 'href="../manifest.json"')
    content = content.replace('href="assets/logo.jpg"', 'href="../assets/logo.jpg"')
    
    # Apply configured domain URL replacements
    content = apply_site_base_url(content)
    
    # Write route output file
    out_path = os.path.join(route["dir"], 'index.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Generated {out_path} successfully using base: {SITE_BASE_URL}")

# 3. Generate sitemap.xml dynamically
sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>{SITE_BASE_URL}</loc>
    <lastmod>2026-07-12</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>{SITE_BASE_URL}best-driving-sunglasses/</loc>
    <lastmod>2026-07-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{SITE_BASE_URL}best-fishing-sunglasses/</loc>
    <lastmod>2026-07-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{SITE_BASE_URL}best-disc-golf-sunglasses/</loc>
    <lastmod>2026-07-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{SITE_BASE_URL}best-running-sunglasses/</loc>
    <lastmod>2026-07-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{SITE_BASE_URL}best-skiing-sunglasses/</loc>
    <lastmod>2026-07-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>{SITE_BASE_URL}about/</loc>
    <lastmod>2026-07-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>{SITE_BASE_URL}privacy/</loc>
    <lastmod>2026-07-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
</urlset>
"""
with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_content)
print("Generated sitemap.xml dynamically.")

# 4. Generate robots.txt dynamically
robots_content = f"""User-agent: *
Allow: /

Sitemap: {SITE_BASE_URL}sitemap.xml
"""
with open('robots.txt', 'w', encoding='utf-8') as f:
    f.write(robots_content)
print("Generated robots.txt dynamically.")
