import { useQuery } from '@tanstack/react-query';
import { authKeys } from './keys';
import { getMe } from './user.api';

export const useGetMe = () => {
  return useQuery({
    queryFn: getMe,
    queryKey: authKeys.me,
  });
};
