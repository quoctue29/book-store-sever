import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { RepositoryProvider } from '@/repository';
import { Role, ServerMessage } from '@/common';
import { FirebaseService } from '@/firebase';
import { AccessToken, IReqUser } from './interface';
import {
  AuthResDto,
  RegisterReqDto,
  LoginReqDto,
  LoginReqWithGoogleDto,
} from './dto';
import { UserInfoDto } from '../users/dto';
import { User } from '@/users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private repository: RepositoryProvider,
    private readonly jwtService: JwtService,
    readonly firebaseService: FirebaseService,
  ) {}
  private readonly name = 'User';

  public getAccessToken = async (
    accessTokenPayload: IReqUser,
  ): Promise<AccessToken> => {
    const issuer = 'API_SERVER';
    const option = {
      issuer,
      subject: accessTokenPayload.id,
      secret: this.configService.get('JWT_SECRET_KEY'),
    };

    const accessToken = await this.jwtService.signAsync(
      {
        id: accessTokenPayload.id,
        email: accessTokenPayload.email,
        userName: accessTokenPayload.userName,
        roles: accessTokenPayload.roles,
        subToken: _.defaultTo(accessTokenPayload.subToken, 1),
        createAt: new Date(),
      },
      option,
    );
    return { accessToken: accessToken };
  };

  public async getUserRoles(user: { email?: string; roles?: any[] }) {
    let roles = [];
    const isOwner =
      user.email === `${this.configService.get('ADMIN')}@gmail.com`;
    if (isOwner)
      roles = Object.values(Role).filter((value) => typeof value !== 'number');
    else roles = [Role.USER, ...(user?.roles || [])];
    return [...new Set(roles)];
  }

  public async createAdmin(): Promise<AuthResDto> {
    const createAdmin = await this.register({
      email: `${this.configService.get('ADMIN')}@gmail.com`,
      userName: this.configService.get('ADMIN'),
      password: this.configService.get('PASSWORD'),
    });
    return createAdmin;
  }

  public async register(data: RegisterReqDto): Promise<AuthResDto> {
    const saltRounds = 10; // Number of salt rounds for hashing
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const userExists = await this.repository.User.findOne({
      $or: [{ email: data.email }, { userName: data.userName }],
    });
    if (!_.isNil(userExists))
      throw new NotFoundException(this.name.concat(ServerMessage.WAS_EXISTED));
    const user: User = await this.repository.User.create({
      uid: uuidv4(),
      email: data.email,
      userName: data.userName,
      password: hashedPassword,
      roles: await this.getUserRoles({ email: data.email }),
    });

    const accessToken = await this.getAccessToken({
      id: user.id.toString(),
      email: user.email,
      userName: user.userName,
      isVerifiedEmail: user.isVerifiedEmail,
      roles: user.roles,
      subToken: '',
    });

    await this.repository.Cart.create({
      email: user.email,
      productIds: [],
      totalProduct: 0,
      totalPrice: 0,
    });

    return {
      accessToken: accessToken,
      user: plainToClass(UserInfoDto, user, { excludeExtraneousValues: true }),
    };
  }

  public async login(data: LoginReqDto): Promise<AuthResDto> {
    const user: User = await this.repository.User.findOne({
      email: data.email,
    });
    if (_.isNil(user))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch)
      throw new ForbiddenException(ServerMessage.INCORRECT_PASSWORD);

    const accessToken = await this.getAccessToken({
      id: user.id,
      email: user.email,
      userName: user.userName,
      isVerifiedEmail: user.isVerifiedEmail,
      roles: user.roles,
      subToken: '',
    });

    const cartExist = await this.repository.Cart.findOne({
      email: user.email,
    }).lean();
    if (_.isNil(cartExist)) {
      await this.repository.Cart.create({
        email: user.email,
        productIds: [],
        totalProduct: 0,
        totalPrice: 0,
      });
    }
    return {
      accessToken: accessToken,
      user: plainToClass(UserInfoDto, user, { excludeExtraneousValues: true }),
    };
  }

  public async loginWithGoogle(dto: LoginReqWithGoogleDto) {
    const data = await this.firebaseService.verifyIdToken(dto.idToken);
    let user: User;
    const userExist: User = await this.repository.User.findOne({
      email: data.email,
    });
    if (_.isNil(userExist)) {
      user = await this.repository.User.create({
        uid: data.uid,
        email: data.email,
        userName: data.displayName,
        isVerifiedEmail: true,
        roles: await this.getUserRoles({ email: data.email }),
      });
    }

    if (userExist.uid !== data.uid) {
      user = await this.repository.User.findOneAndUpdate(
        { email: data.email },
        { uid: data.uid, isVerifiedEmail: true, avatar: data.photoURL },
        { new: true },
      ).lean();
    }
    user = userExist;
    const accessToken = await this.getAccessToken({
      id: user.id,
      email: user.email,
      userName: user.userName,
      isVerifiedEmail: user.isVerifiedEmail,
      roles: user.roles,
      subToken: '',
    });

    const cartExist = await this.repository.Cart.findOne({
      email: user.email,
    }).lean();
    if (_.isNil(cartExist)) {
      await this.repository.Cart.create({
        email: user.email,
        productIds: [],
        totalProduct: 0,
        totalPrice: 0,
      });
    }
    return {
      accessToken: accessToken,
      user: plainToClass(UserInfoDto, user, { excludeExtraneousValues: true }),
    };
  }
}
