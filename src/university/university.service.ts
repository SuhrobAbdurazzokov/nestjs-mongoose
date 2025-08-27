import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { InjectModel } from '@nestjs/mongoose';
import { University } from './schemas/university.schema';
import { Model } from 'mongoose';
import { IResponse } from 'src/interfaces/success-response';
import { getSuccessRes } from 'src/utils/getSuccessRes';

export class UniversityService {
  constructor(
    @InjectModel(University.name)
    private readonly universityModel: Model<University>,
  ) {}
  async create(createUniversityDto: CreateUniversityDto): Promise<IResponse> {
    const email = createUniversityDto.email;
    const existsEmail = await this.universityModel.findOne({ email });

    if (existsEmail) throw new ConflictException('Email already exists');

    const university = await this.universityModel.create(createUniversityDto);
    return getSuccessRes(university, 201);
  }

  async findAll() {
    const universities = await this.universityModel.find().populate({
      path: 'groups',
      populate: {
        path: 'students',
      },
    });

    return getSuccessRes(universities);
  }

  async findOne(id: string): Promise<IResponse> {
    const university = await this.universityModel.findOne({ _id: id }).populate({
      path: 'groups',
      populate: {
        path: 'students',
      },
    });;
    if (!university) throw new NotFoundException('University not found');
    return getSuccessRes(university);
  }

  async update(id: string, updateUniversityDto: UpdateUniversityDto) {
    const university = await this.universityModel.findByIdAndUpdate(
      id,
      updateUniversityDto,
      { new: true },
    );
    if (!university) throw new NotFoundException('University not found');

    return getSuccessRes(university);
  }

  async remove(id: string) {
    const university = await this.universityModel.findByIdAndDelete(id);
    if (!university) throw new NotFoundException('University not found');

    return getSuccessRes({});
  }
}
