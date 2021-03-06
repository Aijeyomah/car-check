import { Controller, OnModuleInit, Inject, Post, Body } from '@nestjs/common';
import { AuthService, SignupDetails, LoginResponse, LoginDetails } from "../services/auth/auth.interface";
import { ClientGrpc } from '@nestjs/microservices';
import { promisify } from './auth.module';

@Controller('auth')
export class AuthController implements OnModuleInit{
    private authService: AuthService;
    constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.authService = promisify(this.client.getService<AuthService>('AuthService'));
  }
  @Post('signup')
  async signup(@Body() data: SignupDetails): Promise<LoginResponse>{
    const user = await this.authService.signup(data);
      return user;
  }

  @Post('login')
  async login(@Body() data: LoginDetails): Promise<LoginResponse>{
      const user = await this.authService.login(data);
      return user;
  }
}