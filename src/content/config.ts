import { defineCollection, z } from 'astro:content';

// ── Colección: Categorías ──────────────────────────────────────────────────
const categoriasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    mostrar: z.boolean().default(true),
    orden: z.number().int().default(1),
  }),
});

// ── Colección: Productos ───────────────────────────────────────────────────
const productosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    artista: z.string(),
    precio: z.number(),
    categoria: z.string(),
    image: z.string(),
    activo: z.boolean().default(true),
    destacado: z.boolean().default(false),
    stock: z.enum(['Disponible', 'Agotado', 'Último']).default('Disponible'),
  }),
});

export const collections = {
  categorias: categoriasCollection,
  productos: productosCollection,
};
