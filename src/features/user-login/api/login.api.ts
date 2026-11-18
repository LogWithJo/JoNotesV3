import { apiClient } from '../../../shared/api';
import {
  loginResponseSchema,
  loginSchema,
  type LoginInput,
} from '../model/login.schema';

export async function continueAuth(loginInput: LoginInput) {
  const parsedLoginInput = loginSchema.safeParse(loginInput);
  if (!parsedLoginInput.success) {
    throw new Error(`Invalid login input: ${parsedLoginInput.error.message}`);
  }
  const response = await apiClient.post('/auth/continue', parsedLoginInput.data);
  return loginResponseSchema.parse(response.data);
}
