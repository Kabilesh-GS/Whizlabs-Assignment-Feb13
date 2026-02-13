import { Injectable } from "@nestjs/common";

export interface IhealthService{
  healthCheck() : string
}

@Injectable()
export class HealthService{
  healthCheck(){
    return "Running !"
  }
}