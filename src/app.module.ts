import { Module } from '@nestjs/common';
import { UniversityModule } from './university/university.module';
import { GroupsModule } from './groups/groups.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(String(process.env.MONGO_URI), {
      connectionFactory: (connection) => {
        connection.on('connected', () => console.log('connection to db'));
        connection.on('error', (err: any) => console.error(err));

        return connection;
      },
    }),
    UniversityModule,
    GroupsModule,
    StudentsModule,
  ],
})
export class AppModule {}
