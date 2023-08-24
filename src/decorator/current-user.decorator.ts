import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { IReqUser } from '@/auth/interface';

export const CurrentUser = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    const user: IReqUser = context.switchToHttp().getRequest().user;

    if (_.isNil(user))
      throw new UnauthorizedException('User not authenticated');
    return user;
  },
);
