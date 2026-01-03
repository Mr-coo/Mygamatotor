import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.userId;
    const paramId = req.params.id;

    if (userId !== paramId) {
      throw new ForbiddenException('You can only modify your own data');
    }

    return true;
  }
}