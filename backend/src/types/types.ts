export interface IOtpGenerate {
  createOtpDigit(length?: number): Promise<string>;
}

export interface SearchOptions{
  q?:string,
  role?:string,
  page:number,
  limit:number,
  sortBy?:string,
  order?:'asc'|'desc';
}

export interface PaginationResult<T>{
  data:T[]
  pagination:{
    total:number;
    page:number;
    limit:number;
    pages:number;
  }
}