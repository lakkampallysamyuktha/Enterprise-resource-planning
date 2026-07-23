import urllib.request
import os
import re

# Dictionary mapping local file names to Unsplash URLs
image_mapping = {
    "unsplash-1451187580459.webp": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "unsplash-1552664730.webp": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "unsplash-1563986768609.webp": "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "unsplash-1581091226825.webp": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "unsplash-1551288049.webp": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    "unsplash-1581092160562.webp": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    "unsplash-1556742049.webp": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    "unsplash-1556742111.webp": "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=800",
    "unsplash-1522071820081.webp": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    "unsplash-1454165804606.webp": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    "unsplash-1460925895917.webp": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    "unsplash-1600880292089.webp": "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80&w=800"
}

try:
    from PIL import Image
except ImportError:
    print("Installing PIL (Pillow)...")
    os.system("pip install Pillow")
    from PIL import Image

def download_and_convert():
    if not os.path.exists("Images"):
        os.makedirs("Images")

    for local_name, url in image_mapping.items():
        local_path = os.path.join("Images", local_name)
        temp_path = local_path + "_temp"
        print(f"Downloading {url} ...")
        urllib.request.urlretrieve(url, temp_path)
        
        # Convert to webp and ensure size < 100 KB
        with Image.open(temp_path) as img:
            # Resize a bit to ensure it stays well under 100 KB
            img.thumbnail((800, 800), Image.Resampling.LANCZOS)
            img.save(local_path, "webp", quality=50)
            
        os.remove(temp_path)
        size_kb = os.path.getsize(local_path) / 1024
        print(f"Saved {local_path} (Size: {size_kb:.2f} KB)")

if __name__ == "__main__":
    download_and_convert()
    print("All images downloaded successfully!")
