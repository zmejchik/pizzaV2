export interface ISort {
  name: string;
  sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
}

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: ISort;
}
