// import { QueryConfig } from '../Pages/ProductList/ProductList';
import { useSearchParam } from './query_param';
import { MovieQueryParams } from '@/@types/movies';
import { omitBy, isUndefined } from 'lodash';

export type QueryConfig = {
  [key in keyof MovieQueryParams]?: string;
};

const MAX_ITEMS_PER_PAGE = 6;

export function useQueryConfig() {
  const searchParam = useSearchParam();
  const rawItemsPerPage = searchParam.soPhanTuTrenTrang || '7';
  let itemsPerPage = parseInt(rawItemsPerPage);

  // Nếu số phần tử trên trang lớn hơn MAX_ITEMS_PER_PAGE
  if (itemsPerPage > MAX_ITEMS_PER_PAGE) {
    itemsPerPage = MAX_ITEMS_PER_PAGE;
  }
  // Nếu số phần tử trên trang nhỏ hơn hoặc bằng 0
  else if (itemsPerPage <= 0) {
    itemsPerPage = 1;
  }

  const queryConfig: QueryConfig = omitBy(
    {
      maNhom: searchParam.maNhom || 'GP01',
      tenPhim: searchParam.tenPhim || undefined,
      soTrang: searchParam.soTrang || '1',
      soPhanTuTrenTrang: itemsPerPage.toString(),
      tuNgay: searchParam.tuNgay || undefined,
      denNgay: searchParam.denNgay || undefined
    },
    isUndefined
  );
  return queryConfig;
}
