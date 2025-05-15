// import { QueryConfig } from '../Pages/ProductList/ProductList';
import { useSearchParam } from './query_param';
import { MovieQueryParams } from '@/@types/movies';
import { omitBy, isUndefined } from 'lodash';
import { useLocation } from 'react-router';

export type QueryConfig = {
  [key in keyof MovieQueryParams]?: string;
} & { tuKhoa?: string };

const MAX_ITEMS_PER_PAGE_MOVIE = 6;
const MAX_ITEMS_PER_PAGE_USER = 11;

export function useQueryConfig() {
  const searchParam = useSearchParam();
  const location = useLocation();
  const isUserPage = location.pathname.includes('/users');
  const maxItems = isUserPage ? MAX_ITEMS_PER_PAGE_USER : MAX_ITEMS_PER_PAGE_MOVIE;
  const rawItemsPerPage = searchParam.soPhanTuTrenTrang || (isUserPage ? '11' : '7');
  let itemsPerPage = parseInt(rawItemsPerPage);

  if (itemsPerPage > maxItems) {
    itemsPerPage = maxItems;
  } else if (itemsPerPage <= 0) {
    itemsPerPage = 1;
  }

  const queryConfig: QueryConfig = omitBy(
    {
      maNhom: searchParam.maNhom || 'GP01',
      tenPhim: searchParam.tenPhim || undefined,
      soTrang: searchParam.soTrang || '1',
      soPhanTuTrenTrang: itemsPerPage.toString(),
      tuNgay: searchParam.tuNgay || undefined,
      denNgay: searchParam.denNgay || undefined,
      ...(isUserPage ? { tuKhoa: searchParam.tuKhoa || undefined } : {})
    },
    isUndefined
  );
  return queryConfig;
}
