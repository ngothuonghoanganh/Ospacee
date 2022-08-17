import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class RoleInterceptor implements NestInterceptor {
    role: Array<string>
    constructor(role: Array<string>) {
        this.role = role
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        if (!this.role.includes("customer")) {
            throw new BadRequestException("user_do_not_permission")
        }
        return next.handle()
    }
}