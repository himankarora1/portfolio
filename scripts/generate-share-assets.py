"""Generate OG/Twitter share images and favicon pack for the portfolio."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
IMAGES = PUBLIC / "images"
IMAGES.mkdir(parents=True, exist_ok=True)

BG = (5, 7, 11)
PANEL = (12, 16, 22)
CYAN = (6, 182, 212)
WHITE = (255, 255, 255)
MUTED = (156, 163, 175)
BORDER = (255, 255, 255, 28)


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_share_card(path: Path, width=1200, height=630):
    img = Image.new("RGB", (width, height), BG)
    draw = ImageDraw.Draw(img)

    # Soft cyan glow
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse((720, -80, 1280, 480), fill=(6, 182, 212, 36))
    gdraw.ellipse((-120, 360, 420, 760), fill=(6, 182, 212, 18))
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Inner panel
    margin = 40
    draw.rounded_rectangle(
        (margin, margin, width - margin, height - margin),
        radius=24,
        fill=PANEL,
        outline=(55, 65, 81),
        width=2,
    )

    # Left content
    draw.text((88, 96), "HIMANK ARORA", font=font(52, bold=True), fill=WHITE)
    draw.rounded_rectangle((88, 162, 280, 170), radius=4, fill=CYAN)

    badge_x, badge_y = 88, 210
    draw.ellipse((badge_x, badge_y, badge_x + 64, badge_y + 64), outline=WHITE, width=3)
    draw.text((badge_x + 32, badge_y + 32), "HA", font=font(22, bold=True), fill=WHITE, anchor="mm")
    draw.text((172, 228), "Technical Analyst & Developer", font=font(28, bold=True), fill=WHITE)

    draw.text(
        (88, 320),
        "Bridging analysis and engineering to ship\nproducts people actually use.",
        font=font(26),
        fill=MUTED,
        spacing=8,
    )
    draw.text((88, 520), "himankarora.com", font=font(24, bold=True), fill=CYAN)

    # Right visual: role chips + faux code card
    card = (700, 120, 1120, 500)
    draw.rounded_rectangle(card, radius=18, fill=(8, 11, 16), outline=(6, 182, 212), width=2)

    chips = [
        (720, 150, "Analysis"),
        (880, 150, "Engineering"),
        (720, 210, "React"),
        (860, 210, "Python"),
        (990, 210, "SQL"),
    ]
    for x, y, label in chips:
        tw = draw.textlength(label, font=font(18, bold=True))
        draw.rounded_rectangle((x, y, x + tw + 28, y + 36), radius=18, fill=(17, 24, 39), outline=(55, 65, 81))
        draw.text((x + 14, y + 8), label, font=font(18, bold=True), fill=WHITE)

    draw.text((740, 290), "const profile = {", font=font(20, bold=True), fill=MUTED)
    draw.text((760, 330), "role: 'Technical Analyst',", font=font(20), fill=WHITE)
    draw.text((760, 370), "focus: 'Build & ship',", font=font(20), fill=WHITE)
    draw.text((760, 410), "openTo: 'Opportunities'", font=font(20), fill=WHITE)
    draw.text((740, 450), "}", font=font(20, bold=True), fill=MUTED)

    img.save(path, "JPEG", quality=92, optimize=True)
    print(f"Wrote {path}")


def draw_favicon_base(size=512):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    pad = int(size * 0.06)
    draw.ellipse((pad, pad, size - pad, size - pad), fill=BG, outline=WHITE, width=max(2, size // 32))
    f = font(int(size * 0.38), bold=True)
    draw.text((size / 2, size / 2 + size * 0.02), "HA", font=f, fill=WHITE, anchor="mm")
    return img


def main():
    og = IMAGES / "og-image.jpg"
    twitter = IMAGES / "twitter-image.jpg"
    draw_share_card(og)
    draw_share_card(twitter)

    base = draw_favicon_base(512)
    base.resize((180, 180), Image.Resampling.LANCZOS).save(PUBLIC / "apple-touch-icon.png", "PNG")
    base.resize((32, 32), Image.Resampling.LANCZOS).save(PUBLIC / "favicon-32x32.png", "PNG")
    base.resize((16, 16), Image.Resampling.LANCZOS).save(PUBLIC / "favicon-16x16.png", "PNG")
    base.resize((192, 192), Image.Resampling.LANCZOS).save(PUBLIC / "android-chrome-192x192.png", "PNG")
    base.resize((512, 512), Image.Resampling.LANCZOS).save(PUBLIC / "android-chrome-512x512.png", "PNG")

    # Multi-size ICO
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = [base.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]
    ico_images[0].save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=ico_sizes,
        append_images=ico_images[1:],
    )

    # Safari pinned tab: simple monochrome SVG already referenced; write a clean one
    (PUBLIC / "safari-pinned-tab.svg").write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="6.5" fill="black"/>
  <text x="8" y="11" text-anchor="middle" font-family="Arial, sans-serif" font-size="6" font-weight="700" fill="white">HA</text>
</svg>
""",
        encoding="utf-8",
    )

    # Improve main favicon.svg with dark fill for visibility
    (PUBLIC / "favicon.svg").write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="15" fill="#05070b"/>
  <circle cx="16" cy="16" r="13" fill="none" stroke="#ffffff" stroke-width="2"/>
  <text x="16" y="21" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="700" fill="#ffffff">HA</text>
</svg>
""",
        encoding="utf-8",
    )

    print("Favicon pack complete")


if __name__ == "__main__":
    main()
