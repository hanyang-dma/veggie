import { Category, Language } from './types';

export const UI_TEXT = {
  title: {
    en: 'VEGGIE.ARCHIVE',
    zh: '蔬菜档案_(ZH)',
  },
  subtitle: {
    en: 'VISUAL INDEX',
    zh: '视觉索引',
  },
  loading: {
    en: 'PROCESSING REQUEST...',
    zh: '处理请求中...',
  },
  aiFunFact: {
    en: 'NOTE (01)',
    zh: '备注 (01)',
  },
  aiNutrition: {
    en: 'DATA (NUTRITION)',
    zh: '数据 (营养)',
  },
  aiCooking: {
    en: 'PREP.PROTOCOL',
    zh: '制备协议',
  },
  selectPrompt: {
    en: 'SELECT_ENTRY //',
    zh: '选择条目 //',
  },
};

export const VEGETABLE_DATA: Category[] = [
  {
    id: 'leafy',
    name: { en: 'CAT_01: LEAFY', zh: '类别_01: 叶菜' },
    subCategories: [
      {
        id: 'lettuce-fam',
        name: { en: 'SUB: LETTUCE', zh: '亚类: 莴苣' },
        items: [
          {
            id: 'romaine',
            name: { en: 'Romaine', zh: '罗马生菜' },
            description: { en: 'Sturdy, crisp structure. Essential for Caesar preparations.', zh: '结构坚固清脆。凯撒沙拉的必要组成。' },
            icon: 'A.01',
            imageUrl: 'https://images.unsplash.com/photo-1626079547162-54c379ba518e?auto=format&fit=crop&w=1600&q=80',
          },
          {
            id: 'iceberg',
            name: { en: 'Iceberg', zh: '结球生菜' },
            description: { en: 'High water content. Neutral flavor profile. Maximum crunch.', zh: '含水量极高。风味中性。极致清脆。' },
            icon: 'A.02',
            imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=1600&q=80',
          },
        ],
      },
      {
        id: 'brassica',
        name: { en: 'SUB: CRUCIFEROUS', zh: '亚类: 十字花科' },
        items: [
          {
            id: 'kale',
            name: { en: 'Kale', zh: '羽衣甘蓝' },
            description: { en: 'Dense nutrient profile. Fibrous texture. Requires massage.', zh: '营养密度极高。纤维质地。需按摩处理。' },
            icon: 'B.01',
            imageUrl: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=1600&q=80',
          },
          {
            id: 'spinach',
            name: { en: 'Spinach', zh: '菠菜' },
            description: { en: 'Iron-rich laminar structure. Wilts rapidly under heat.', zh: '富含铁质的层状结构。遇热迅速萎缩。' },
            icon: 'B.02',
            imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1600&q=80',
          },
        ],
      },
    ],
  },
  {
    id: 'root',
    name: { en: 'CAT_02: ROOT', zh: '类别_02: 根茎' },
    subCategories: [
      {
        id: 'orange-roots',
        name: { en: 'SUB: TAPROOTS', zh: '亚类: 直根' },
        items: [
          {
            id: 'carrot',
            name: { en: 'Carrot', zh: '胡萝卜' },
            description: { en: 'Beta-carotene source. Conical orange storage root.', zh: 'β-胡萝卜素来源。圆锥形橙色储藏根。' },
            icon: 'C.01',
            imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=1600&q=80',
          },
          {
            id: 'radish',
            name: { en: 'Radish', zh: '萝卜' },
            description: { en: 'Pungent flavor profile. Rapid growth cycle.', zh: '辛辣风味。生长周期短。' },
            icon: 'C.02',
            imageUrl: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f87?auto=format&fit=crop&w=1600&q=80',
          },
        ],
      },
      {
        id: 'tubers',
        name: { en: 'SUB: TUBERS', zh: '亚类: 块茎' },
        items: [
          {
            id: 'potato',
            name: { en: 'Potato', zh: '土豆' },
            description: { en: 'Starchy tuber. Global staple crop. Variety: Solanum tuberosum.', zh: '淀粉块茎。全球主粮。品种：马铃薯。' },
            icon: 'D.01',
            imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1600&q=80',
          },
          {
            id: 'sweet-potato',
            name: { en: 'Sweet Potato', zh: '红薯' },
            description: { en: 'Dicotyledonous plant. Sweet taste. High viscosity when cooked.', zh: '双子叶植物。味甜。烹饪后粘度高。' },
            icon: 'D.02',
            imageUrl: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=1600&q=80',
          },
        ],
      },
    ],
  },
  {
    id: 'fruit-veg',
    name: { en: 'CAT_03: FRUIT', zh: '类别_03: 果菜' },
    subCategories: [
      {
        id: 'nightshade',
        name: { en: 'SUB: SOLANACEAE', zh: '亚类: 茄科' },
        items: [
          {
            id: 'tomato',
            name: { en: 'Tomato', zh: '番茄' },
            description: { en: 'Botanical fruit. Culinary vegetable. Acidic umami profile.', zh: '植物学果实。烹饪用蔬菜。酸鲜风味。' },
            icon: 'E.01',
            imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1600&q=80',
          },
          {
            id: 'eggplant',
            name: { en: 'Eggplant', zh: '茄子' },
            description: { en: 'Spongy matrix. Absorbent properties. Bitter if untreated.', zh: '海绵状基质。吸附性强。未处理带苦味。' },
            icon: 'E.02',
            imageUrl: 'https://images.unsplash.com/photo-1615485925763-8678628890a5?auto=format&fit=crop&w=1600&q=80',
          },
        ],
      },
      {
        id: 'cucurbits',
        name: { en: 'SUB: CUCURBIT', zh: '亚类: 葫芦科' },
        items: [
          {
            id: 'cucumber',
            name: { en: 'Cucumber', zh: '黄瓜' },
            description: { en: 'Cylindrical fruit. High thermal conductivity (cooling effect).', zh: '圆柱形果实。高热导率（冷却效应）。' },
            icon: 'F.01',
            imageUrl: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=1600&q=80',
          },
          {
            id: 'pumpkin',
            name: { en: 'Pumpkin', zh: '南瓜' },
            description: { en: 'Thick shell. Fibrous pulp. Seasonal cultivar.', zh: '厚壳。纤维状果肉。季节性栽培品种。' },
            icon: 'F.02',
            imageUrl: 'https://images.unsplash.com/photo-1506917728037-b6af011561e2?auto=format&fit=crop&w=1600&q=80',
          },
        ],
      },
    ],
  },
];