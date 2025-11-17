import os
import requests
from PIL import Image
from skimage.metrics import structural_similarity as ssim
import numpy as np
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TwitterPhotoMatcher:
    def __init__(self):
        self.options = Options()
        self.options.add_argument('--headless')
        self.options.add_argument('--no-sandbox')
        self.options.add_argument('--disable-dev-shm-usage')
        self.options.add_argument('--disable-gpu')
        self.options.add_argument('--disable-extensions')
        self.options.add_argument('--remote-debugging-port=9222')
    
    def get_user_photo(self, username):
        """Crawl Twitter user's photo page for 400x400.jpg image"""
        driver = webdriver.Chrome(options=self.options)
        try:
            url = f"https://x.com/{username}/photo"
            driver.get(url)
            
            # Wait for page to load
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "img"))
            )
            
            page_source = driver.page_source
            
            # Save page for debugging
            with open(f"{username}.html", "w", encoding="utf-8") as f:
                f.write(page_source)
            
            # Search for profile images
            pattern = r'https://[^"\s]*400x400\.jpg'
            matches = re.findall(pattern, page_source)
            
            if not matches:
                raise Exception("No 400x400.jpg image found on profile")
            
            return matches[0]
        finally:
            driver.quit()
    
    def download_image(self, url):
        """Download and return PIL Image"""
        response = requests.get(url)
        response.raise_for_status()
        return Image.open(requests.get(url, stream=True).raw)
    
    def compare_images(self, img1, img2):
        """Compare two images using structural similarity"""
        # Resize images to same size
        size = (400, 400)
        img1 = img1.resize(size).convert('RGB')
        img2 = img2.resize(size).convert('RGB')
        
        # Convert to numpy arrays
        arr1 = np.array(img1)
        arr2 = np.array(img2)
        
        # Calculate SSIM for each channel and take mean
        similarity = ssim(arr1, arr2, channel_axis=2)
        return similarity
    
    def match_user_photo(self, username, reference_image_path, threshold=0.8):
        """Main function to check if user's photo matches reference image"""
        try:
            # Get user's profile photo
            photo_url = self.get_user_photo(username)
            user_image = self.download_image(photo_url)
            
            # Load reference image
            reference_image = Image.open(reference_image_path)
            
            # Compare images
            similarity = self.compare_images(user_image, reference_image)
            
            return {
                'username': username,
                'similarity': similarity,
                'is_match': similarity >= threshold,
                'photo_url': photo_url
            }
        
        except Exception as e:
            return {'error': str(e)}

if __name__ == "__main__":
    matcher = TwitterPhotoMatcher()
    
    # Example usage
    username = input("Enter Twitter username: ")
    reference_path = input("Enter path to reference image: ")
    
    result = matcher.match_user_photo(username, reference_path)
    
    if 'error' in result:
        print(f"Error: {result['error']}")
    else:
        print(f"Username: {result['username']}")
        print(f"Similarity: {result['similarity']:.3f}")
        print(f"Match: {'Yes' if result['is_match'] else 'No'}")
        print(f"Photo URL: {result['photo_url']}")