export interface Equipment {
  id: string;
  name: string;
  type: string;
  category: {
    id: string;
    name: string;
    parentId?: string | null;
  } | null;
  model: {
    id: string;
    name: string;
    categoryId?: string | null;
    brand: {
      id: string;
      name: string;
    } | null;
  } | null;
  floor: {
    id: string;
    number: number;
    siteBuilding: {
      site: {
        id: string;
        name: string;
      };
    };
  } | null;
  siteId: string;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string | null;
}
