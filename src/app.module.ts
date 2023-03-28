import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import {  TypeOrmModule } from '@nestjs/typeorm'
import { SchoolsModule } from './schools/schools.module';
import { SchoolListModule } from './school-list/school-list.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async( configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('NODE_ENV')==='production'?configService.get<string>('DATABASE_HOST'):'localhost',
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_MYSQL_USER'),
          password: configService.get<string>('DATABASE_MYSQL_PASSWORD'),
          database: configService.get<string>('DATABASE_MYSQL_DATABASE'),
          entities: [__dirname+`/**/*.entity{.ts,.js}`],
          synchronize: true,
          logging: true
        }
      }
    }),
    ProductsModule,
    SchoolsModule,
    SchoolListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
