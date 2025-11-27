export type Region = "san-francisco" | "hong-kong" | "singapore" | "china";

export interface RegionConfig {
  code: Region;
  name: {
    en: string;
    zh: string;
  };
  city: {
    en: string;
    zh: string;
  };
  country: {
    en: string;
    zh: string;
  };
  timezone: string;
  currency: string;
  phone: string;
  email: string;
  businessModel?: {
    en: string;
    zh: string;
  };
  minimumPurchase?: {
    amount: number;
    currency: string;
    note?: {
      en: string;
      zh: string;
    };
  };
}

export const regions: Record<Region, RegionConfig> = {
  "san-francisco": {
    code: "san-francisco",
    name: {
      en: "San Francisco",
      zh: "旧金山",
    },
    city: {
      en: "San Francisco",
      zh: "旧金山",
    },
    country: {
      en: "United States",
      zh: "美国",
    },
    timezone: "America/Los_Angeles",
    currency: "USD",
    phone: "(415) 351-6363",
    email: "staff@unincore.us",
  },
  "hong-kong": {
    code: "hong-kong",
    name: {
      en: "Hong Kong",
      zh: "香港",
    },
    city: {
      en: "Hong Kong",
      zh: "香港",
    },
    country: {
      en: "Hong Kong SAR",
      zh: "中国香港",
    },
    timezone: "Asia/Hong_Kong",
    currency: "HKD",
    phone: "+852 XXXX XXXX",
    email: "hk@unincore.us",
  },
  "singapore": {
    code: "singapore",
    name: {
      en: "Singapore",
      zh: "新加坡",
    },
    city: {
      en: "Singapore",
      zh: "新加坡",
    },
    country: {
      en: "Singapore",
      zh: "新加坡",
    },
    timezone: "Asia/Singapore",
    currency: "SGD",
    phone: "+65 XXXX XXXX",
    email: "sg@unincore.us",
  },
  "china": {
    code: "china",
    name: {
      en: "China",
      zh: "中国",
    },
    city: {
      en: "Shanghai",
      zh: "上海",
    },
    country: {
      en: "China",
      zh: "中国",
    },
    timezone: "Asia/Shanghai",
    currency: "CNY",
    phone: "+86 XXX XXXX XXXX",
    email: "cn@unincore.us",
    businessModel: {
      en: "Distributor Partnership",
      zh: "经销商合作模式",
    },
    minimumPurchase: {
      amount: 168000,
      currency: "USD",
      note: {
        en: "Recommended initial purchase for market entry",
        zh: "建议初始采购量以进入市场",
      },
    },
  },
};

export const defaultRegion: Region = "san-francisco";

export function isValidRegion(region: string): region is Region {
  return region in regions;
}

export function getRegionConfig(region: Region): RegionConfig {
  return regions[region];
}

export function getAllRegions(): Region[] {
  return Object.keys(regions) as Region[];
}
