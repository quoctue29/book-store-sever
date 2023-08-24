import { Body, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PortalController } from '@/decorator';
import { Serialize } from '@/interceptor';
import {
  AuthResDto,
  RegisterReqDto,
  LoginReqDto,
  LoginReqWithGoogleDto,
} from './dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@PortalController({ path: 'auth' })
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('/create-admin')
  @Serialize(AuthResDto)
  public async createAdmin() {
    this.logger.debug(`Rest to created admin`);
    return this.authService.createAdmin();
  }

  @Post('/register')
  @Serialize(AuthResDto)
  public async register(@Body() body: RegisterReqDto) {
    this.logger.debug(
      `Rest to register: ${JSON.stringify(body.email)} > ${JSON.stringify(
        body.userName,
      )}`,
    );
    return await this.authService.register(body);
  }

  @Post('/login')
  @Serialize(AuthResDto)
  public async loginByEmail(@Body() body: LoginReqDto) {
    this.logger.debug(`Rest to login by email: ${JSON.stringify(body.email)}`);
    return await this.authService.login(body);
  }
  @Post('/login/social')
  @Serialize(AuthResDto)
  public async loginWithGoogle(@Body() body: LoginReqWithGoogleDto) {
    return await this.authService.loginWithGoogle(body);
  }
}
