import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import { ObjectId } from "mongodb";
import { CRUDRepository } from "src/services/repository/CRUD.repository";
import { AuthRepo } from "../auth.repository";
import { AuthDto } from "../dto/auth.dto";

@Injectable()
export class AuthenticationMiddleWare extends CRUDRepository<AuthDto> implements NestMiddleware {
    constructor(){
        super("users")
    }

    async use(req: Request, res: Response, next: NextFunction) {
        let token = req.header('Authorization')

        if (!token || token === null || token === undefined || token === "undefined") {
            return res.status(403).send("please login!")
        }
        token = token.replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET_CODE_JWT) as AuthDto

        const user = await this.findOne({_id: new ObjectId(data._id)})
        if (!user) {
            throw new BadRequestException("invalid_token");
        }
        return next()
    }
}