interface ShippingInterface {
  logistic_type?: string;
  mode?: string;
  store_pick_up?: boolean;
  free_shipping?: boolean;
  tags?: string[];
  promise?: string | null;
}

export interface ProductsInterface {
  id?: string;
  title?: string;
  condition?: string;
  thumbnail_id?: string;
  catalog_product_id?: string;
  listing_type_id?: string;
  permalink?: string;
  buying_mode?: string;
  site_id?: string;
  category_id?: string;
  domain_id?: string;
  thumbnail?: string;
  currency_id?: string;
  price?: number;
  original_price?: number | null;
  sale_price?: number | null;
  sold_quantity?: number;
  available_quantity?: number;
  official_store_id?: string | null;
  use_thumbnail_id?: boolean;
  accepts_mercadopago?: boolean;
  tags?: string[];
  shipping?: ShippingInterface;
  stop_time?: string;
  seller?: any;
  seller_address?: any;
  address?: any;
  attributes?: any[];
  prices?: any;
  installments?: any;
  winner_item_id?: string | null;
  catalog_listing?: boolean;
  discounts?: string | null;
  promotions?: string | null;
  inventory_id?: string | null;
}

export interface OrdersInterface {
  id?: number;
  userId?: string;
  productId?: string;
  quantity?: number;
}

interface PathFromRootInterface {
  id?: string;
  name?: string;
}

interface SettingsInterface {
  adult_content?: boolean;
  buying_allowed?: boolean;
  buying_modes?: string[];
  catalog_domain?: string;
  coverage_areas?: string;
  currencies?: string[];
  fragile?: boolean;
  immediate_payment?: string;
  item_conditions?: string[];
  items_reviews_allowed?: boolean;
  listing_allowed?: boolean;
  max_description_length?: number;
  max_pictures_per_item?: number;
  max_pictures_per_item_var?: number;
  max_sub_title_length?: number;
  max_title_length?: number;
  max_variations_allowed?: number;
  maximum_price?: number;
  maximum_price_currency?: string;
  minimum_price?: number;
  minimum_price_currency?: string;
  mirror_category?: string;
  mirror_master_category?: string;
  mirror_slave_categories?: string[];
  price?: string;
  reservation_allowed?: string;
  restrictions?: string[];
  rounded_address?: boolean;
  seller_contact?: string;
  shipping_modes?: string[];
  shipping_options?: string[];
  shipping_profile?: string;
  show_contact_information?: boolean;
  simple_shipping?: string;
  stock?: string;
  sub_vertical?: string;
  subscribable?: boolean;
  tags?: string[];
  vertical?: string;
  vip_subdomain?: string;
  buyer_protection_programs?: string[];
  status?: string;
  real_estate_agency_contact?: string;
  real_estate_agency?: string;
}

interface ChannelsInterface {
  channel?: string;
  settings?: SettingsInterface;
}

export interface CategoriesInterface {
  id: string;
  name?: string;
  picture?: string;
  total_items_in_this_category?: number;
  permalink?: string;
  path_from_root?: PathFromRootInterface[];
  children_categories?: CategoriesInterface[];
  attribute_types?: string;
  settings?: SettingsInterface;
  channels_settings?: ChannelsInterface[];
  meta_categ_id?: string;
  attributes?: boolean;
  date_created?: string;
}
