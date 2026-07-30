#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from PIL import Image
import json, re, subprocess, sys

ROOT = Path(__file__).resolve().parent.parent

class Inspector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.refs = [], []
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if "id" in data: self.ids.append(data["id"])
        if tag in {"img","script","link"}:
            key = "src" if tag in {"img","script"} else "href"
            value = data.get(key)
            if value and not re.match(r"^(https?:|data:|#)", value):
                self.refs.append(value)

errors=[]
html=(ROOT/"index.html").read_text(encoding="utf-8")
inspector=Inspector(); inspector.feed(html)

duplicates=sorted({item for item in inspector.ids if inspector.ids.count(item)>1})
if duplicates: errors.append(f"Duplicate HTML IDs: {duplicates}")

for ref in inspector.refs:
    if not (ROOT/ref.split("?",1)[0]).exists():
        errors.append(f"Missing local reference: {ref}")

css=(ROOT/"styles.css").read_text(encoding="utf-8")
if css.count("{") != css.count("}"): errors.append("CSS brace imbalance")

for filename in ("app.js","content.js"):
    result=subprocess.run(["node","--check",str(ROOT/filename)],capture_output=True,text=True)
    if result.returncode: errors.append(f"{filename}: {result.stderr.strip()}")

for filename in ("project-finance.webp","project-inventory.webp","project-migration.webp","project-minus.webp","project-ecommerce.webp"):
    try:
        with Image.open(ROOT/"assets"/filename) as image:
            if image.width<1920 or image.height<720:
                errors.append(f"{filename} below minimum: {image.size}")
    except Exception as exc:
        errors.append(f"{filename}: {exc}")

placeholder_count=sum(
    path.read_text(encoding="utf-8").count("example.com")
    for path in (ROOT/"index.html",ROOT/"content.js")
)
print(json.dumps({"status":"failed" if errors else "passed","errors":errors,"example_com_placeholders":placeholder_count},ensure_ascii=False,indent=2))
sys.exit(1 if errors else 0)
