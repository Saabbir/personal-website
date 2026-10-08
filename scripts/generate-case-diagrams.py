#!/usr/bin/env python3
"""
Abstract case-study diagrams.

Replaces live-store screenshots with wireframes so the write-ups can show
the change without identifying a client. Re-run after changing a diagram:

    python3 scripts/generate-case-diagrams.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / "public" / "images" / "work"
FONT = "/System/Library/Fonts/HelveticaNeue.ttc"

BG = (10, 15, 29)
SURFACE = (18, 25, 44)
CARD = (30, 41, 59)
LINE = (51, 65, 85)
DIM = (148, 163, 184)
MUTED = (100, 116, 139)
WHITE = (241, 245, 249)
ACCENT = (0, 229, 153)
ACCENT_DIM = (6, 78, 59)


def font(size, bold=False):
    return ImageFont.truetype(FONT, size, index=1 if bold else 0)


def canvas(w, h):
    img = Image.new("RGB", (w, h), BG)
    return img, ImageDraw.Draw(img)


def rr(draw, box, r, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)


def save(img, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    print("wrote", path.relative_to(ROOT), img.size)


def save_jpg(img, path, quality=86):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(path, "JPEG", quality=quality, optimize=True)
    print("wrote", path.relative_to(ROOT), img.size)


def caption(draw, w, h, text="Diagram · not a live screenshot"):
    f = font(18)
    draw.text((28, h - 36), text, font=f, fill=MUTED)
    draw.text((w - 28 - draw.textlength("saabbir.com", font=f), h - 36), "saabbir.com", font=f, fill=MUTED)


def hanger(draw, cx, cy, scale=1.0, color=DIM):
    s = scale
    stroke = max(3, int(4.5 * s))
    hook_r = 16 * s
    hook_cy = cy - 72 * s
    # Top of the hook, 9 o'clock to 3 o'clock clockwise through 12.
    draw.arc(
        [cx - hook_r, hook_cy - hook_r, cx + hook_r, hook_cy + hook_r],
        start=180,
        end=360,
        fill=color,
        width=stroke,
    )
    apex_y = cy - 40 * s
    draw.line([(cx, hook_cy), (cx, apex_y)], fill=color, width=stroke)
    left = (cx - 92 * s, cy + 42 * s)
    right = (cx + 92 * s, cy + 42 * s)
    draw.line([(cx, apex_y), left], fill=color, width=stroke)
    draw.line([(cx, apex_y), right], fill=color, width=stroke)
    draw.line([left, right], fill=color, width=stroke)


def person(draw, cx, cy, scale=1.0, color=ACCENT):
    s = scale
    hr = 18 * s
    head_top = cy - hr * 3.4
    draw.ellipse([cx - hr, head_top, cx + hr, head_top + hr * 2], fill=color)
    y0 = head_top + hr * 2.05
    jacket = [
        (cx - 14 * s, y0),
        (cx - 48 * s, y0 + 22 * s),
        (cx - 42 * s, y0 + 108 * s),
        (cx + 42 * s, y0 + 108 * s),
        (cx + 48 * s, y0 + 22 * s),
        (cx + 14 * s, y0),
    ]
    draw.polygon(jacket, fill=color)
    draw.line([(cx, y0 + 8 * s), (cx, y0 + 108 * s)], fill=BG, width=max(2, int(3 * s)))


def product_card(draw, x, y, w, h, kind):
    rr(draw, [x, y, x + w, y + h], 18, fill=CARD, outline=LINE, width=2)
    img_h = int(h * 0.62)
    rr(draw, [x + 14, y + 14, x + w - 14, y + img_h], 12, fill=SURFACE)
    cx = x + w / 2
    cy = y + img_h * 0.52
    if kind == "hanger":
        hanger(draw, cx, cy, scale=w / 280)
    else:
        person(draw, cx, cy + 8, scale=w / 300)
    bar_y = y + img_h + 28
    rr(draw, [x + 22, bar_y, x + w - 70, bar_y + 14], 7, fill=LINE)
    rr(draw, [x + 22, bar_y + 28, x + w * 0.45, bar_y + 40], 6, fill=LINE)


def listing_page(kind, winner=False):
    w, h = 1200, 880
    img, d = canvas(w, h)
    pad = 48
    rr(d, [pad, pad, w - pad, h - 64], 28, fill=SURFACE, outline=LINE, width=2)
    # window dots
    for i, color in enumerate([(248, 113, 113), (250, 204, 21), (52, 211, 153)]):
        d.ellipse([pad + 28 + i * 22, pad + 22, pad + 40 + i * 22, pad + 34], fill=color)
    # header
    rr(d, [pad + 28, pad + 56, w - pad - 28, pad + 116], 12, fill=CARD)
    rr(d, [pad + 48, pad + 78, pad + 180, pad + 94], 6, fill=ACCENT if winner else DIM)
    rr(d, [w - pad - 220, pad + 74, w - pad - 48, pad + 98], 10, fill=LINE)
    # two product tiles
    gap = 28
    grid_x = pad + 36
    grid_y = pad + 148
    grid_w = w - pad * 2 - 72
    card_w = (grid_w - gap) / 2
    card_h = 560
    product_card(d, grid_x, grid_y, card_w, card_h, kind)
    product_card(d, grid_x + card_w + gap, grid_y, card_w, card_h, kind)
    caption(d, w, h)
    return img


def homepage_wire(draw, x, y, w, h, carousel=False, highlight=False):
    rr(draw, [x, y, x + w, y + h], 22, fill=SURFACE, outline=ACCENT if highlight else LINE, width=3 if highlight else 2)
    # chrome
    for i, color in enumerate([(248, 113, 113), (250, 204, 21), (52, 211, 153)]):
        draw.ellipse([x + 18 + i * 16, y + 16, x + 28 + i * 16, y + 26], fill=color)
    # nav
    rr(draw, [x + 16, y + 40, x + w - 16, y + 78], 8, fill=CARD)
    rr(draw, [x + 28, y + 52, x + 110, y + 66], 5, fill=DIM)
    # hero
    hero_b = y + 92
    hero_h = 150 if carousel else 210
    rr(draw, [x + 16, hero_b, x + w - 16, hero_b + hero_h], 12, fill=CARD)
    rr(draw, [x + 36, hero_b + 48, x + w * 0.55, hero_b + 64], 6, fill=LINE)
    rr(draw, [x + 36, hero_b + 78, x + w * 0.4, hero_b + 92], 6, fill=LINE)
    y_cursor = hero_b + hero_h + 16
    if carousel:
        rr(draw, [x + 16, y_cursor, x + w - 16, y_cursor + 150], 12, fill=ACCENT_DIM, outline=ACCENT, width=2)
        tiles = 4
        tw = (w - 64 - 18) / tiles
        for i in range(tiles):
            tx = x + 28 + i * (tw + 6)
            rr(draw, [tx, y_cursor + 16, tx + tw, y_cursor + 108], 8, fill=CARD)
            rr(draw, [tx + 10, y_cursor + 118, tx + tw - 10, y_cursor + 130], 4, fill=ACCENT)
        y_cursor += 166
    # content blocks
    for i in range(2):
        bh = 70
        if y_cursor + bh > y + h - 18:
            break
        rr(draw, [x + 16, y_cursor, x + w - 16, y_cursor + bh], 10, fill=CARD)
        rr(draw, [x + 32, y_cursor + 22, x + w * 0.5, y_cursor + 36], 5, fill=LINE)
        rr(draw, [x + 32, y_cursor + 44, x + w * 0.35, y_cursor + 54], 4, fill=LINE)
        y_cursor += bh + 12


def phone_frame(draw, x, y, w, h, fill_level, accent=False):
    """fill_level 0 blank, 1 header, 2 hero placeholder, 3 complete."""
    rr(draw, [x, y, x + w, y + h], 18, fill=SURFACE, outline=ACCENT if accent else LINE, width=3 if accent else 2)
    if fill_level < 1:
        return
    rr(draw, [x + 8, y + 10, x + w - 8, y + 28], 6, fill=CARD)
    if fill_level < 2:
        return
    hero_fill = ACCENT_DIM if fill_level >= 3 else CARD
    rr(draw, [x + 8, y + 36, x + w - 8, y + h * 0.58], 8, fill=hero_fill)
    if fill_level < 3:
        return
    rr(draw, [x + 16, y + h * 0.28, x + w * 0.7, y + h * 0.34], 4, fill=ACCENT)
    rr(draw, [x + 8, y + h * 0.62, x + w - 8, y + h * 0.78], 8, fill=CARD)
    rr(draw, [x + 8, y + h * 0.82, x + w - 8, y + h - 10], 8, fill=CARD)


def pdp_frame(draw, x, y, w, h, fill_level, accent=False):
    rr(draw, [x, y, x + w, y + h], 16, fill=SURFACE, outline=ACCENT if accent else LINE, width=3 if accent else 2)
    if fill_level < 1:
        return
    # gallery
    rr(draw, [x + 8, y + 10, x + w * 0.48, y + h - 10], 8, fill=CARD if fill_level < 3 else ACCENT_DIM)
    if fill_level < 2:
        return
    rr(draw, [x + w * 0.52, y + 14, x + w - 10, y + 28], 4, fill=LINE)
    rr(draw, [x + w * 0.52, y + 38, x + w * 0.82, y + 50], 4, fill=LINE)
    if fill_level < 3:
        return
    rr(draw, [x + w * 0.52, y + 64, x + w - 10, y + 92], 8, fill=ACCENT)
    rr(draw, [x + w * 0.52, y + 106, x + w - 10, y + h - 12], 8, fill=CARD)


def filmstrip_row(draw, y, times, levels, lcp_index=None, canvas_w=1600, fw=118, fh=168):
    n = len(times)
    gap = 16
    total = n * fw + (n - 1) * gap
    x = max(40, (canvas_w - total) // 2)
    for i, (t, level) in enumerate(zip(times, levels)):
        fx = x + i * (fw + gap)
        accent = lcp_index is not None and i == lcp_index
        phone_frame(draw, fx, y, fw, fh, level, accent=accent)
        label = font(16, bold=True)
        tw = draw.textlength(t, font=label)
        color = ACCENT if accent else DIM
        draw.text((fx + (fw - tw) / 2, y + fh + 10), t, font=label, fill=color)


def bar_pair(draw, x, y, w, before, after, before_label, after_label, title):
    draw.text((x, y), title, font=font(28, bold=True), fill=WHITE)
    y += 52
    max_v = max(before, after, 0.01)
    for value, label, color in (
        (before, before_label, DIM),
        (after, after_label, ACCENT),
    ):
        draw.text((x, y), label, font=font(18), fill=color)
        y += 28
        rr(draw, [x, y, x + w, y + 28], 8, fill=CARD)
        fill_w = max(12, int(w * (value / max_v)))
        rr(draw, [x, y, x + fill_w, y + 28], 8, fill=color)
        y += 52


def suiting():
    folder = WORK / "suiting-model-vs-product"
    save(listing_page("hanger"), folder / "control.png")
    save(listing_page("person", winner=True), folder / "variation.png")
    # thumbnail: hanger vs person
    w, h = 414, 310
    img, d = canvas(w, h)
    product_card(d, 24, 36, 170, 230, "hanger")
    product_card(d, 220, 36, 170, 230, "person")
    d.text((24, 12), "Hanger", font=font(16, bold=True), fill=DIM)
    d.text((220, 12), "Model", font=font(16, bold=True), fill=ACCENT)
    save_jpg(img, folder / "thumbnail.jpg")


def homepage_perf():
    folder = WORK / "fashion-homepage-performance"
    times = ["1.0s", "1.5s", "2.0s", "2.2s", "2.5s", "3.0s"]

    # Mobile LCP comparison
    w, h = 1600, 700
    img, d = canvas(w, h)
    d.text((48, 36), "Phone · largest paint", font=font(32, bold=True), fill=WHITE)
    d.text((48, 92), "Before", font=font(22, bold=True), fill=DIM)
    filmstrip_row(d, 128, times, [0, 0, 1, 1, 1, 3], lcp_index=5, canvas_w=w)
    d.text((48, 360), "After", font=font(22, bold=True), fill=ACCENT)
    filmstrip_row(d, 396, times, [0, 1, 1, 3, 3, 3], lcp_index=3, canvas_w=w)
    caption(d, w, h)
    save(img, folder / "mobile-lcp.png")

    # Desktop LCP
    w, h = 1400, 520
    img, d = canvas(w, h)
    bar_pair(d, 64, 56, 1100, 3.2, 2.8, "Before  3.2s", "After  2.8s", "Computer · largest paint")
    d.text((64, 320), "12.5% faster. Still 0.3s over Google's 2.5s mark.", font=font(22), fill=DIM)
    caption(d, w, h)
    save(img, folder / "desktop-lcp.png")

    # CLS
    w, h = 1200, 420
    img, d = canvas(w, h)
    bar_pair(d, 64, 48, 900, 0.003, 0.0002, "Before  0.003", "After  0", "Phone · layout shift")
    caption(d, w, h)
    save(img, folder / "cls.png")

    # Scripts on / blocked — completeness filmstrips
    def scripts(path, title, levels, lcp):
        ww, hh = 1600, 560
        im, dd = canvas(ww, hh)
        dd.text((48, 36), title, font=font(32, bold=True), fill=WHITE)
        filmstrip_row(dd, 110, times, levels, lcp_index=lcp, canvas_w=ww)
        caption(dd, ww, hh)
        save(im, path)

    scripts(folder / "scripts-before.png", "Third-party scripts on", [0, 1, 1, 2, 2, 3], 5)
    scripts(folder / "scripts-after.png", "Those scripts blocked", [0, 1, 2, 3, 3, 3], 3)

    tw, th = 414, 310
    thumb, td = canvas(tw, th)
    td.text((24, 22), "Phone LCP", font=font(20, bold=True), fill=DIM)
    td.text((24, 58), "3.0s", font=font(48, bold=True), fill=DIM)
    td.text((24, 130), "2.2s", font=font(64, bold=True), fill=ACCENT)
    td.text((24, 210), "Hero on screen 27% sooner", font=font(18), fill=WHITE)
    save_jpg(thumb, folder / "thumbnail.jpg")


def pdp_perf():
    folder = WORK / "fashion-pdp-performance"
    times_m = ["2.0s", "3.0s", "4.0s", "5.0s", "6.5s", "8.0s"]
    times_d = ["1.2s", "1.6s", "4.1s", "6.0s", "8.0s", "9.0s"]

    def strip(path, title, times, levels, lcp, frame_fn=pdp_frame):
        w, h = 1440, 520
        img, d = canvas(w, h)
        d.text((40, 28), title, font=font(28, bold=True), fill=WHITE)
        n = len(times)
        gap = 16
        fw = 200
        fh = 320
        y = 88
        total = n * fw + (n - 1) * gap
        x0 = max(40, (w - total) // 2)
        for i, (t, level) in enumerate(zip(times, levels)):
            fx = x0 + i * (fw + gap)
            accent = i == lcp
            frame_fn(d, fx, y, fw, fh, level, accent=accent)
            label = font(16, bold=True)
            tw = d.textlength(t, font=label)
            d.text((fx + (fw - tw) / 2, y + fh + 12), t, font=label, fill=ACCENT if accent else DIM)
        caption(d, w, h)
        save(img, path)

    strip(folder / "mobile-before.png", "Phone · before", times_m, [0, 1, 2, 2, 2, 3], 5)
    strip(folder / "mobile-after.png", "Phone · after", times_m, [0, 1, 2, 3, 3, 3], 3)
    strip(folder / "desktop-before.png", "Computer · before", times_d, [1, 2, 2, 2, 2, 3], 2)
    strip(folder / "desktop-after.png", "Computer · after", times_d, [2, 2, 2, 3, 3, 3], 0)

    def complete(path, title, before_done, after_done):
        w, h = 1440, 640
        img, d = canvas(w, h)
        d.text((40, 28), title, font=font(28, bold=True), fill=WHITE)
        d.text((40, 88), "Before", font=font(20, bold=True), fill=DIM)
        filmstrip_row(d, 124, before_done[0], before_done[1], canvas_w=w)
        d.text((40, 340), "After", font=font(20, bold=True), fill=ACCENT)
        filmstrip_row(d, 376, after_done[0], after_done[1], canvas_w=w)
        caption(d, w, h)
        save(img, path)

    complete(
        folder / "mobile-complete.png",
        "Phone · when the screen looks finished",
        (["6.0s", "7.5s", "9.0s", "9.5s"], [2, 2, 3, 3]),
        (["6.0s", "7.5s", "9.0s", "9.5s"], [2, 3, 3, 3]),
    )
    complete(
        folder / "desktop-complete.png",
        "Computer · when the screen looks finished",
        (["8s", "9s", "11s", "13s"], [2, 2, 2, 3]),
        (["8s", "9s", "11s", "13s"], [2, 3, 3, 3]),
    )

    tw, th = 414, 310
    thumb, td = canvas(tw, th)
    td.text((24, 22), "Phone Speed Index", font=font(18, bold=True), fill=DIM)
    td.text((24, 58), "8.0s", font=font(48, bold=True), fill=DIM)
    td.text((24, 130), "6.6s", font=font(64, bold=True), fill=ACCENT)
    td.text((24, 210), "Finished screen 17% sooner", font=font(18), fill=WHITE)
    save_jpg(thumb, folder / "thumbnail.jpg")


def carousel():
    folder = WORK / "homepage-bestsellers-carousel"
    w, h = 1400, 920
    img, d = canvas(w, h)
    homepage_wire(d, 80, 56, 1240, 800, carousel=False)
    caption(d, w, h)
    save(img, folder / "Control.png")

    img, d = canvas(w, h)
    homepage_wire(d, 80, 56, 1240, 800, carousel=True, highlight=True)
    caption(d, w, h)
    save(img, folder / "Variation.png")

    tw, th = 414, 310
    thumb, td = canvas(tw, th)
    homepage_wire(td, 18, 18, 378, 274, carousel=True, highlight=True)
    save_jpg(thumb, folder / "thumbnail.jpg")
    save_jpg(thumb, folder / "cover.jpg")


if __name__ == "__main__":
    suiting()
    homepage_perf()
    pdp_perf()
    carousel()
