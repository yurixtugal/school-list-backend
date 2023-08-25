import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key.guard';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthModule],
  imports: [UsersModule,ConfigModule,JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      global: true,
      signOptions: {expiresIn: '1h'}
    })
  })] 
})
export class AuthModule {}
