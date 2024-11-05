export interface GetAllProductsResponse {
  id: string;
  name: string;
  amout: number;
  descriptions: string;
  category: {
    id: string;
    name: string;
  };
}
