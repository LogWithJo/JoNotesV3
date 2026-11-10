import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '../../../entities/user';
import { continueAuth } from './login.api';

type authParams = { email: string; password: string };

export const useContinueAuth = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: authParams) => {
      return continueAuth(email, password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
};
