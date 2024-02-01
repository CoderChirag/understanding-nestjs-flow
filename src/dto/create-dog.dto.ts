import { IsNumber, IsString } from 'class-validator';

export class CreateDogDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;
}
