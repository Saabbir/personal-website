#!/usr/bin/env python3
"""
Generates 1200x630 Open Graph cards into public/images/og/.

Before this existed every page shared one 600x600 headshot, so every link
preview was a cropped square face with no context. Re-run after adding or
retitling a case study:

    python3 scripts/generate-og-images.py
"""
import pathlib
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (10, 15, 29)
ACCENT = (0, 229, 153)
CYAN = (0, 210, 255)
WHITE = (241, 245, 249)
DIM = (148, 163, 184)

FONT = "/System/Library/Fonts/HelveticaNeue.ttc"
OUT = pathlib.Path("public/images/og")


def font(size, bold=False):
    # HelveticaNeue.ttc: index 0 regular, 1 bold-ish medium
    return ImageFont.truetype(FONT, size, index=1 if bold else 0)


def wrap(draw, text, fnt, max_width):
    words, lines, line = text.split(), [], ""
    for word in words:
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=fnt) <= max_width:
            line = trial
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def tracked(draw, xy, text, fnt, fill, spacing=3):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + spacing


def card(filename, eyebrow, title, metric=None):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # Accent bar across the top, emerald -> cyan
    for x in range(W):
        t = x / W
        d.line(
            [(x, 0), (x, 8)],
            fill=(
                int(ACCENT[0] + (CYAN[0] - ACCENT[0]) * t),
                int(ACCENT[1] + (CYAN[1] - ACCENT[1]) * t),
                int(ACCENT[2] + (CYAN[2] - ACCENT[2]) * t),
            ),
        )

    pad = 80
    f_title = font(64 if not metric else 56, bold=True)
    lines = wrap(d, title, f_title, W - pad * 2)[:4]
    line_h = int(f_title.size * 1.26)

    # Centre the eyebrow + metric + title block in the space between the
    # accent bar and the footer, so short and long titles both sit right.
    block_h = 62 + (150 if metric else 0) + line_h * len(lines)
    y = max(110, (H - 120 - block_h) // 2)

    tracked(d, (pad, y), eyebrow.upper(), font(22, bold=True), ACCENT, spacing=3)
    y += 62

    if metric:
        d.text((pad, y), metric, font=font(130, bold=True), fill=ACCENT)
        y += 150

    for line in lines:
        d.text((pad, y), line, font=f_title, fill=WHITE)
        y += line_h

    # Footer
    f_foot = font(26)
    foot_y = H - pad - 10
    d.text((pad, foot_y), "Saabbir Hossain", font=font(26, bold=True), fill=WHITE)
    right = "saabbir.com"
    d.text((W - pad - d.textlength(right, font=f_foot), foot_y), right, font=f_foot, fill=DIM)

    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / filename, "PNG", optimize=True)
    print("wrote", OUT / filename)


CARDS = [
    ("default.png", "Shopify · Performance · Testing", "I build Shopify storefronts, and I test what actually works.", None),
    ("work.png", "Case studies", "Shopify builds, A/B tests and speed work — including what the numbers don't prove.", None),
    ("writing.png", "Writing", "Notes on Shopify, performance and testing. Mostly things that broke.", None),
    ("about.png", "About", "Frontend engineer in Dhaka. Shopify, performance, experiments.", None),
    ("wax-london-model-vs-product.png", "A/B test · Wax London",
     "Does seeing the model sell the suit?", "+50%"),
    ("wax-london-homepage-performance.png", "Performance · Wax London",
     "How I got Wax London's homepage on screen sooner", "-27%"),
    ("wax-london-pdp-performance.png", "Performance · Wax London",
     "How I made a Wax London product page feel ready sooner", "-17%"),
    ("bat-uk-homepage-product-carousel.png", "A/B test · BAT UK",
     "Putting bestsellers on the BAT UK homepage", "+35%"),
]

for name, eyebrow, title, metric in CARDS:
    card(name, eyebrow, title, metric)
