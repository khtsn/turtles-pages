# Twitter Profile Photo Matcher

Crawls Twitter user profile photos and compares them with a reference image.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

```python
from twitter_photo_matcher import TwitterPhotoMatcher

matcher = TwitterPhotoMatcher()
result = matcher.match_user_photo('username', 'path/to/reference.jpg')
print(result)
```

Or run interactively:
```bash
python twitter_photo_matcher.py
```