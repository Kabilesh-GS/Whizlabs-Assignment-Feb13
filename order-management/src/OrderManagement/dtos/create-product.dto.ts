import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class createProductDto {
  @IsNotEmpty()
  @IsString()
  name : string

  @IsNumber()
  @IsNotEmpty()
  price : number

  @IsNumber()
  @IsNotEmpty()
  stock: number
}