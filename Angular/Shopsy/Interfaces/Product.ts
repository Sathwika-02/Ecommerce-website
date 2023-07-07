export interface Product{
    rating: number;
    id:string, 
    title:string,
    price: number,
    description:string,
    category: string,
    image:string, 
    qty:number;
    popularity:number;
    smallImages: SmallImage[];
    discount:number;
    delivery_day:number;
    color:string;
    showColor?: boolean; 
    hovered: boolean;
    defaultColor:string;

}
export interface SmallImage {
    smallImage: string;

  }

export interface user{
    username:string;
    password:string;
}

export interface Review {
    productTitle: string;
    author: string;
    rating: number;
    comment: string;
    media?: {
        file: File;
        preview: string;
      };
      tempId?: number;
  }

  export interface Faq {
    productTitle: string;
    question: string;
    answer: string;
    status: string;
   
}

  