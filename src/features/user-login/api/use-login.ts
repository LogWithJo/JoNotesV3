import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '../../../entities/user';
import { continueAuth } from './login.api';
import type { LoginInput } from '../model/login.schema';

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (loginInput: LoginInput) => {
      return continueAuth(loginInput);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authKeys.me }),
  });
};
