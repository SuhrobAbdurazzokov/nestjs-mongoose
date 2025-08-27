import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { Model } from 'mongoose';
import { IResponse } from 'src/interfaces/success-response';
import { getSuccessRes } from 'src/utils/getSuccessRes';
import { UniversityService } from 'src/university/university.service';
import path from 'path';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    private readonly universityService: UniversityService,
  ) {}
  async create(createGroupDto: CreateGroupDto): Promise<IResponse> {
    const { name } = createGroupDto;

    if (name) {
      const existsName = await this.groupModel.findOne({ name });
      if (existsName) throw new ConflictException('Name already exists');
    }

    const group = await this.groupModel.create(createGroupDto);

    return getSuccessRes(group, 201);
  }

  async findAll() {
    const groups = await this.groupModel.find().populate({
      path: 'universityId',
    });
    return getSuccessRes(groups);
  }

  async findOne(id: string) {
    const group = await this.groupModel.findById(id).populate('universityId');
    if (!group) throw new NotFoundException('Group not found');

    return getSuccessRes(group);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const { universityId } = updateGroupDto;
    if (universityId) {
      await this.universityService.findOne(universityId);
    }

    const updatedGroup = await this.groupModel.findByIdAndUpdate(
      id,
      updateGroupDto,
      { new: true },
    );

    if (!updatedGroup) throw new NotFoundException('Group not found');

    return getSuccessRes(updatedGroup);
  }

  async remove(id: string) {
    const group = await this.groupModel.findByIdAndDelete(id);
    if (!group) throw new NotFoundException('Grop not found');
    return getSuccessRes({});
  }
}
