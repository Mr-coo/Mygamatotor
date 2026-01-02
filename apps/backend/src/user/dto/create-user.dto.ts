import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Matches(/\d/, { message: 'The field must contain at least one number' })
  password: string;
}
