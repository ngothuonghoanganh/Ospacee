import { Body, Controller, Post } from "@nestjs/common";
import { userInfo } from "os";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";


@Controller("/auth")
export class AuthController {
    constructor(private readonly authSer: AuthService) { }
    @Post("/register")
    async registerController(@Body() userInfo: AuthDto): Promise<AuthDto> {
        return await this.authSer.registerService(userInfo)
    }

}