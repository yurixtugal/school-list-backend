import { Body, Controller, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { UsersService } from '../service/users.service';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}


    @Post("")
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto)
    }

    @Get(':email')
    @Public()
    getByEmail(@Param('email') email: string){
        return this.userService.findUserByEmail(email)
    }
}
