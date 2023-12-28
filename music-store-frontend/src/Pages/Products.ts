
export interface Product {
    id: string;
    name: string;
    color: string;
    price: number;
    brand: string;
    dtype: string;
    subCategoryId: string;
    numberOfStrings: number;
    numberOfSoundLayers: number;
    numberOfKeys: number;
    diameter: number;
    image: string;
    discount:number;
    getDiscountPrice(): number;
  }
  export const getDiscountPrice = (product: Product): number => {
    
    const discountedPrice = product.price - (product.price * product.discount) / 100;
    return discountedPrice;
  };