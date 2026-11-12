import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '../../../entities/user';
import { continueAuth } from './login.api';
import type { LoginInput } from '../model/login.schema';

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginInput) => {
      console.log(data);
      return continueAuth(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
};
