import { CRUDRepository } from "src/services/repository/CRUD.repository";
import { AuthDto } from "./dto/auth.dto";
import { BadRequestException } from "@nestjs/common";
import * as bcrypt from "bcrypt"

export class AuthRepo extends CRUDRepository<AuthDto> {
    constructor() {
        super("users")
    }
    
    async register(userInfo: AuthDto): Promise<AuthDto> {

        const existedUser = await this.findOne({
            username: userInfo.username
        })

        if (existedUser) {
            throw new BadRequestException("username_existed")
        }

        const hashPassword = await bcrypt.hash(userInfo.password, 10)
        userInfo.password = hashPassword
        return this.create(userInfo)
    }

    async login(userInfo: AuthDto): Promise<AuthDto> {
        return this.findOne({
            username: userInfo.username
        })
    }
}