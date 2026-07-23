from PIL import Image
import sys

def resize_image(input_path, output_path, scale_factor=0.5):
    try:
        with Image.open(input_path) as img:
            new_size = (int(img.width * scale_factor), int(img.height * scale_factor))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
            img.save(output_path, quality=80)
            print(f"Successfully resized {input_path} and saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    resize_image('Images/img_be94160a.webp', 'Images/img_be94160a.webp')
