import os
import re

# Load the main index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

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

for route in routes:
    # Create target directory
    os.makedirs(route["dir"], exist_ok=True)
    
    # Extract the route-specific metadata content from the template
    template_pattern = r'<template id="seo-' + route["id"] + r'">(.*?)</template>'
    template_match = re.search(template_pattern, index_html, re.DOTALL)
    if not template_match:
        print(f"Error: Template seo-{route['id']} not found in index.html!")
        continue
    template_content = template_match.group(1).strip()
    
    content = index_html
    
    # Modify stylesheet and script sources to point to parent
    content = content.replace('href="style.css"', 'href="../style.css"')
    content = content.replace('src="app.js"', 'src="../app.js"')
    content = content.replace('href="manifest.json"', 'href="../manifest.json"')
    content = content.replace('href="assets/logo.jpg"', 'href="../assets/logo.jpg"')
    
    # Strip main page default SEO metadata to prevent conflicts
    content = re.sub(r'<title>.*?</title>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta name="description" content=".*?">', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<link rel="canonical" href=".*?">', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta property="og:.*?" content=".*?">', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta name="twitter:.*?" content=".*?">', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<script type="application/ld+json">.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    
    # Insert route-specific SEO templates into head
    content = content.replace('<!-- Primary SEO Metadata -->', '<!-- Primary SEO Metadata -->\n  ' + template_content)
    
    # Write output file
    out_path = os.path.join(route["dir"], 'index.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Generated {out_path} successfully with complete OG, Twitter, and JSON-LD metadata.")
