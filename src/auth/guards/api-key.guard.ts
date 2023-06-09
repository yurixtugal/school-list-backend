import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  
  constructor(private reflector: Reflector){}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
    if (isPublic) return isPublic
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Auth')
    if (authHeader !== process.env.API_KEY) throw new UnauthorizedException("Not allowed");
    return true;
  }

}
