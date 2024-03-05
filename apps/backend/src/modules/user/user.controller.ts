import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpStatus,
  UseGuards,
  UploadedFiles,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CognitoUserAttributes, User } from '@wagademy/types';
import { CognitoUserGuard } from '../../infra';
import { ApiFiles, CognitoUser, DBUser } from '../../shared/decorators';
import {
  CreateProfileEntity,
  CreateUserResponseEntity,
  FindProfileEntity,
  RetrieveSelfResponseEntity,
  UpdateProfileEntity,
  UpdateUserResponseEntity,
} from './entities';
import {
  CreateProfileDto,
  CreateUserDto,
  UpdateProfileDto,
  UpdateUserDto,
} from './dto';
import { MongoIdDto } from '../../shared/dtos';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the given cognito user.',
  })
  @ApiCreatedResponse({
    type: CreateUserResponseEntity,
    status: HttpStatus.CREATED,
    description: 'User successfully created.',
  })
  create(
    @CognitoUser()
    { sub: idRefAuth, email }: CognitoUserAttributes,
    { name, accountType }: CreateUserDto
  ) {
    return this.userService.create({ idRefAuth, name, email, accountType });
  }

  @Post('create-profile')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Create a new profile',
    description: 'Creates a new user profile with provided details.',
  })
  @ApiCreatedResponse({
    type: CreateProfileEntity,
    status: HttpStatus.CREATED,
    description: 'User profile successfully created.',
  })
  @ApiFiles(['profilePhoto'])
  async createUserProfile(
    @DBUser()
    { id: userId }: User,
    @UploadedFiles()
    {
      profilePhoto,
    }: {
      profilePhoto: Express.Multer.File[];
    },
    @Body() createProfileDto: CreateProfileDto
  ) {
    return this.userService.createUserProfile(
      { ...createProfileDto, profilePhoto },
      userId
    );
  }

  @Get('user-profile/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Find a user profile',
    description: 'Find a profile with ID.',
  })
  @ApiResponse({
    type: FindProfileEntity,
    status: HttpStatus.OK,
    description: 'Profile retrieved successfully.',
  })
  async findUserProfile(@Param() { id }: MongoIdDto) {
    return this.userService.findUserProfile(id);
  }

  @Get('self')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve the authenticated user',
    description: 'Fetches details of the currently authenticated user.',
  })
  @ApiResponse({
    type: RetrieveSelfResponseEntity,
    status: HttpStatus.OK,
    description: 'User details successfully retrieved.',
  })
  self(@DBUser() { id }: User) {
    return this.userService.findOne(id);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Update a user',
    description: 'Updates a user with the provided data.',
  })
  @ApiResponse({
    type: UpdateUserResponseEntity,
    status: HttpStatus.OK,
    description: 'User successfully updated.',
  })
  update(
    @DBUser()
    { id: userId }: User,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(updateUserDto, userId);
  }

  @Patch('profile')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Update a profile',
    description: 'Updates a profile with provided details.',
  })
  @ApiResponse({
    type: UpdateProfileEntity,
    status: HttpStatus.OK,
    description: 'Profile successfully updated.',
  })
  @ApiFiles(['profilePhoto'])
  async updateUserProfile(
    @DBUser()
    { id: userId }: User,
    @UploadedFiles()
    {
      profilePhoto,
    }: {
      profilePhoto?: Express.Multer.File[];
    },
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return this.userService.updateUserProfile(userId, {
      ...updateProfileDto,
      profilePhoto,
    });
  }
}
