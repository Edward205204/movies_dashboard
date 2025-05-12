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
  const itemsPerPage = parseInt(rawItemsPerPage) > MAX_ITEMS_PER_PAGE ? MAX_ITEMS_PER_PAGE : parseInt(rawItemsPerPage);

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
