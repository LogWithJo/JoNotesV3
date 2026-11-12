import { apiClient } from '../../../shared/api';
import {
  loginResponseSchema,
  loginSchema,
  type LoginInput,
} from '../model/login.schema';

export async function continueAuth(data: LoginInput) {
  const validPayload = loginSchema.safeParse(data);
  if (!validPayload.success) {
    throw new Error(`Invalid params ${validPayload.error.message}`);
  }
  const res = await apiClient.post('/auth/continue', validPayload.data);
  return loginResponseSchema.parse(res.data);
}
