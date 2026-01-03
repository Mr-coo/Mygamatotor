import { IsNotEmpty, IsString, Matches, MinLength, Validate } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
