import os
import re

# Load the main index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Define the routes and their specific metadata
routes = [
    {
        "dir": "best-driving-sunglasses",
        "title": "Best Driving Sunglasses | ShadeCast",
        "desc": "Find the best sunglasses for driving right now. Live glare & UV analysis with expert lens picks—updated every visit.",
        "canonical": "https://briancrouse77.github.io/shadecast/best-driving-sunglasses"
    },
    {
        "dir": "best-fishing-sunglasses",
        "title": "Best Fishing Sunglasses | ShadeCast",
        "desc": "Best fishing sunglasses for any water and light. Real-time UV data plus polarized lens picks that kill glare fast.",
        "canonical": "https://briancrouse77.github.io/shadecast/best-fishing-sunglasses"
    },
    {
        "dir": "best-disc-golf-sunglasses",
        "title": "Best Disc Golf Sunglasses | ShadeCast",
        "desc": "Top disc-golf sunglasses for reading terrain and spotting discs. Live contrast scoring and pro-level lens advice.",
        "canonical": "https://briancrouse77.github.io/shadecast/best-disc-golf-sunglasses"
    },
    {
        "dir": "best-running-sunglasses",
        "title": "Best Running Sunglasses | ShadeCast",
        "desc": "Running sunglasses that stay light, clear, and fog-free. Live weather scoring and budget-to-premium lens options.",
        "canonical": "https://briancrouse77.github.io/shadecast/best-running-sunglasses"
    },
    {
        "dir": "best-skiing-sunglasses",
        "title": "Best Skiing Sunglasses | ShadeCast",
        "desc": "Best sunglasses for skiing & snowboarding when goggles aren’t enough. Handles extreme snow glare with real-time VLT scoring.",
        "canonical": "https://briancrouse77.github.io/shadecast/best-skiing-sunglasses"
    }
]

for route in routes:
    # Create target directory
    os.makedirs(route["dir"], exist_ok=True)
    
    # Modify stylesheet and script sources to point to parent
    content = index_html
    content = content.replace('href="style.css"', 'href="../style.css"')
    content = content.replace('src="app.js"', 'src="../app.js"')
    content = content.replace('href="manifest.json"', 'href="../manifest.json"')
    content = content.replace('href="assets/logo.jpg"', 'href="../assets/logo.jpg"')
    
    # Replace default title, meta description, and canonical tags for static view-source compliance
    content = re.sub(
        r'<title>.*?</title>',
        f'<title>{route["title"]}</title>',
        content,
        flags=re.IGNORECASE
    )
    content = re.sub(
        r'<meta name="description" content=".*?">',
        f'<meta name="description" content="{route["desc"]}">',
        content,
        flags=re.IGNORECASE
    )
    content = re.sub(
        r'<link rel="canonical" href=".*?">',
        f'<link rel="canonical" href="{route["canonical"]}">',
        content,
        flags=re.IGNORECASE
    )
    
    # Write output file
    out_path = os.path.join(route["dir"], 'index.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Generated {out_path} successfully.")
