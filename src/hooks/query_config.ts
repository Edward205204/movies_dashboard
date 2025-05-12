// import { QueryConfig } from '../Pages/ProductList/ProductList';
import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';

import { useSearchParam } from './query_param';
import { MovieQueryParams } from '@/@types/movies';

export type QueryConfig = {
  [key in keyof MovieQueryParams]?: string;
};

export function useQueryConfig() {
  const searchParam = useSearchParam();
  const queryConfig: QueryConfig = omitBy(
    {
      maNhom: searchParam.maNhom || 'GP01',
      tenPhim: searchParam.tenPhim || undefined,
      soTrang: searchParam.soTrang || 1,
      soPhanTuTrenTrang: searchParam.soPhanTuTrenTrang || 7,
      tuNgay: searchParam.tuNgay || undefined,
      denNgay: searchParam.denNgay || undefined
    },
    isUndefined
  );
  return queryConfig;
}
