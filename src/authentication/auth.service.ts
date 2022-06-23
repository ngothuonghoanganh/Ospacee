import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthRepo } from "./auth.repository";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
@Injectable()
export class AuthService {
    constructor(private readonly authRepo: AuthRepo) { }

    async registerService(userInfo: AuthDto): Promise<AuthDto> {
        return this.authRepo.register(userInfo)
    }

    async loginService(userInfo: AuthDto): Promise<AuthDto> {
        const user = await this.authRepo.login(userInfo)
        if (!user) {
            throw new BadRequestException("user_do_not_exist")
        }
        if (!(await bcrypt.compare(userInfo.password, user.password))) {
            throw new BadRequestException("invalid_password")
        }
        delete user.password
        console.log(process.env.SECRET_CODE_JWT)
        const token = await jwt.sign({ ...user }, process.env.SECRET_CODE_JWT, {
            expiresIn: "24h"
        })
        return {
            ...user,
            token: token
        } as AuthDto
    }
}