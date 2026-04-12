export type Language = 'en' | 'fr';

export interface UITranslations {
  ui: {
    search: string;
    searchCountry: string;
    selectOption: string;
    selectCountry: string;
    enterAddress: string;
    noOptionsFound: string;
    noCountriesFound: string;
    noAddressesFound: string;
    selectDate: string;
    clearSelection: string;
    searchEquipment: string;
    searchCategory: string;
    searchResults: string;
    noEquipmentFound: string;
    noEquipmentAvailable: string;
    selectCategoryOrSearch: string;
    equipmentType: string;
    equipmentBrand: string;
    equipmentModel: string;
    equipmentCategory: string;
    equipmentFloor: string;
    retry: string;
    back: string;
    noCategoriesFound: string;
    categorySearchResults: string;
  };
}

export interface TranslationContextValue {
  locale: Language;
  t: UITranslations;
}
