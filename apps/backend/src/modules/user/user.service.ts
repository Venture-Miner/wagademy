import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@wagademy/prisma';
import {
  CreateUserResponse,
  UpdateUserResponse,
  FindOneUserResponse,
  UpdateUser,
  CreateUser,
  CreateProfile,
  UpdateProfile,
  CreateProfileResponse,
  UpdateProfileResponse,
  CreateEducation,
  CreateProfessionalExperience,
  UpdateEducation,
  UpdateProfessionalExperience,
  FindOneProfileResponse,
  CreateCompanyProfile,
  CreateCompanyProfileResponse,
  UpdateCompanyProfile,
  UpdateCompanyProfileResponse,
  FindOneCompanyProfileResponse,
  AccountTypeEnum,
  UserProfileOnHandlingImage,
  ImageType,
} from '@wagademy/types';
import { FileService } from '../../infra';
import { CreditTypeEnum, Prisma } from '@prisma/client';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(createUser: CreateUser): Promise<CreateUserResponse> {
    const user = await this.prismaService.user.create({
      data: { ...createUser },
      include: {
        companyProfile: { select: { id: true } },
        userProfile: { select: { id: true } },
      },
    });
    this.eventEmitter.emit('userCreated', user);
    return user;
  }

  async createCompanyProfile(
    createCompanyProfile: CreateCompanyProfile,
    userId: string
  ): Promise<CreateCompanyProfileResponse> {
    let pictureKey = '';
    try {
      const { companyPhoto, ...profileData } = createCompanyProfile;
      const createCompanyProfileData: Prisma.CompanyProfileCreateInput = {
        ...profileData,
        user: { connect: { id: userId } },
      };
      if (companyPhoto) {
        const { key, url } = await this.fileService.uploadFile(
          companyPhoto[0],
          'public-read'
        );
        pictureKey = key;
        createCompanyProfileData.companyPhoto = {
          create: { url, key: pictureKey },
        };
      }
      return this.prismaService.companyProfile.create({
        data: createCompanyProfileData,
        include: {
          companyPhoto: { select: { url: true } },
          backgroundPhoto: { select: { url: true } },
        },
      });
    } catch (error) {
      if (pictureKey.length) await this.fileService.removeFile(pictureKey);
      throw new BadRequestException(error, 'Error creating company profile:');
    }
  }

  async createUserProfile(
    createProfile: CreateProfile,
    userId: string
  ): Promise<CreateProfileResponse> {
    let pictureKey = '';
    try {
      const {
        profilePhoto,
        education,
        professionalExperience,
        ...profileData
      } = createProfile;
      const createUserProfileData: Prisma.UserProfileCreateInput = {
        ...profileData,
        education: { createMany: { data: education } },
        professionalExperience: {
          createMany: { data: professionalExperience },
        },
        user: { connect: { id: userId } },
      };
      if (profilePhoto) {
        const { key, url } = await this.fileService.uploadFile(
          profilePhoto[0],
          'public-read'
        );
        pictureKey = key;
        createUserProfileData.profilePhoto = {
          create: { url, key: pictureKey },
        };
      }

      return this.prismaService.userProfile.create({
        data: createUserProfileData,
        include: {
          profilePhoto: { select: { url: true } },
          professionalExperience: true,
          education: true,
        },
      });
    } catch (error) {
      if (pictureKey.length) await this.fileService.removeFile(pictureKey);
      throw new BadRequestException(error, 'Error creating profile:');
    }
  }

  @OnEvent('subscriptionCreated')
  async updateUserSubscription(eventData: {
    userId: string;
    subscriptionId: string;
  }) {
    await this.prismaService.user.update({
      where: { id: eventData.userId },
      data: {
        subscriptionId: eventData.subscriptionId,
        credit: {
          create: { creditType: CreditTypeEnum.PLAN_CREDIT, total: 10 },
        },
      },
    });
  }

  async update(
    updateUser: UpdateUser,
    userId: string
  ): Promise<UpdateUserResponse> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: updateUser,
      include: {
        companyProfile: { select: { id: true } },
        userProfile: { select: { id: true } },
      },
    });
  }

  async updateUserProfile(
    userId: string,
    updateProfile: UpdateProfile
  ): Promise<UpdateProfileResponse> {
    const pictureKeyAndUrl: { key: string; url: string }[] = [];
    try {
      const {
        profilePhoto,
        education,
        professionalExperience,
        ...profileData
      } = updateProfile;
      const updateUserProfileData: Prisma.UserProfileUpdateInput = {
        ...profileData,
        education: await this.handleEducation(education),
        professionalExperience: await this.handleProfessionalExperience(
          professionalExperience
        ),
      };
      if (profilePhoto) {
        const userProfile = await this.prismaService.userProfile.findUnique({
          where: { userId },
          select: { profilePhoto: { select: { key: true } } },
        });
        if (userProfile?.profilePhoto?.key)
          await this.fileService.removeFile(userProfile.profilePhoto.key);
        const { key, url } = await this.fileService.uploadFile(
          profilePhoto[0],
          'public-read'
        );
        pictureKeyAndUrl.push({ key, url });
        updateUserProfileData.profilePhoto = {
          upsert: { create: { key, url }, update: { key, url } },
        };
      }
      return this.prismaService.userProfile.update({
        where: { userId },
        data: updateUserProfileData,
        include: {
          profilePhoto: { select: { url: true } },
          education: true,
          professionalExperience: true,
        },
      });
    } catch (error) {
      if (pictureKeyAndUrl.length) {
        await this.fileService.removeFile(pictureKeyAndUrl[0].key);
      }
      throw new BadRequestException(error, 'Error updating profile:');
    }
  }

  async updateCompanyProfile(
    userId: string,
    updateProfile: UpdateCompanyProfile
  ): Promise<UpdateCompanyProfileResponse> {
    const pictureKeyAndUrl: { key: string; url: string }[] = [];
    try {
      const { backgroundPhoto, companyPhoto, ...profileData } = updateProfile;
      const updateUserProfileData: Prisma.CompanyProfileUpdateInput = {
        ...profileData,
      };
      const imageTypes: ImageType[] = ['companyPhoto', 'backgroundPhoto'];
      await Promise.all(
        imageTypes.map(async (imageType) => {
          const image = updateProfile[imageType];
          if (image) {
            const { url, key } = await this.handleImages(
              userId,
              image,
              imageType
            );
            pictureKeyAndUrl.push({ key, url });
            updateUserProfileData[imageType] = {
              upsert: { create: { key, url }, update: { key, url } },
            };
          }
        })
      );

      return this.prismaService.companyProfile.update({
        where: { userId },
        data: updateUserProfileData,
        include: {
          companyPhoto: { select: { url: true } },
          backgroundPhoto: { select: { url: true } },
        },
      });
    } catch (error) {
      if (pictureKeyAndUrl.length) {
        for (const { key } of pictureKeyAndUrl) {
          await this.fileService.removeFile(key);
        }
      }
      throw new BadRequestException(error, 'Error updating profile:');
    }
  }

  private async handleEducation(education: UpdateEducation[] | undefined) {
    if (!education) return {};
    const createData: CreateEducation[] = [];
    const updateData: { where: { id: string }; data: UpdateEducation }[] = [];

    education.forEach(({ id, ...edu }) => {
      if (id) {
        updateData.push({ where: { id }, data: edu });
      } else {
        createData.push(edu as CreateEducation);
      }
    });

    const response: any = {};
    if (createData.length) {
      response.createMany = { data: createData };
    }
    if (updateData.length) {
      response.updateMany = updateData;
    }
    return response;
  }

  private async handleProfessionalExperience(
    professionalExperience: UpdateProfessionalExperience[] | undefined
  ) {
    if (!professionalExperience) return {};
    const createData: CreateProfessionalExperience[] = [];
    const updateData: {
      where: { id: string };
      data: UpdateProfessionalExperience;
    }[] = [];
    professionalExperience.forEach(({ id, ...professionalExp }) => {
      if (id) {
        updateData.push({ where: { id }, data: professionalExp });
      } else {
        createData.push(professionalExp as CreateProfessionalExperience);
      }
    });
    const response: any = {};
    if (createData.length) {
      response.createMany = { data: createData };
    }
    if (updateData.length) {
      response.updateMany = updateData;
    }
    return response;
  }

  async findUserProfile(
    id: string,
    userId: string,
    accountType: AccountTypeEnum
  ): Promise<FindOneProfileResponse | null> {
    const userProfile = await this.prismaService.userProfile.findUnique({
      where: { id },
      include: {
        profilePhoto: { select: { url: true } },
        education: true,
        professionalExperience: true,
      },
    });
    if (userId !== userProfile?.userId && accountType !== 'COMPANY')
      throw new ForbiddenException(
        'Only the owner or companies can access this data.'
      );
    return userProfile;
  }

  async findCompanyProfile(
    id: string,
    userId: string
  ): Promise<FindOneCompanyProfileResponse | null> {
    const companyProfile = await this.prismaService.companyProfile.findUnique({
      where: { id },
      include: {
        companyPhoto: { select: { url: true } },
        backgroundPhoto: { select: { url: true } },
      },
    });
    if (userId !== companyProfile?.userId)
      throw new ForbiddenException('Only the owner can access the profile.');
    return companyProfile;
  }
  async findOne(id: string): Promise<FindOneUserResponse | null> {
    return this.prismaService.user.findUnique({
      where: { id },
      include: {
        companyProfile: { select: { id: true } },
        userProfile: {
          include: {
            education: true,
            professionalExperience: true,
            profilePhoto: true,
          },
        },
      },
    });
  }

  async handleImages(
    userId: string,
    image: File | Express.Multer.File[],
    imageType: ImageType
  ) {
    const select = { [imageType]: { select: { key: true } } };
    const userProfile: UserProfileOnHandlingImage =
      await this.prismaService.companyProfile.findUnique({
        where: { userId },
        select,
      });
    const imageKey = userProfile?.[imageType]?.key;
    if (imageKey) await this.fileService.removeFile(imageKey);
    const { key, url } = await this.fileService.uploadFile(
      image[0],
      'public-read'
    );
    return { key, url };
  }
}
