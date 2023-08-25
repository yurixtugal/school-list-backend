import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users.controller';
import { User } from './entity/users.entity';
import { UsersService } from './service/users.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),ConfigModule,forwardRef(()=>JwtModule),forwardRef(()=>AuthModule) ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModule,UsersService]
})
export class UsersModule {}
