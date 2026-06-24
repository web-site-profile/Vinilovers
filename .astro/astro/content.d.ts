declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"categorias": {
"disco.md": {
	id: "disco.md";
  slug: "disco";
  body: string;
  collection: "categorias";
  data: InferEntrySchema<"categorias">
} & { render(): Render[".md"] };
"tocadiscos.md": {
	id: "tocadiscos.md";
  slug: "tocadiscos";
  body: string;
  collection: "categorias";
  data: InferEntrySchema<"categorias">
} & { render(): Render[".md"] };
};
"productos": {
"dv00001.md": {
	id: "dv00001.md";
  slug: "dv00001";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00002.md": {
	id: "dv00002.md";
  slug: "dv00002";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00003.md": {
	id: "dv00003.md";
  slug: "dv00003";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00004.md": {
	id: "dv00004.md";
  slug: "dv00004";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00005.md": {
	id: "dv00005.md";
  slug: "dv00005";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00006.md": {
	id: "dv00006.md";
  slug: "dv00006";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00007.md": {
	id: "dv00007.md";
  slug: "dv00007";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00008.md": {
	id: "dv00008.md";
  slug: "dv00008";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00009.md": {
	id: "dv00009.md";
  slug: "dv00009";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00010.md": {
	id: "dv00010.md";
  slug: "dv00010";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00011.md": {
	id: "dv00011.md";
  slug: "dv00011";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00012.md": {
	id: "dv00012.md";
  slug: "dv00012";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00013.md": {
	id: "dv00013.md";
  slug: "dv00013";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00014.md": {
	id: "dv00014.md";
  slug: "dv00014";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00015.md": {
	id: "dv00015.md";
  slug: "dv00015";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00016.md": {
	id: "dv00016.md";
  slug: "dv00016";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00017.md": {
	id: "dv00017.md";
  slug: "dv00017";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00018.md": {
	id: "dv00018.md";
  slug: "dv00018";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00019.md": {
	id: "dv00019.md";
  slug: "dv00019";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00020.md": {
	id: "dv00020.md";
  slug: "dv00020";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00021.md": {
	id: "dv00021.md";
  slug: "dv00021";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00022.md": {
	id: "dv00022.md";
  slug: "dv00022";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00023.md": {
	id: "dv00023.md";
  slug: "dv00023";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00024.md": {
	id: "dv00024.md";
  slug: "dv00024";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00025.md": {
	id: "dv00025.md";
  slug: "dv00025";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00026.md": {
	id: "dv00026.md";
  slug: "dv00026";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00027.md": {
	id: "dv00027.md";
  slug: "dv00027";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00028.md": {
	id: "dv00028.md";
  slug: "dv00028";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00029.md": {
	id: "dv00029.md";
  slug: "dv00029";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00030.md": {
	id: "dv00030.md";
  slug: "dv00030";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00031.md": {
	id: "dv00031.md";
  slug: "dv00031";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00032.md": {
	id: "dv00032.md";
  slug: "dv00032";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00033.md": {
	id: "dv00033.md";
  slug: "dv00033";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00034.md": {
	id: "dv00034.md";
  slug: "dv00034";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00035.md": {
	id: "dv00035.md";
  slug: "dv00035";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00036.md": {
	id: "dv00036.md";
  slug: "dv00036";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00037.md": {
	id: "dv00037.md";
  slug: "dv00037";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00038.md": {
	id: "dv00038.md";
  slug: "dv00038";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00039.md": {
	id: "dv00039.md";
  slug: "dv00039";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00040.md": {
	id: "dv00040.md";
  slug: "dv00040";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00041.md": {
	id: "dv00041.md";
  slug: "dv00041";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00042.md": {
	id: "dv00042.md";
  slug: "dv00042";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00043.md": {
	id: "dv00043.md";
  slug: "dv00043";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"dv00045.md": {
	id: "dv00045.md";
  slug: "dv00045";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"td00002.md": {
	id: "td00002.md";
  slug: "td00002";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"td00003.md": {
	id: "td00003.md";
  slug: "td00003";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"td00004.md": {
	id: "td00004.md";
  slug: "td00004";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
"td00005.md": {
	id: "td00005.md";
  slug: "td00005";
  body: string;
  collection: "productos";
  data: InferEntrySchema<"productos">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
