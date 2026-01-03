import { IsNotEmpty, IsString, Matches, MinLength, Validate } from 'class-validator';
import { IsUsernameUnique } from '../validator/is-username-unique.validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @Validate(IsUsernameUnique)
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Matches(/\d/, { message: 'The field must contain at least one number' })
  password: string;
}
