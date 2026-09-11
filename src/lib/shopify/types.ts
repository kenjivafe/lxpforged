/**
 * Types for the subset of the Shopify Storefront API this store uses.
 *
 * Shopify returns paginated relationships as `{ edges: [{ node }] }`. These
 * types model the *raw* shape returned by the API; `reshape*` helpers in
 * `./index.ts` flatten them into the shapes the UI actually renders.
 */

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice: Money | null;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type SEO = {
  title: string | null;
  description: string | null;
};

/** One "Highlights" chip: a product_spec metaobject, flattened. */
export type ProductSpec = {
  id: string;
  title: string;
  description: string;
  icon: ShopifyImage | null;
};

/** A product after `reshapeProduct` has flattened its connections. */
export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  /** Shopify's vendor field; rendered as the eyebrow above each card title. */
  vendor: string;
  productType: string;
  /** Coloured label pill ("SPECIAL ORDER"), from the theme.label metafield. */
  label: string | null;
  labelColor: string | null;
  /** Whether the product carries the custom.special_order flag. */
  specialOrder: boolean;
  /** The "Highlights" chips — brand, model, category — with their icons. */
  specs: ProductSpec[];
  options: ProductOption[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  variants: ProductVariant[];
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  seo: SEO;
  image: ShopifyImage | null;
  updatedAt: string;
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    product: {
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
    };
  };
};

export type Cart = {
  id: string;
  /** Shopify-hosted checkout URL. Payments/tax/shipping stay on Shopify. */
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: CartLine[];
};

/** Raw connection wrapper as returned by the Storefront API. */
export type Connection<T> = {
  edges: Array<{ node: T }>;
};

export type MetafieldValue = { value: string } | null;

/** A metaobject field as the Storefront API returns it. */
export type ShopifyMetaobjectField = {
  key: string;
  value: string | null;
  reference: { image: ShopifyImage | null } | null;
};

export type ShopifyMetaobject = {
  id: string;
  fields: ShopifyMetaobjectField[];
};

export type ShopifyProduct = Omit<
  Product,
  "variants" | "images" | "label" | "labelColor" | "specialOrder" | "specs"
> & {
  variants: Connection<ProductVariant>;
  images: Connection<ShopifyImage>;
  label: MetafieldValue;
  labelColor: MetafieldValue;
  specialOrder: MetafieldValue;
  specs: { references: Connection<ShopifyMetaobject> | null } | null;
};

export type ShopifyCart = Omit<Cart, "lines"> & {
  lines: Connection<CartLine>;
};
