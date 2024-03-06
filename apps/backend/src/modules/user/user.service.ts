import { BadRequestException, Injectable } from '@nestjs/common';
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
} from '@wagademy/types';
import { FileService } from '../../infra';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService
  ) {}

  async create(createUser: CreateUser): Promise<CreateUserResponse> {
    return this.prismaService.user.create({
      data: { ...createUser },
    });
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

  async update(
    updateUser: UpdateUser,
    userId: string
  ): Promise<UpdateUserResponse> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: updateUser,
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
      if (education) {
        updateUserProfileData.education = {
          upsert: education.map(({ id, ...edu }) => ({
            where: { id },
            update: edu,
            create: edu as CreateEducation,
          })),
        };
      }
      if (professionalExperience) {
        updateUserProfileData.professionalExperience = {
          upsert: professionalExperience.map(({ id, ...professionalExp }) => ({
            where: { id },
            update: professionalExp,
            create: professionalExp as CreateProfessionalExperience,
          })),
        };
      }
      const createResponse = await this.prismaService.userProfile.update({
        where: { userId },
        data: updateUserProfileData,
        include: {
          profilePhoto: { select: { url: true } },
          education: true,
          professionalExperience: true,
        },
      });
      return createResponse;
    } catch (error) {
      if (pictureKeyAndUrl.length) {
        await this.fileService.removeFile(pictureKeyAndUrl[0].key);
      }
      throw new BadRequestException(error, 'Error updating profile:');
    }
  }

  async findUserProfile(id: string) {
    //
  }

  async findOne(id: string): Promise<FindOneUserResponse | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
