import { Injectable } from "@nestjs/common";
import { AuthRepo } from "./auth.repository";
import { AuthDto } from "./dto/auth.dto";


@Injectable()
export class AuthService {
    constructor(private readonly authRepo: AuthRepo) { }

    async registerService(userInfo: AuthDto): Promise<AuthDto> {
        return this.authRepo.register(userInfo)
    }
}