import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService
        ){}


    async signIn(userMail: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByEmailWithPassword(userMail)
        
        if (!user){
            return new HttpException("Unauthorized user", HttpStatus.UNAUTHORIZED)
        }

        if (!(await bcrypt.compare(pass,user.password))){
            return new HttpException("Unauthorized user", HttpStatus.UNAUTHORIZED)
        }

        const payload = { sub: user.id, username: user.email, name: user.name, lastName: user.lastName };
        
        console.log(this.jwtService.signAsync)

        return { access_token: await this.jwtService.signAsync(payload)};
    }

}
