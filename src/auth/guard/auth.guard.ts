import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '@/decorator';
import { Role } from '@/common';
import { EStrategy, IReqUser } from '../interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard(EStrategy.JWT) {
  constructor(private reflector: Reflector) {
    super();
  }
  handleRequest(
    error: any,
    payload: IReqUser,
    info: any,
    context: ExecutionContext,
  ) {
    const user = super.handleRequest(error, payload, info, context);
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return user;
    if (requiredRoles.some((role) => user.roles?.includes(role))) return user;
    throw new UnauthorizedException('Invalid permission');
  }
}
