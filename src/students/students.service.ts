import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './schemas/student.schema';
import { Model } from 'mongoose';
import { getSuccessRes } from 'src/utils/getSuccessRes';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    private readonly groupService: GroupsService,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const { email } = createStudentDto;

    const existsEmail = await this.studentModel.findOne({ email });

    if (existsEmail) throw new ConflictException('Email already exists');

    const student = await this.studentModel.create(createStudentDto);

    return getSuccessRes(student, 201);
  }

  async findAll() {
    const students = await this.studentModel.find().populate({
      path: 'groupId',
      populate: {
        path: 'universityId',
      },
    });
    return getSuccessRes(students);
  }

  async findOne(id: string) {
    const student = await this.studentModel.findById(id);
    if (!student) throw new NotFoundException('Student not found');

    return getSuccessRes(student);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const { groupId } = updateStudentDto;
    if (groupId) {
      await this.groupService.findOne(groupId);
    }

    const updatedStudent = await this.studentModel.findByIdAndUpdate(
      id,
      updateStudentDto,
      { new: true },
    );
    if (!updatedStudent) throw new NotFoundException('Student not found');

    return getSuccessRes(updatedStudent);
  }

  async remove(id: string) {
    const student = await this.studentModel.findByIdAndDelete(id);
    if (!student) throw new NotFoundException('Student not found');

    return getSuccessRes({});
  }
}
