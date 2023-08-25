import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entity/users.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(createUserDto: CreateUserDto){
        
        const user = await this.findUserByEmail(createUserDto.email)
        
        if (user){
            return new HttpException(`The user ${createUserDto.email} already exists`, HttpStatus.CONFLICT)
        }
        const newUser =  this.userRepository.create(createUserDto);
        const hashPassword = await bcrypt.hash(newUser.password,10) ;   
        newUser.password = hashPassword;    
        return this.userRepository.save(newUser)
    }


    async findUserByEmailWithPassword(email: string): Promise<any>{
        
        let user = await this.userRepository.findOne({
            where:{
                email
            }})
        
        return user;
    }

    async findUserByEmail(email: string){
        
        let user = await this.userRepository.findOne({
            where:{
                email
            }})
        
        if (!user){
            return new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        const { password, ...result } = user;
        return result;
    }

}
