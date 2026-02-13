import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  name : string

  @IsEmail()
  email: string
}