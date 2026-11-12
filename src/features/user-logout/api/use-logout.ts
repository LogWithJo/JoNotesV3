import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from './logout.api';
import { authKeys } from '../../../entities/user';

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authKeys.me }),
  });
};
