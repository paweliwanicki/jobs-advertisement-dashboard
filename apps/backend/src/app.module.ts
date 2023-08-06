import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthenticationModule } from './authentication/authentication.module';
import { MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { User } from './users/user.entity';
import { DataSource } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    }),
    // TypeOrmModule.forRootAsync({
    //   useClass: TypeOrmConfigService,
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'app_db',
      entities: [User],
      synchronize: false,
      autoLoadEntities: true,
      dropSchema: true,
    }),
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {}
  // set global miuddleware for example test env
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
