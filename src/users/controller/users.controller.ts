import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto)
    }

    @Get(':email')
    getByEmail(@Param('email') email: string){
        return this.userService.findUserByEmail(email)
    }
}
