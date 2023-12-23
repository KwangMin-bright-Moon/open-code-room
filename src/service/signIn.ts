import { BACKEND_API } from '@/constants/api';
import { User } from '@/model/user';
import { httpClient } from '@/utils/httpClient';

export type SigninParams = {
  email: string;
  password: string;
};

type SignInRes = {
  result: {
    user: User;
    accessToken: string;
  };
};

export const signIn = async (
  signinParams: SigninParams
): Promise<SignInRes> => {
  return await httpClient.post(BACKEND_API.AUTH.SIGNIN, signinParams);
};
