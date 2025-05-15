import { useQuery } from '@tanstack/react-query';
import { useQueryConfig } from '@/hooks/query_config';
import userApi from '@/APIs/user.api';
import { UserTable } from '@/components/customs/user_table';
import PaginationWrapper from '@/components/customs/pagination_wrapper';
import { createSearchParams, useNavigate } from 'react-router';
import path from '@/constants/path';

export default function UserPage() {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => userApi.getUsers(queryConfig),
    placeholderData: (previousData) => previousData
  });
  const content = data?.data.content;

  const goToPage = (page: number) => {
    navigate({
      pathname: path.users,
      search: createSearchParams({
        ...queryConfig,
        soTrang: page.toString()
      }).toString()
    });
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='p-6'>
        <h1 className='text-2xl font-semibold mb-4'>User Management</h1>
        <div className='bg-background rounded-lg shadow p-4'>
          <UserTable users={content?.items || []} />
        </div>
        <PaginationWrapper
          currentPage={content?.currentPage || 1}
          totalPages={content?.totalPages || 1}
          goToPage={goToPage}
          className='mt-8'
        />
      </div>
    </div>
  );
}
