"""
Script to update all TD and DV products based on the PDF price list.
- Updates existing product files (prices, names, artists, stock, images)
- Creates new product files for products not yet in the system
- Creates a placeholder yellow image for products without images
"""

import os
from PIL import Image

BASE_DIR = r"d:\Webs\Vinylovers"
PRODUCTS_DIR = os.path.join(BASE_DIR, "src", "content", "productos")
IMAGES_DIR = os.path.join(BASE_DIR, "public", "images", "uploads")
PLACEHOLDER = "/images/uploads/placeholder-amarillo.webp"

# ── Step 1: Create placeholder yellow image ─────────────────────────────────
def create_placeholder():
    img = Image.new('RGB', (800, 800), (255, 224, 58))  # amarillo pollito
    path = os.path.join(IMAGES_DIR, "placeholder-amarillo.webp")
    img.save(path, 'WEBP', quality=90)
    print(f"✅ Placeholder created: {path}")

# ── Step 2: Helper to write a product .md file ──────────────────────────────
def write_product(filename, title, artista, precio, categoria, image, activo=True, destacado=False, stock="Disponible"):
    # Format precio: remove trailing .0 for whole numbers
    if precio == int(precio):
        precio_str = str(int(precio))
    else:
        precio_str = str(precio)
    
    content = f"""---
title: "{title}"
artista: "{artista}"
precio: {precio_str}
categoria: "{categoria}"
image: "{image}"
activo: {str(activo).lower()}
destacado: {str(destacado).lower()}
stock: "{stock}"
---

"""
    filepath = os.path.join(PRODUCTS_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    return filepath

# ── Step 3: Check if image exists ───────────────────────────────────────────
def image_exists(image_filename):
    return os.path.exists(os.path.join(IMAGES_DIR, image_filename))

def get_image_or_placeholder(image_filename):
    if image_exists(image_filename):
        return f"/images/uploads/{image_filename}"
    return PLACEHOLDER

# ── Step 4: Update existing DV products ─────────────────────────────────────
def update_existing_dv():
    updates = []
    
    # DV00002: Changed from Cape Dory Tennis to Billie Eilish
    updates.append(write_product("dv00002.md",
        "VINIL BILLIE EILISH HIT ME HART AND SOFT", "BILLIE EILISH",
        105, "DISCO", PLACEHOLDER))
    
    # DV00006: Stock → Agotado (price same 85.1)
    updates.append(write_product("dv00006.md",
        "VINIL SHAKIRA DONDE ESTAN LOS LADRONES", "SHAKIRA",
        85.1, "DISCO",
        "/images/uploads/DV00006 - DISCO VINIL SHAKIRA DONDE ESTAN LOS LADRONES.webp",
        stock="Agotado"))
    
    # DV00007: Stock → Agotado (price same 85.1)
    updates.append(write_product("dv00007.md",
        "VINIL SHAKIRA PIES DESCALZOS", "SHAKIRA",
        85.1, "DISCO",
        "/images/uploads/DV00007 - DISCO VINIL SHAKIRA PIES DESCALZOS.jpg",
        stock="Agotado"))
    
    # DV00010: Stock → Agotado (price same 140)
    updates.append(write_product("dv00010.md",
        "VINIL BACKSTREETBOYS MILLENIUM", "BACKSTREETBOYS",
        140, "DISCO",
        "/images/uploads/DV00010 - DISCO VINIL BACKSTREETBOYS MILLENIUM.jpg",
        stock="Agotado"))
    
    # DV00011: Price 92 → 100
    updates.append(write_product("dv00011.md",
        "VINIL GUSTAVO CERATI BOCANADA", "GUSTAVO CERATI",
        100, "DISCO",
        "/images/uploads/DV00011 DISCO VINIL GUSTAVO CERATI BOCANADA.jpg"))
    
    # DV00012: Price 94.3 → 95, Stock → Agotado
    updates.append(write_product("dv00012.md",
        "VINIL SODA STEREO CANCION ANIMAL", "SODA STEREO",
        95, "DISCO",
        "/images/uploads/DV00012 - DISCO VINIL SODA STEREO CANCION ANIMAL.jpg",
        stock="Agotado"))
    
    # DV00015: Price 105.8 → 106, Stock → Agotado
    updates.append(write_product("dv00015.md",
        "VINIL SODA EN VIVO RUIDO BLANCO", "SODA STEREO",
        106, "DISCO",
        "/images/uploads/DV00015 DISCO VINIL SODA EN VIVO RUIDO BLANCO.jpg",
        stock="Agotado"))
    
    # DV00016: Price 80.5 → 85, Artist fix "LUIS MIGUE" → "LUIS MIGUEL"
    updates.append(write_product("dv00016.md",
        "VINIL LUIS MIGUEL ROMANCE", "LUIS MIGUEL",
        85, "DISCO",
        "/images/uploads/DV00016 - DISCO VINIL LUIS MIGUEL ROMANCE.jpg"))
    
    # DV00021: Price 112.7 → 140
    updates.append(write_product("dv00021.md",
        "VINIL QUEEN GREATEST HITS", "QUEEN",
        140, "DISCO",
        "/images/uploads/DV00021 DISCO VINIL QUEEN GREATEST HITS.jpg"))
    
    # DV00023: Stock → Agotado (price same 75.9)
    updates.append(write_product("dv00023.md",
        "VINIL KAROL G TROPICOQUETA", "KAROL G",
        75.9, "DISCO",
        "/images/uploads/DV00023 - DISCO VINIL KAROL G TROPICOQUETA.jpg",
        stock="Agotado"))
    
    # DV00026: Price 92 → 95
    updates.append(write_product("dv00026.md",
        "VINIL MAROON 5", "MAROON 5",
        95, "DISCO",
        "/images/uploads/DV00026 - DISCO VINIL MAROON 5.jpg"))
    
    # DV00028: Price 69 → 110
    updates.append(write_product("dv00028.md",
        "VINIL MICHAEL JACKSON THRILLER", "MICHAEL JACKSON",
        110, "DISCO",
        "/images/uploads/DV00028 - DISCO VINIL MICHAEL JACKSON THRILLER.jpg"))
    
    # DV00030: Price 89.7 → 105, Artist fix "HE BEATLES" → "THE BEATLES"
    updates.append(write_product("dv00030.md",
        "VINIL THE BEATLES ABBY ROAD", "THE BEATLES",
        105, "DISCO",
        "/images/uploads/DV00030 - DISCO VINIL THE BEATLES ABBY ROAD.jpg"))
    
    # DV00032: Changed from Bad Bunny DTMF to Bad Bunny Oasis, price 103.5 → 95
    updates.append(write_product("dv00032.md",
        "VINIL BAD BUNNY OASIS", "BAD BUNNY",
        95, "DISCO", PLACEHOLDER))
    
    # DV00034: Stock → Agotado (price same 80.5)
    updates.append(write_product("dv00034.md",
        "VINIL RED HOT CHILI PEPPERS CALIFORNICATION", "RED HOT CHILI PEPPERS",
        80.5, "DISCO",
        "/images/uploads/DV00034 - DISCO VINIL RED HOT CHILI PEPPERS CALIFORNICATION.jpg",
        stock="Agotado"))
    
    # DV00038: Stock → Agotado (price same 92)
    updates.append(write_product("dv00038.md",
        "VINIL METALLICA DISCO NEGRO", "METALLICA",
        92, "DISCO",
        "/images/uploads/DV00038 - DISCO VINIL METALLICA DISCO NEGRO.jpg",
        stock="Agotado"))
    
    # DV00043: Changed from Shakira LMN to Fijacion Oral, price 96.6 → 105
    updates.append(write_product("dv00043.md",
        "VINIL SHAKIRA FIJACION ORAL", "SHAKIRA",
        105, "DISCO", PLACEHOLDER))
    
    # DV00045: Changed from MJ Bad to Linkin Park, price 69 → 85, Stock → Agotado
    updates.append(write_product("dv00045.md",
        "VINIL LINKIN PARK HIBRYD THEORY", "LINKIN PARK",
        85, "DISCO", PLACEHOLDER,
        stock="Agotado"))
    
    print(f"✅ Updated {len(updates)} existing DV products")
    return updates

# ── Step 5: Update existing TD products ─────────────────────────────────────
def update_existing_td():
    updates = []
    
    # TD00003: Name changed from "VITROLA LILA" to "VITROLA TURQUESA", has real image
    updates.append(write_product("td00003.md",
        "VITROLA TURQUESA", "VITROLA",
        280, "TOCADISCOS",
        "/images/uploads/TD00003 - TOCADISCOS VITROLA TURQUESA.jpeg"))
    
    # TD00004: Name changed from "TANLANIN NEGRO" to "VICTROLA NEGRA", has real image
    updates.append(write_product("td00004.md",
        "VICTROLA NEGRA", "VICTROLA",
        280, "TOCADISCOS",
        "/images/uploads/TD00004 - TOCADISCOS VICTROLA NEGRA.jpeg"))
    
    print(f"✅ Updated {len(updates)} existing TD products")
    return updates

# ── Step 6: Create new DV products ──────────────────────────────────────────
def create_new_dv():
    new_products = [
        ("dv00044.md", "VINIL BACKSTREETBOYS MILLENIUM", "BACKSTREETBOYS", 115, "Disponible"),
        ("dv00046.md", "VINIL METALLICA MASTER OF PUPPETS", "METALLICA", 85, "Disponible"),
        ("dv00048.md", "VINIL MADONA CONFESSIONS ON A DANCE FLOOR", "MADONA", 95, "Disponible"),
        ("dv00049.md", "VINIL HECTOR LAVOE DE TI DEPENDE", "HECTOR LAVOE", 95, "Disponible"),
        ("dv00050.md", "VINIL MALUMA PAPI JUANCHO", "MALUMA", 80, "Disponible"),
        ("dv00051.md", "VINIL VICENTE FERNADEZ PARA SIEMPRE", "VICENTE FERNADEZ", 75, "Disponible"),
        ("dv00052.md", "VINIL KORN FOLLOW THE LEADER", "KORN", 100, "Disponible"),
        ("dv00053.md", "VINIL MICHAEL JACKSON DANGEROUS", "MICHAEL JACKSON", 120, "Disponible"),
        ("dv00054.md", "VINIL MY CHEMICAL ROMANCE", "MY CHEMICAL ROMANCE", 85, "Disponible"),
        ("dv00055.md", "VINIL LUIS MIGUEL ARIES", "LUIS MIGUEL", 110, "Disponible"),
        ("dv00056.md", "VINIL LUIS MIGUEL 20 ANOS", "LUIS MIGUEL", 110, "Disponible"),
        ("dv00057.md", "VINIL THE WEEKEND KISS LAND", "THE WEEKEND", 120, "Disponible"),
        ("dv00058.md", "VINIL MILEY CYRUS SOMETHING BEAUTIFUL", "MILEY CYRUS", 130, "Disponible"),
        ("dv00059.md", "VINIL SABRINA CARPENTER SHORT N SWEET", "SABRINA CARPENTER", 110, "Disponible"),
        ("dv00060.md", "VINIL BOSSA NOVA BRASIL", "BOSSA NOVA", 90, "Disponible"),
        ("dv00061.md", "VINIL MOBY PLAY", "MOBY", 110, "Agotado"),
        ("dv00062.md", "VINIL HARRY STYLE FINE LINE", "HARRY STYLE", 65, "Disponible"),
        ("dv00063.md", "VINIL BEYONCE RENAISSNCE", "BEYONCE", 115, "Disponible"),
        ("dv00064.md", "VINIL LADY GAGA THE FAME", "LADY GAGA", 115, "Disponible"),
        ("dv00065.md", "VINIL J.LO LOVE DONT COST A THING", "J.LO", 110, "Disponible"),
        ("dv00066.md", "VINIL ONE DIRECTION MADE THE IN A.M.", "ONE DIRECTION", 115, "Disponible"),
        ("dv00067.md", "VINIL BTS ARIRANG", "BTS", 155, "Disponible"),
    ]
    
    created = []
    for filename, title, artista, precio, stock in new_products:
        created.append(write_product(filename, title, artista, precio, "DISCO", PLACEHOLDER, stock=stock))
    
    print(f"✅ Created {len(created)} new DV products")
    return created

# ── Step 7: Create new TD products ──────────────────────────────────────────
def create_new_td():
    new_products = [
        ("td00001.md", "TOCADISCOS TE 2030 BROWN", "TE 2030", 280, "Disponible",
         PLACEHOLDER),
        ("td00006.md", "TOCADISCOS VITROLA THE LIBERTY BROWN", "VITROLA", 480, "Disponible",
         PLACEHOLDER),
        ("td00007.md", "TOCADISCOS COTSOCO BROWN", "COTSOCO", 260, "Disponible",
         PLACEHOLDER),
        ("td00008.md", "TOCADISCOS VICTROLA BLANCA", "VICTROLA", 280, "Agotado",
         "/images/uploads/TD00008 - TOCADISCOS VICTROLA BLANCA.jpeg"),
        ("td00009.md", "TOCADISCOS VICTROLA ROJA", "VICTROLA", 280, "Agotado",
         PLACEHOLDER),
        ("td000010.md", "TOCADISCOS VICTROLA HALEY AZUL", "VICTROLA", 380, "Disponible",
         PLACEHOLDER),
        ("td000011.md", "TOCADISCOS VICTROLA EASTWOOD", "VICTROLA", 320, "Disponible",
         PLACEHOLDER),
        ("td000012.md", "TOCADISCOS VICTROLA 6 EN 1", "VICTROLA", 530, "Disponible",
         PLACEHOLDER),
    ]
    
    created = []
    for filename, title, artista, precio, stock, image in new_products:
        created.append(write_product(filename, title, artista, precio, "TOCADISCOS", image, stock=stock))
    
    print(f"✅ Created {len(created)} new TD products")
    return created

# ── Main ────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 60)
    print("UPDATING PRODUCTS FROM PDF PRICE LIST")
    print("=" * 60)
    
    create_placeholder()
    updated_dv = update_existing_dv()
    updated_td = update_existing_td()
    new_dv = create_new_dv()
    new_td = create_new_td()
    
    total = len(updated_dv) + len(updated_td) + len(new_dv) + len(new_td)
    print(f"\n{'=' * 60}")
    print(f"TOTAL: {total} files processed")
    print(f"  - {len(updated_dv)} DV products updated")
    print(f"  - {len(updated_td)} TD products updated")
    print(f"  - {len(new_dv)} DV products created")
    print(f"  - {len(new_td)} TD products created")
    print(f"{'=' * 60}")
