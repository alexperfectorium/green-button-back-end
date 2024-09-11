import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CookieService } from './cookie.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      global: true,
      signOptions: {
        expiresIn: '7d'
      }
    })
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, CookieService]
})
export class AuthModule {}
