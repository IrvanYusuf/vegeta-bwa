export interface BaseResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  totalPage: number;
}

export interface PaginatedResponse<T> extends BaseResponse<T> {
  meta: PaginationMeta;
}
