import { queryOptions } from '@tanstack/react-query';
import { authKeys } from './keys';
import { getMe } from './user.api';

export const getMeOptions = () => {
  return queryOptions({
    queryFn: getMe,
    queryKey: authKeys.me,
  });
};
