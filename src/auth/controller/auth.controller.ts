import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignInDto } from '../dto/signIn.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    signIn(@Body() signInDto: SignInDto){
        return this.authService.signIn(signInDto.username,signInDto.password);
    }

}
