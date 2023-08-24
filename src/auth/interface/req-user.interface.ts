import { Role } from '@/common';

export interface IReqUser {
  id: string;
  email: string;
  userName: string;
  isVerifiedEmail: boolean;
  roles: Role[];
  subToken: string;
}

export class AccessToken {
  accessToken: string;
}

export enum EStrategy {
  JWT = 'JWT',
}
