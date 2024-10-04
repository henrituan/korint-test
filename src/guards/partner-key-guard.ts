import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class PartneryKeyGuard implements CanActivate {
  private readonly partnerKey = process.env.PARTNER_KEY || 'partner_key_test';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== this.partnerKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
