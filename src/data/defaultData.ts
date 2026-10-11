import { Product, Order, Coupon, Giveaway, CustomerUser, DeliveryZone, PaymentConfig, ShopSettings, BotCommand, CustomizationConfig } from '../types';

export const DEFAULT_PRODUCTS: Product[] = [
  // iPhone & Accessories
  {
    id: 'iph-1',
    name: 'iPhone 16 Pro Max 256Gb (Desert Titanium) ဘူးစုံ',
    price: 4600000,
    originalPrice: 4800000,
    category: 'iPHONE & ACCESSORIES',
    inStock: true,
    stockCount: 5,
    image: '/src/assets/images/product_iphone_15_pro_box_1791651995091.jpg',
    description: 'iPhone 16 Pro Max 256Gb CH/A, Battery Health 93% (Desert Titanium) ဘူးစုံ အလုံးသန့်။ Official 1 Year Warranty အာမခံပါဝင်။ (⚠️ လောလောဆယ် အိမ်ရောက်ငွေချေ မရသေးပါ၊ KBZPay/WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်)',
    colors: ['Desert Titanium'],
    storage: ['256GB'],
    specs: {
      Model: 'iPhone 16 Pro Max (CH/A)',
      Storage: '256GB',
      Battery: '93% Battery Health',
      Condition: 'ဘူးစုံ Original 99% Like New',
      Payment: 'KPay / WavePay ငွေလွှဲ (COD မရသေးပါ)'
    },
    createdAt: '2026-10-10'
  },
  {
    id: 'iph-2',
    name: 'iPhone 16 128Gb (White) ဘူးစုံ Warranty 1month Left',
    price: 3300000,
    originalPrice: 3450000,
    category: 'iPHONE & ACCESSORIES',
    inStock: true,
    stockCount: 8,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'iPhone 16 128Gb HN/A, Battery Health 96% (White) ဘူးစုံ Apple Warranty 1 month ကျန်။ (⚠️ လောလောဆယ် အိမ်ရောက်ငွေချေ မရသေးပါ၊ KBZPay/WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်)',
    colors: ['White'],
    storage: ['128GB'],
    specs: {
      Model: 'iPhone 16 (HN/A)',
      Storage: '128GB',
      Battery: '96% Battery Health',
      Warranty: 'Apple Warranty 1 month left',
      Payment: 'KPay / WavePay ငွေလွှဲ (COD မရပါ)'
    },
    createdAt: '2026-10-10'
  },
  {
    id: 'iph-3',
    name: 'iPhone 15 Pro 128Gb (Natural Titanium) ဘူးစုံ',
    price: 3250000,
    originalPrice: 3400000,
    category: 'iPHONE & ACCESSORIES',
    inStock: true,
    stockCount: 6,
    image: '/src/assets/images/product_iphone_15_pro_box_1791651995091.jpg',
    description: 'iPhone 15 Pro 128Gb ZP/A, Battery Health 88% (Natural Titanium) ဘူးစုံ အလုံးသန့်။ (⚠️ လောလောဆယ် အိမ်ရောက်ငွေချေ မရသေးပါ၊ KBZPay/WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်)',
    colors: ['Natural Titanium'],
    storage: ['128GB'],
    specs: {
      Model: 'iPhone 15 Pro (ZP/A)',
      Storage: '128GB',
      Battery: '88% Battery Health',
      Condition: 'ဘူးစုံ Original 99%',
      Payment: 'KPay / WavePay ငွေလွှဲ (COD မရပါ)'
    },
    createdAt: '2026-10-09'
  },
  {
    id: 'iph-4',
    name: 'iPhone 15 Plus 128Gb (Pink) Original အလုံးဘူးစုံ',
    price: 2950000,
    originalPrice: 3100000,
    category: 'iPHONE & ACCESSORIES',
    inStock: true,
    stockCount: 4,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'iPhone 15 Plus 128Gb CH/A, Battery Health 87% (Pink) Original အလုံးဘူးစုံ။ (⚠️ လောလောဆယ် အိမ်ရောက်ငွေချေ မရသေးပါ၊ KBZPay/WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်)',
    colors: ['Pink'],
    storage: ['128GB'],
    specs: {
      Model: 'iPhone 15 Plus (CH/A)',
      Storage: '128GB',
      Battery: '87% Battery Health',
      Payment: 'KPay / WavePay ငွေလွှဲ (COD မရပါ)'
    },
    createdAt: '2026-10-09'
  },
  {
    id: 'iph-5',
    name: 'iPhone 11 Pro 256Gb (Gray) ဘူးစုံ',
    price: 1250000,
    originalPrice: 1350000,
    category: 'iPHONE & ACCESSORIES',
    inStock: true,
    stockCount: 7,
    image: '/src/assets/images/product_iphone_15_pro_box_1791651995091.jpg',
    description: 'iPhone 11 Pro 256Gb KH/A, Battery Health 92% (Space Gray) ဘူးစုံ အလုံးသန့်။ (⚠️ လောလောဆယ် အိမ်ရောက်ငွေချေ မရသေးပါ၊ KBZPay/WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်)',
    colors: ['Space Gray'],
    storage: ['256GB'],
    specs: {
      Model: 'iPhone 11 Pro (KH/A)',
      Battery: '92% Battery Health',
      Storage: '256GB',
      Payment: 'KPay / WavePay ငွေလွှဲ (COD မရပါ)'
    },
    createdAt: '2026-10-08'
  },
  {
    id: 'iph-6',
    name: 'iPhone 11 Pro 64Gb (Green) ဘူးစုံ',
    price: 1050000,
    originalPrice: 1150000,
    category: 'iPHONE & ACCESSORIES',
    inStock: true,
    stockCount: 5,
    image: '/src/assets/images/product_iphone_15_pro_box_1791651995091.jpg',
    description: 'iPhone 11 Pro 64Gb ZP/A, Battery Health 90% (Midnight Green) ဘူးစုံ။ (⚠️ လောလောဆယ် အိမ်ရောက်ငွေချေ မရသေးပါ၊ KBZPay/WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်)',
    colors: ['Midnight Green'],
    storage: ['64GB'],
    specs: {
      Model: 'iPhone 11 Pro (ZP/A)',
      Battery: '90% Battery Health',
      Storage: '64GB',
      Payment: 'KPay / WavePay ငွေလွှဲ (COD မရပါ)'
    },
    createdAt: '2026-10-08'
  },
  {
    id: 'iph-7',
    name: 'iPhone 11 128Gb (Black) ဘူးစုံ',
    price: 950000,
    originalPrice: 1000000,
    category: 'iPHONE & ACCESSORIES',
    inStock: true,
    stockCount: 9,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'iPhone 11 128Gb ZP/A, Battery Health 93% (Black) ဘူးစုံ။ COD အိမ်ရောက်ငွေချေ ရပါသည်!',
    colors: ['Black'],
    storage: ['128GB'],
    specs: {
      Model: 'iPhone 11 (ZP/A)',
      Battery: '93% Battery Health',
      Storage: '128GB'
    },
    createdAt: '2026-10-08'
  },
  {
    id: 'iph-8',
    name: 'iPhone 11 64Gb (Black) ဘူးစုံ',
    price: 850000,
    originalPrice: 900000,
    category: 'iPHONE & ACCESSORIES',
    inStock: true,
    stockCount: 11,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'iPhone 11 64Gb ZD/A, Battery Health 93% (Black) ဘူးစုံ။ COD အိမ်ရောက်ငွေချေ ရပါသည်!',
    colors: ['Black'],
    storage: ['64GB'],
    specs: {
      Model: 'iPhone 11 (ZD/A)',
      Battery: '93% Battery Health',
      Storage: '64GB'
    },
    createdAt: '2026-10-08'
  },

  // Xiaomi & Redmi
  {
    id: 'xio-1',
    name: 'Xiaomi Civi 5 Pro 12/256Gb ဘူးစုံ (White)',
    price: 1595000,
    originalPrice: 1680000,
    category: 'XIAOMI & REDMI',
    inStock: true,
    stockCount: 6,
    image: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg',
    description: 'Xiaomi Civi 5 Pro 12GB RAM / 256GB Storage ဘူးစုံ (White)။ ကင်မရာစပက်အလွန်ကောင်းမွန်ပြီး အိမ်ရောက်ငွေချေ (COD) ရရှိပါသည်။',
    colors: ['White', 'Purple'],
    storage: ['256GB'],
    specs: {
      RAM_ROM: '12GB + 256GB',
      Condition: 'ဘူးစုံ Original'
    },
    createdAt: '2026-10-10'
  },
  {
    id: 'xio-2',
    name: 'Redmi Turbo 5 Max 12/256Gb (Black) Ph Only',
    price: 1550000,
    originalPrice: 1620000,
    category: 'XIAOMI & REDMI',
    inStock: true,
    stockCount: 7,
    image: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg',
    description: 'Redmi Turbo 5 Max 12GB / 256GB Phone Only (Black)။ ဂိမ်းဆော့ရန် အထူးကောင်းမွန်။ COD ရပါသည်!',
    colors: ['Black'],
    storage: ['256GB'],
    specs: {
      RAM_ROM: '12GB / 256GB',
      Condition: 'Phone Only'
    },
    createdAt: '2026-10-10'
  },
  {
    id: 'xio-3',
    name: 'Redmi K 80 Ultra 12/256Gb (White) Ph Only',
    price: 1450000,
    originalPrice: 1550000,
    category: 'XIAOMI & REDMI',
    inStock: true,
    stockCount: 5,
    image: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg',
    description: 'Redmi K80 Ultra 12/256GB White Flagship Performance။ COD အိမ်ရောက်ငွေချေ ရပါသည်!',
    colors: ['White'],
    storage: ['256GB'],
    createdAt: '2026-10-09'
  },
  {
    id: 'xio-4',
    name: 'Redmi Note 15 Pro 8/256Gb Official Global ဘူးစုံ Warranty 1.5yr',
    price: 1150000,
    originalPrice: 1250000,
    category: 'XIAOMI & REDMI',
    inStock: true,
    stockCount: 8,
    image: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg',
    description: 'Redmi Note 15 Pro 8/256Gb Official Global ဘူးစုံ (Black) Warranty 1 year 6 months left! COD ရပါသည်!',
    colors: ['Black'],
    storage: ['256GB'],
    createdAt: '2026-10-09'
  },
  {
    id: 'xio-5',
    name: 'Xiaomi 13 Ultra 16/512Gb ဘူးစုံ (Black)',
    price: 1180000,
    originalPrice: 1300000,
    category: 'XIAOMI & REDMI',
    inStock: true,
    stockCount: 2,
    image: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg',
    description: 'Xiaomi 13 Ultra 16/512Gb ဘူးစုံ LCD Green line ပါ (Black) ဈေးတန်တန်ဖြင့် ရောင်းချပေးပါမည်။ COD ရရှိပါသည်။',
    colors: ['Black'],
    storage: ['512GB'],
    createdAt: '2026-10-08'
  },
  {
    id: 'xio-6',
    name: 'Redmi Note 14 Pro 12/256Gb Ph Only (Black)',
    price: 880000,
    originalPrice: 950000,
    category: 'XIAOMI & REDMI',
    inStock: true,
    stockCount: 10,
    image: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg',
    description: 'Redmi Note 14 Pro 12/256Gb Phone Only (Black)။ COD အိမ်ရောက်ငွေချေ ရရှိပါသည်!',
    colors: ['Black', 'White', 'Green'],
    storage: ['256GB'],
    createdAt: '2026-10-08'
  },
  {
    id: 'xio-7',
    name: 'Redmi Note 15 8/256Gb Phone Only (Black)',
    price: 830000,
    originalPrice: 890000,
    category: 'XIAOMI & REDMI',
    inStock: true,
    stockCount: 12,
    image: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg',
    description: 'Redmi Note 15 8/256Gb Ph Only (Black)။ အိမ်ရောက်ငွေချေ (COD) ရရှိပါသည်။',
    colors: ['Black'],
    storage: ['256GB'],
    createdAt: '2026-10-08'
  },
  {
    id: 'xio-8',
    name: 'Redmi 14C 4/128Gb Box Only',
    price: 450000,
    originalPrice: 490000,
    category: 'XIAOMI & REDMI',
    inStock: true,
    stockCount: 15,
    image: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg',
    description: 'Redmi 14C 4/128Gb ဘူးစုံ အလုံးသန့်။ COD ရပါသည်!',
    colors: ['Black'],
    storage: ['128GB'],
    createdAt: '2026-10-07'
  },
  {
    id: 'xio-9',
    name: 'Redmi 7A 2/32Gb Ph Only (Blue)',
    price: 135000,
    originalPrice: 150000,
    category: 'XIAOMI & REDMI',
    inStock: true,
    stockCount: 5,
    image: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg',
    description: 'Redmi 7A 2/32Gb Ph Only (Blue) ဈေးအထူးချိုသာစွာဖြင့် ရရှိပါပြီ။ COD ရပါသည်!',
    colors: ['Blue'],
    storage: ['32GB'],
    createdAt: '2026-10-07'
  },

  // OPPO
  {
    id: 'opp-1',
    name: 'Oppo Reno 10 8/256Gb Ph Only (Blue)',
    price: 890000,
    originalPrice: 950000,
    category: 'OPPO',
    inStock: true,
    stockCount: 6,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Oppo Reno 10 8/256Gb Phone Only (Ice Blue) ကင်မရာစပက်အလွန်ကောင်း။ COD အိမ်ရောက်ငွေချေ ရပါသည်!',
    colors: ['Ice Blue'],
    storage: ['256GB'],
    createdAt: '2026-10-09'
  },
  {
    id: 'opp-2',
    name: 'Oppo Reno 12F 8/256Gb Ph Only (Black)',
    price: 850000,
    originalPrice: 910000,
    category: 'OPPO',
    inStock: true,
    stockCount: 7,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Oppo Reno 12F 8/256Gb Ph Only (Black)။ COD အိမ်ရောက်ငွေချေ ရပါသည်!',
    colors: ['Black'],
    storage: ['256GB'],
    createdAt: '2026-10-09'
  },
  {
    id: 'opp-3',
    name: 'Oppo A5 Pro 8/256Gb Box Only',
    price: 620000,
    originalPrice: 680000,
    category: 'OPPO',
    inStock: true,
    stockCount: 8,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Oppo A5 Pro 8/256Gb Box Only။ COD အိမ်ရောက်ငွေချေ ရရှိပါသည်။',
    colors: ['Black'],
    storage: ['256GB'],
    createdAt: '2026-10-08'
  },
  {
    id: 'opp-4',
    name: 'Oppo A18 4/64Gb Ph Only (Blue)',
    price: 360000,
    originalPrice: 390000,
    category: 'OPPO',
    inStock: true,
    stockCount: 14,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Oppo A18 4/64Gb Ph Only (Blue)။ COD အိမ်ရောက်ငွေချေ ရပါသည်!',
    colors: ['Blue'],
    storage: ['64GB'],
    createdAt: '2026-10-08'
  },
  {
    id: 'opp-5',
    name: 'Oppo A16 3/32Gb Phone Only (Blue)',
    price: 250000,
    originalPrice: 280000,
    category: 'OPPO',
    inStock: true,
    stockCount: 9,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Oppo A16 3/32Gb Phone Only (Blue)။ COD ရရှိပါသည်။',
    colors: ['Blue'],
    storage: ['32GB'],
    createdAt: '2026-10-07'
  },

  // VIVO
  {
    id: 'viv-1',
    name: 'Vivo Y300 Pro 12/256Gb Ph Only (Blue)',
    price: 880000,
    originalPrice: 940000,
    category: 'VIVO',
    inStock: true,
    stockCount: 6,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Vivo Y300 Pro 12/256Gb Ph Only (Blue) ဘက်ထရီခံအားအထူးကောင်း။ COD ရရှိပါသည်။',
    colors: ['Blue'],
    storage: ['256GB'],
    createdAt: '2026-10-09'
  },
  {
    id: 'viv-2',
    name: 'Vivo S17 12/512Gb Phone Only (Black)',
    price: 850000,
    originalPrice: 920000,
    category: 'VIVO',
    inStock: true,
    stockCount: 5,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Vivo S17 12/512Gb Phone Only (Black) ပုံထွက်အလွန်လှ။ COD ရပါသည်!',
    colors: ['Black'],
    storage: ['512GB'],
    createdAt: '2026-10-08'
  },
  {
    id: 'viv-3',
    name: 'Vivo V29E 8/256Gb Phone Only (Green)',
    price: 690000,
    originalPrice: 750000,
    category: 'VIVO',
    inStock: true,
    stockCount: 7,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Vivo V29E 8/256Gb Phone Only (Green)။ COD ရရှိပါသည်။',
    colors: ['Green'],
    storage: ['256GB'],
    createdAt: '2026-10-08'
  },
  {
    id: 'viv-4',
    name: 'Vivo Y19S 4/128Gb Ph Only (Blue)',
    price: 480000,
    originalPrice: 520000,
    category: 'VIVO',
    inStock: true,
    stockCount: 11,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Vivo Y19S 4/128Gb Ph Only (Blue)။ COD ရပါသည်!',
    colors: ['Blue'],
    storage: ['128GB'],
    createdAt: '2026-10-07'
  },

  // HUAWEI & HONOR
  {
    id: 'hua-1',
    name: 'Honor 200 12/512Gb Ph Only China (Blue)',
    price: 1120000,
    originalPrice: 1200000,
    category: 'HUAWEI & HONOR',
    inStock: true,
    stockCount: 5,
    image: '/src/assets/images/product_iphone_15_pro_box_1791651995091.jpg',
    description: 'Honor 200 12/512Gb Ph Only China (Blue) Portrait Master ကင်မရာ။ COD ရပါသည်!',
    colors: ['Blue'],
    storage: ['512GB'],
    createdAt: '2026-10-09'
  },
  {
    id: 'hua-2',
    name: 'Huawei MatePad 11.5 PaperMatte 8/256Gb Pad Only',
    price: 1050000,
    originalPrice: 1150000,
    category: 'HUAWEI & HONOR',
    inStock: true,
    stockCount: 4,
    image: '/src/assets/images/product_minimalist_mechanical_keyboard_1791651864323.jpg',
    description: 'Huawei MatePad 11.5 PaperMatte Edition 8/256Gb Pad Only (Black) စာဖတ်/ဒီဇိုင်းဆွဲရန် အထူးကောင်း။ COD ရပါသည်!',
    colors: ['Black'],
    storage: ['256GB'],
    createdAt: '2026-10-09'
  },
  {
    id: 'hua-3',
    name: 'Honor Pad V9 8/256Gb ပါကင်ဖောက်စစ်',
    price: 1200000,
    originalPrice: 1280000,
    category: 'HUAWEI & HONOR',
    inStock: true,
    stockCount: 3,
    image: '/src/assets/images/product_minimalist_mechanical_keyboard_1791651864323.jpg',
    description: 'Honor Pad V9 8/256Gb ပါကင်ဖောက်စစ် အလုံးအသစ်အတိုင်း။ COD ရရှိပါသည်။',
    colors: ['Space Grey'],
    storage: ['256GB'],
    createdAt: '2026-10-08'
  },

  // SAMSUNG
  {
    id: 'sam-1',
    name: 'Samsung Z Fold 8 12/512Gb ဘူးစုံ Warranty 1.11yr (Purple)',
    price: 7200000,
    originalPrice: 7500000,
    category: 'SAMSUNG',
    inStock: true,
    stockCount: 2,
    image: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg',
    description: 'Samsung Z Fold 8 12/512Gb ဘူးစုံ (Purple) Warranty 1 year 11 months ကျန်။ Ultra Premium Flagship။ COD အိမ်ရောက်ငွေချေ ရပါသည်!',
    colors: ['Purple'],
    storage: ['512GB'],
    createdAt: '2026-10-10'
  },
  {
    id: 'sam-2',
    name: 'Samsung A06 4/64Gb Ph Only (Blue)',
    price: 350000,
    originalPrice: 380000,
    category: 'SAMSUNG',
    inStock: true,
    stockCount: 15,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Samsung Galaxy A06 4/64Gb Ph Only (Blue)။ COD အိမ်ရောက်ငွေချေ ရပါသည်!',
    colors: ['Blue'],
    storage: ['64GB'],
    createdAt: '2026-10-08'
  },

  // REALME
  {
    id: 'rea-1',
    name: 'Realme Note 60X 3/64Gb Ph Only (Blue) အလင်းပေါက်',
    price: 250000,
    originalPrice: 280000,
    category: 'REALME',
    inStock: true,
    stockCount: 6,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Realme Note 60X 3/64Gb Ph Only (Blue) အလင်းပေါက်။ COD ရရှိပါသည်!',
    colors: ['Blue'],
    storage: ['64GB'],
    createdAt: '2026-10-07'
  },

  // TECNO & INFINIX
  {
    id: 'tec-1',
    name: 'Tecno Camon 40 Pro 8/256Gb Ph Only (Gray)',
    price: 795000,
    originalPrice: 850000,
    category: 'TECNO & INFINIX',
    inStock: true,
    stockCount: 6,
    image: '/src/assets/images/product_iphone_15_pro_box_1791651995091.jpg',
    description: 'Tecno Camon 40 Pro 8/256Gb Ph Only (Gray)။ COD ရရှိပါသည်။',
    colors: ['Gray'],
    storage: ['256GB'],
    createdAt: '2026-10-09'
  },
  {
    id: 'tec-2',
    name: 'Itel S25 Ultra 8/256Gb Ph Only',
    price: 650000,
    originalPrice: 700000,
    category: 'TECNO & INFINIX',
    inStock: true,
    stockCount: 8,
    image: '/src/assets/images/product_iphone_15_pro_box_1791651995091.jpg',
    description: 'Itel S25 Ultra 8/256Gb Ph Only Curved Display။ COD ရရှိပါသည်။',
    colors: ['Black'],
    storage: ['256GB'],
    createdAt: '2026-10-08'
  },
  {
    id: 'tec-3',
    name: 'Infinix Smart 9 3/128Gb Ph Only (Blue)',
    price: 330000,
    originalPrice: 360000,
    category: 'TECNO & INFINIX',
    inStock: true,
    stockCount: 12,
    image: '/src/assets/images/product_iphone_16_white_1791651983874.jpg',
    description: 'Infinix Smart 9 3/128Gb Ph Only (Blue)။ COD ရရှိပါသည်။',
    colors: ['Blue'],
    storage: ['128GB'],
    createdAt: '2026-10-07'
  },

  // ROG
  {
    id: 'rog-1',
    name: 'ROG 8 Pro 16/512Gb Charger Only (Black)',
    price: 2450000,
    originalPrice: 2600000,
    category: 'ROG GAMING',
    inStock: true,
    stockCount: 3,
    image: '/src/assets/images/product_smart_fitness_watch_1791651852281.jpg',
    description: 'ASUS ROG Phone 8 Pro 16/512Gb Charger Only (Black) Snapdragon 8 Gen 3 Monster Gaming။ COD အိမ်ရောက်ငွေချေ ရပါသည်!',
    colors: ['Black'],
    storage: ['512GB'],
    createdAt: '2026-10-10'
  }
];

export const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'KCB-8941',
    customerName: 'Ko Kyaw Swar',
    customerPhone: '09798442190',
    customerTelegram: '@kyawswar_dev',
    address: 'No. 42, Hledan 1st Street, Kamayut Township',
    city: 'Yangon',
    items: [
      {
        product: DEFAULT_PRODUCTS[1], // iPhone 16 White
        quantity: 1,
        selectedColor: 'White',
        selectedStorage: '128GB'
      }
    ],
    subtotal: 3300000,
    deliveryFee: 3000,
    discount: 50000,
    total: 3253000,
    paymentMethod: 'kpay',
    paymentStatus: 'paid',
    status: 'processing',
    notes: 'KBZPay ဖြင့် ငွေလွှဲထားပြီးပါပြီ။ ပြေစာ screenshot ပို့ပြီး။',
    createdAt: '2026-10-10 09:15'
  },
  {
    id: 'ord-2',
    orderNumber: 'KCB-8940',
    customerName: 'Ma Hnin Yu',
    customerPhone: '09450091823',
    customerTelegram: '@hninyu_m',
    address: '73rd Street, Between 28th x 29th, Chanayethazan',
    city: 'Mandalay',
    items: [
      {
        product: DEFAULT_PRODUCTS[2], // iPhone 15 Pro
        quantity: 1,
        selectedColor: 'Natural Titanium',
        selectedStorage: '128GB'
      }
    ],
    subtotal: 3250000,
    deliveryFee: 4500,
    discount: 0,
    total: 3254500,
    paymentMethod: 'wavepay',
    paymentStatus: 'paid',
    status: 'confirmed',
    notes: 'WavePay ဖြင့် ငွေလွှဲပေးချေထားပါသည်။',
    createdAt: '2026-10-09 18:40'
  }
];

export const DEFAULT_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'WELCOME10',
    discountPercent: 10,
    minSpend: 200000,
    active: true,
    usageCount: 84,
    expiresAt: '2026-12-31'
  },
  {
    id: 'c-2',
    code: 'KOCHOMOBILE',
    discountAmount: 50000,
    minSpend: 1000000,
    active: true,
    usageCount: 142,
    expiresAt: '2026-11-30'
  }
];

export const DEFAULT_GIVEAWAYS: Giveaway[] = [
  {
    id: 'gw-1',
    title: 'Thadingyut Mega Phone Festival Giveaway',
    prize: 'Brand New AirPods 3rd Gen + 100,000 MMK Shopping Voucher',
    endDate: '2026-10-25',
    participantsCount: 429,
    status: 'active'
  }
];

export const DEFAULT_CUSTOMERS: CustomerUser[] = [
  {
    id: 'cust-1',
    name: 'Ko Kyaw Swar',
    phone: '09798442190',
    telegramHandle: '@kyawswar_dev',
    ordersCount: 4,
    totalSpent: 7850000,
    points: 785,
    lastActive: 'Today, 09:15 AM'
  },
  {
    id: 'cust-2',
    name: 'Ma Hnin Yu',
    phone: '09450091823',
    telegramHandle: '@hninyu_m',
    ordersCount: 2,
    totalSpent: 3950000,
    points: 395,
    lastActive: 'Yesterday'
  }
];

export const DEFAULT_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'del-1',
    name: 'Yangon (Downtown & Inner Townships) — KPay/WavePay ကြိုတင်ငွေလွှဲ',
    fee: 3000,
    estimatedTime: 'Same Day / Next Day Delivery (COD မရပါ)',
    freeThreshold: 1000000
  },
  {
    id: 'del-2',
    name: 'Yangon (Outer Townships) — KPay/WavePay ကြိုတင်ငွေလွှဲ',
    fee: 4000,
    estimatedTime: '1 - 2 Business Days (COD မရပါ)',
    freeThreshold: 1500000
  },
  {
    id: 'del-3',
    name: 'Mandalay City — KPay/WavePay ကြိုတင်ငွေလွှဲ',
    fee: 4500,
    estimatedTime: '1 - 2 Days Express Gate / ကားဂိတ်',
    freeThreshold: 2000000
  },
  {
    id: 'del-4',
    name: 'Naypyidaw & Other Major Cities — KPay/WavePay ကြိုတင်ငွေလွှဲ',
    fee: 5500,
    estimatedTime: '2 - 3 Days via Royal Express / Gate',
    freeThreshold: 2500000
  }
];

export const DEFAULT_PAYMENT_CONFIG: PaymentConfig = {
  kpayPhone: '09 776 111 116',
  kpayName: 'Hla Phone Thu',
  wavePhone: '09 776 111 116',
  waveName: 'Hla Phone Thu',
  cbAccount: '0012 6001 8920 1201',
  cbName: 'Hla Phone Thu',
  codEnabled: false,
  starsEnabled: true
};

export const DEFAULT_SHOP_SETTINGS: ShopSettings = {
  shopName: 'KO CHO MOBILE E-commerce Store',
  tagline: 'Your Trusted Telegram Mobile & Gadgets Hub in Myanmar',
  botUsername: '@kocho_mobile_service_bot',
  botToken: '8941636635:AAHCoVfpr6ntZTdJGKoIVlnYn05Wn2kBlOI',
  channelUsername: '@kocho_mobile_official',
  adminTelegram: '@player-00h',
  adminChatId: '8927464164',
  supportPhone: '09 779 944 100',
  currency: 'MMK',
  exchangeRate: 4600, // 1 USD = 4,600 MMK
  language: 'my',
  todayRevenue: 3300000,
  autoBotReply: true,
  welcomeMessage: 'မင်္ဂလာပါရှင်! KO CHO MOBILE E-commerce Store မှ ကြိုဆိုပါတယ်။ ဖုန်းနှင့် အီလက်ထရောနစ်ပစ္စည်းများကို ဈေးနှုန်းမှန်ကန်စွာဖြင့် စိတ်ချလက်ချ မှာယူနိုင်ပါပြီ။ (⚠️ သတိပြုရန် - လောလောဆယ် အိမ်ရောက်ငွေချေ မရသေးပါ၊ KBZPay/WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်)'
};

export const DEFAULT_CUSTOMIZATION: CustomizationConfig = {
  adminTemplate: 'classic',
  publicShopTheme: 'rose',
  adminTopBarTheme: 'neon-purple',
  orderButtonLabel: 'Buy Now',
  currency: 'MMK',
  shopBanners: ['/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg'],
  socialLinks: [
    { id: 'soc-1', platform: 'phone', value: '09 779 944 100', label: 'Hotline: 09 779 944 100' },
    { id: 'soc-2', platform: 'telegram', value: '@kocho_mobile_service_bot', label: 'Telegram Bot' },
    { id: 'soc-3', platform: 'facebook', value: 'fb.com/kocho.mobile.store', label: 'Official Page' }
  ],
  aiAgent: {
    enabled: true,
    gender: 'male',
    customPrompt: 'ဝယ်ရင်စိတ်ချရပြီး... ရောင်းရင်ဈေးကောင်းရမယ့် KO CHO MOBILE E-commerce Store မှ ကြိုဆိုပါတယ်။ ဖုန်းအသစ်များနှင့် ဒစ်ဂျစ်တယ်ပစ္စည်းများကို စိတ်ချစွာမှာယူနိုင်ပါသည်။ (⚠️ သတိပြုရန် - လောလောဆယ် အိမ်ရောက်ငွေချေ မရသေးပါ၊ KBZPay / WavePay: 09 776 111 116 (Hla Phone Thu) ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်)',
    quickQuestions: [
      'အိမ်ရောက်ငွေချေ (COD) ရပါသလား?',
      'ငွေလွှဲအကောင့်နံပါတ်ပေးပါ',
      'ဆက်သွယ်ရန် Hotline ဘယ်လောက်လဲ?'
    ],
    quickReplies: [
      'လောလောဆယ် အိမ်ရောက်ငွေချေ (COD) မရသေးပါခင်ဗျာ။ KBZPay နှင့် WavePay: 09 776 111 116 (Hla Phone Thu) ဖြင့် အရင်ငွေလွှဲပြီး စိတ်ချစွာ မှာယူနိုင်ပါသည်ရှင်။',
      'ငွေလွှဲအကောင့်: KBZPay / WavePay - 09 776 111 116 (Hla Phone Thu) ဖြစ်ပါသည်ခင်ဗျာ။',
      'ဆက်သွယ်ရန် Hotline: 09 779 944 100 သို့ တိုက်ရိုက်ခေါ်ဆိုနိုင်ပါသည်ခင်ဗျာ။'
    ]
  }
};

export const DEFAULT_BOT_COMMANDS: BotCommand[] = [
  {
    command: '/start',
    description: 'Start shopping and open WebApp Mini App',
    response: 'Welcome to KO CHO MOBILE E-commerce Store! Tap the button below to browse all phones and electronics directly inside Telegram. (⚠️ သတိပြုရန် - လောလောဆယ် အိမ်ရောက်ငွေချေ မရသေးပါ၊ KBZPay / WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်)',
    enabled: true
  },
  {
    command: '/payment',
    description: 'KPay & WavePay Payment Accounts',
    response: '💳 ငွေလွှဲအကောင့်များ (COD မရပါ):\n• KBZPay: 09 776 111 116 (Hla Phone Thu)\n• WavePay: 09 776 111 116 (Hla Phone Thu)\n• CB Bank: 0012 6001 8920 1201 (Hla Phone Thu)\n⚠️ လောလောဆယ် အိမ်ရောက်ငွေချေ (COD) မရသေးပါခင်ဗျာ။',
    enabled: true
  },
  {
    command: '/cod',
    description: 'Cash on Delivery Information',
    response: '⚠️ လောလောဆယ် အိမ်ရောက်ငွေချေ (Cash on Delivery / COD) စနစ် မရသေးပါခင်ဗျာ။ လူကြီးမင်းတို့အနေဖြင့် KBZPay / WavePay (09 776 111 116 - Hla Phone Thu) ဖြင့် ကြိုတင်ငွေလွှဲ၍ မှာယူနိုင်ပါသည်။',
    enabled: true
  },
  {
    command: '/products',
    description: 'Browse all available in-stock items',
    response: 'Available Brands: iPhone, Xiaomi/Redmi, OPPO, Vivo, Huawei/Honor, Samsung, Realme, Tecno, ROG Gaming. Prices in MMK. (COD မရသေးပါ၊ KPay/WavePay: 09 776 111 116 ဖြင့် ငွေလွှဲရပါမည်)',
    enabled: true
  },
  {
    command: '/track',
    description: 'Track your pending or shipped order status',
    response: 'Please send your Order ID (e.g., KCB-8941) to check delivery status instantly.',
    enabled: true
  },
  {
    command: '/contact',
    description: 'Direct contact with Shop Owner / Support',
    response: 'Customer Service Hotline: 09 779 944 100 | Telegram Admin: @player_00h',
    enabled: true
  }
];
