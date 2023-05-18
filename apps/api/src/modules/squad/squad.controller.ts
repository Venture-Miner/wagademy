import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { SquadService } from './squad.service';
import { CreateSquadDto, UpdateSquadDto } from '@@/dtos';
import { AuthGuard } from '@@/infra';

@Controller('squad')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() { name }: CreateSquadDto,
    @Req()
    {
      user: { address: owner },
    }: Request & {
      user: {
        address: string;
      };
    },
  ) {
    return this.squadService.create({
      name,
      owner,
      members: [owner],
    });
  }

  @Get()
  findAll() {
    return this.squadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.squadService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSquadDto: UpdateSquadDto,
    @Req()
    {
      user: { address },
    }: Request & {
      user: {
        address: string;
      };
    },
  ) {
    const squad = await this.squadService.findOne(id);
    if (!squad) return new BadRequestException('Squad not found');
    if (squad.owner !== address) {
      return new UnauthorizedException('You are not the owner of this squad');
    }
    return this.squadService.update(id, updateSquadDto);
  }

  @UseGuards(AuthGuard)
  @Patch('join/:id')
  async joinSquad(
    @Param('id') id: string,
    @Req()
    {
      user: { address },
    }: Request & {
      user: {
        address: string;
      };
    },
  ) {
    const squad = await this.squadService.findOne(id);
    if (!squad) return new BadRequestException('Squad not found');
    if (squad.members.includes(address)) {
      return new BadRequestException('You are already a member of this squad');
    }
    return this.squadService.update(id, {
      members: {
        push: address,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Patch('quit/:id')
  async quitSquad(
    @Param('id') id: string,
    @Req()
    {
      user: { address },
    }: Request & {
      user: {
        address: string;
      };
    },
  ) {
    const squad = await this.squadService.findOne(id);
    if (!squad) return new BadRequestException('Squad not found');
    if (!squad.members.includes(address)) {
      return new BadRequestException('You are not a member of this squad');
    }
    return this.squadService.update(id, {
      members: {
        set: squad.members.filter((member) => member !== address),
      },
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req()
    {
      user: { address },
    }: Request & {
      user: {
        address: string;
      };
    },
  ) {
    const squad = await this.squadService.findOne(id);
    if (!squad) return new BadRequestException('Squad not found');
    if (squad.owner !== address) {
      return new UnauthorizedException('You are not the owner of this squad');
    }
    return this.squadService.remove(id);
  }
}
