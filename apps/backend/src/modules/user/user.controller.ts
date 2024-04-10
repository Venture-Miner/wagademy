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
  UnauthorizedException,
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
  CreateCompanyProfileEntity,
  CreateProfileEntity,
  CreateUserResponseEntity,
  FindProfileEntity,
  RetrieveSelfResponseEntity,
  UpdateCompanyProfileEntity,
  UpdateProfileEntity,
  UpdateUserResponseEntity,
} from './entities';
import {
  CreateCompanyProfileDto,
  CreateProfileDto,
  CreateUserDto,
  UpdateCompanyProfileDto,
  UpdateProfileDto,
  UpdateUserDto,
} from './dto';
import { MongoIdDto } from '../../shared/dtos';
import { FindOneCompanyProfileEntity } from './entities/find-one-company-profile-response.entity';

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
    @Body() { name, accountType }: CreateUserDto
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
    { id: userId, accountType }: User,
    @UploadedFiles()
    {
      profilePhoto,
    }: {
      profilePhoto: Express.Multer.File[];
    },
    @Body() createProfileDto: CreateProfileDto
  ) {
    if (accountType !== 'PHYSICAL_PERSON')
      throw new UnauthorizedException(
        'Only individual accounts are allowed to create a user profile.'
      );
    return this.userService.createUserProfile(
      { ...createProfileDto, profilePhoto },
      userId
    );
  }

  @Post('create-company-profile')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Create a new company profile',
    description: 'Creates a new company profile with provided details.',
  })
  @ApiCreatedResponse({
    type: CreateCompanyProfileEntity,
    status: HttpStatus.CREATED,
    description: 'Company profile successfully created.',
  })
  @ApiFiles(['companyPhoto'])
  async createCompanyProfile(
    @DBUser()
    { id: userId, accountType }: User,
    @UploadedFiles()
    {
      companyPhoto,
    }: {
      companyPhoto: Express.Multer.File[];
    },
    @Body() createCompanyProfileDto: CreateCompanyProfileDto
  ) {
    if (accountType !== 'COMPANY')
      throw new UnauthorizedException(
        'Only company accounts are allowed to create a company profile.'
      );
    return this.userService.createCompanyProfile(
      { ...createCompanyProfileDto, companyPhoto },
      userId
    );
  }

  @Get('user-profile/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Find an user profile',
    description: 'Find a profile based on its unique ID.',
  })
  @ApiResponse({
    type: FindProfileEntity,
    status: HttpStatus.OK,
    description: 'Profile retrieved successfully.',
  })
  async findUserProfile(
    @Param() { id }: MongoIdDto,
    @DBUser()
    { id: userId, accountType }: User
  ) {
    return this.userService.findUserProfile(id, userId, accountType);
  }

  @Get('company-profile/:id')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Find a company profile',
    description: 'Find a company profile based on its unique ID.',
  })
  @ApiResponse({
    type: FindOneCompanyProfileEntity,
    status: HttpStatus.OK,
    description: 'Company profile retrieved successfully.',
  })
  async findCompanyProfile(@Param() { id }: MongoIdDto) {
    return this.userService.findCompanyProfile(id);
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
    summary: 'Update an user',
    description: 'Updates an user with the provided data.',
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

  @Patch('company-profile')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Update a company profile',
    description: 'Updates a company profile with provided details.',
  })
  @ApiResponse({
    type: UpdateCompanyProfileEntity,
    status: HttpStatus.OK,
    description: 'Company profile successfully updated.',
  })
  @ApiFiles(['companyPhoto'])
  async updateCompanyProfile(
    @DBUser()
    { id: userId }: User,
    @UploadedFiles()
    {
      companyPhoto,
    }: {
      companyPhoto?: Express.Multer.File[];
    },
    @Body() updateCompanyProfileDto: UpdateCompanyProfileDto
  ) {
    return this.userService.updateCompanyProfile(userId, {
      ...updateCompanyProfileDto,
      companyPhoto,
    });
  }
}
