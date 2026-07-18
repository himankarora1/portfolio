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
AMBER = (251, 191, 36)
WHITE = (255, 255, 255)
MUTED = (156, 163, 175)
CHIP_BG = (17, 24, 39)
CHIP_BORDER = (55, 65, 81)


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def base_canvas(width=1200, height=630, accent=CYAN, dual=False):
    img = Image.new("RGB", (width, height), BG)
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    if dual:
        gdraw.ellipse((-80, -100, 520, 420), fill=(*CYAN, 42))
        gdraw.ellipse((680, 220, 1320, 760), fill=(*AMBER, 42))
    else:
        gdraw.ellipse((720, -80, 1280, 480), fill=(*accent, 36))
        gdraw.ellipse((-120, 360, 420, 760), fill=(*accent, 18))
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    draw = ImageDraw.Draw(img)
    margin = 40
    draw.rounded_rectangle(
        (margin, margin, width - margin, height - margin),
        radius=24,
        fill=PANEL,
        outline=CHIP_BORDER,
        width=2,
    )
    return img, draw


def draw_chip(draw, x, y, label, accent=CYAN):
    tw = draw.textlength(label, font=font(17, bold=True))
    w, h = tw + 26, 34
    draw.rounded_rectangle((x, y, x + w, y + h), radius=17, fill=CHIP_BG, outline=accent)
    draw.text((x + 13, y + 7), label, font=font(17, bold=True), fill=WHITE)
    return w


def draw_hub_card(path: Path):
    """Dual-identity share card: equal tech + artist halves about Himank."""
    img, draw = base_canvas(dual=True)
    width, height = img.size

    # Centered brand header
    draw.text((width / 2, 92), "HIMANK ARORA", font=font(52, bold=True), fill=WHITE, anchor="mt")
    # Dual underline: cyan + amber
    draw.rounded_rectangle((width / 2 - 120, 156, width / 2 - 8, 164), radius=4, fill=CYAN)
    draw.rounded_rectangle((width / 2 + 8, 156, width / 2 + 120, 164), radius=4, fill=AMBER)

    badge_x, badge_y = width / 2 - 28, 186
    draw.ellipse((badge_x, badge_y, badge_x + 56, badge_y + 56), outline=WHITE, width=3)
    draw.text((width / 2, badge_y + 28), "HA", font=font(20, bold=True), fill=WHITE, anchor="mm")
    draw.text(
        (width / 2, 268),
        "Analyst by craft  ·  Artist by passion",
        font=font(24, bold=True),
        fill=WHITE,
        anchor="mt",
    )
    draw.text(
        (width / 2, 308),
        "One person. Two portfolios. Pick a path.",
        font=font(20),
        fill=MUTED,
        anchor="mt",
    )

    # Equal path panels
    left = (72, 360, 584, 540)
    right = (616, 360, 1128, 540)
    draw.rounded_rectangle(left, radius=18, fill=(8, 11, 16), outline=CYAN, width=3)
    draw.rounded_rectangle(right, radius=18, fill=(8, 11, 16), outline=AMBER, width=3)

    draw.text((112, 384), "TECH", font=font(14, bold=True), fill=CYAN)
    draw.text((112, 408), "Technical Analyst & Developer", font=font(22, bold=True), fill=WHITE)
    draw.text(
        (112, 446),
        "Analysis and engineering.\nShipping products people use.",
        font=font(17),
        fill=MUTED,
        spacing=3,
    )
    x = 112
    for label in ("Analysis", "React", "Python"):
        x += draw_chip(draw, x, 498, label, CYAN) + 8

    draw.text((656, 384), "ARTIST", font=font(14, bold=True), fill=AMBER)
    draw.text((656, 408), "Artist & Content Creator", font=font(22, bold=True), fill=WHITE)
    draw.text(
        (656, 446),
        "Music, gaming, vlogs, and\ncommunity along the way.",
        font=font(17),
        fill=MUTED,
        spacing=3,
    )
    x = 656
    for label in ("Music", "Gaming", "Vlogs"):
        x += draw_chip(draw, x, 498, label, AMBER) + 8

    draw.text((width / 2, 572), "himankarora.com", font=font(22, bold=True), fill=WHITE, anchor="mt")

    img.save(path, "JPEG", quality=92, optimize=True)
    print(f"Wrote {path}")


def draw_tech_card(path: Path):
    img, draw = base_canvas(accent=CYAN)
    draw.text((88, 96), "HIMANK ARORA", font=font(50, bold=True), fill=WHITE)
    draw.rounded_rectangle((88, 160, 270, 168), radius=4, fill=CYAN)
    draw.ellipse((88, 210, 152, 274), outline=WHITE, width=3)
    draw.text((120, 242), "HA", font=font(22, bold=True), fill=WHITE, anchor="mm")
    draw.text((172, 228), "Technical Analyst & Developer", font=font(28, bold=True), fill=WHITE)
    draw.text(
        (88, 320),
        "Bridging analysis and engineering to ship\nproducts people actually use.",
        font=font(26),
        fill=MUTED,
        spacing=8,
    )
    draw.text((88, 520), "himankarora.com/tech", font=font(24, bold=True), fill=CYAN)

    draw.rounded_rectangle((700, 120, 1120, 500), radius=18, fill=(8, 11, 16), outline=CYAN, width=2)
    x, y = 720, 150
    for label in ("Analysis", "Engineering", "React", "Python", "SQL"):
        w = draw_chip(draw, x, y, label, CYAN)
        x += w + 12
        if x > 1000:
            x, y = 720, 210

    draw.text((740, 290), "const profile = {", font=font(20, bold=True), fill=MUTED)
    draw.text((760, 330), "role: 'Technical Analyst',", font=font(20), fill=WHITE)
    draw.text((760, 370), "focus: 'Build & ship',", font=font(20), fill=WHITE)
    draw.text((760, 410), "openTo: 'Opportunities'", font=font(20), fill=WHITE)
    draw.text((740, 450), "}", font=font(20, bold=True), fill=MUTED)

    img.save(path, "JPEG", quality=92, optimize=True)
    print(f"Wrote {path}")


def draw_artist_card(path: Path):
    img, draw = base_canvas(accent=AMBER)
    draw.text((88, 96), "HIMANK ARORA", font=font(50, bold=True), fill=WHITE)
    draw.rounded_rectangle((88, 160, 270, 168), radius=4, fill=AMBER)
    draw.ellipse((88, 210, 152, 274), outline=WHITE, width=3)
    draw.text((120, 242), "HA", font=font(22, bold=True), fill=WHITE, anchor="mm")
    draw.text((172, 228), "Artist & Content Creator", font=font(28, bold=True), fill=WHITE)
    draw.text(
        (88, 320),
        "Music, gaming, vlogs, and other fun content,\nbuilt with the community along the way.",
        font=font(24),
        fill=MUTED,
        spacing=8,
    )
    draw.text((88, 520), "himankarora.com/artist", font=font(24, bold=True), fill=AMBER)

    draw.rounded_rectangle((700, 120, 1120, 500), radius=18, fill=(8, 11, 16), outline=AMBER, width=2)
    x, y = 720, 150
    for label in ("Music", "Gaming", "Vlogs", "YouTube", "Community"):
        w = draw_chip(draw, x, y, label, AMBER)
        x += w + 12
        if x > 980:
            x, y = 720, 210

    draw.text((740, 300), "Creating through", font=font(22), fill=MUTED)
    draw.text((740, 350), "music, games,", font=font(28, bold=True), fill=WHITE)
    draw.text((740, 400), "and community.", font=font(28, bold=True), fill=WHITE)

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
    # Hub / default share previews (new filenames bust Discord/Twitter caches)
    draw_hub_card(IMAGES / "og-hub.jpg")
    draw_hub_card(IMAGES / "twitter-hub.jpg")
    draw_hub_card(IMAGES / "og-image.jpg")
    draw_hub_card(IMAGES / "twitter-image.jpg")
    # Page-specific previews
    draw_tech_card(IMAGES / "og-image-tech.jpg")
    draw_artist_card(IMAGES / "og-image-artist.jpg")

    base = draw_favicon_base(512)
    base.resize((180, 180), Image.Resampling.LANCZOS).save(PUBLIC / "apple-touch-icon.png", "PNG")
    base.resize((32, 32), Image.Resampling.LANCZOS).save(PUBLIC / "favicon-32x32.png", "PNG")
    base.resize((16, 16), Image.Resampling.LANCZOS).save(PUBLIC / "favicon-16x16.png", "PNG")
    base.resize((192, 192), Image.Resampling.LANCZOS).save(PUBLIC / "android-chrome-192x192.png", "PNG")
    base.resize((512, 512), Image.Resampling.LANCZOS).save(PUBLIC / "android-chrome-512x512.png", "PNG")

    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = [base.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]
    ico_images[0].save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=ico_sizes,
        append_images=ico_images[1:],
    )

    (PUBLIC / "safari-pinned-tab.svg").write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="6.5" fill="black"/>
  <text x="8" y="11" text-anchor="middle" font-family="Arial, sans-serif" font-size="6" font-weight="700" fill="white">HA</text>
</svg>
""",
        encoding="utf-8",
    )

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
