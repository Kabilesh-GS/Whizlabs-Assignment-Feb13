import { Injectable,Logger } from "@nestjs/common";

export interface IhealthService{
  healthCheck() : string
}

@Injectable()
export class HealthService{
  private logger = new Logger(HealthService.name, {});
  healthCheck(){
    this.logger.log("request to health check");
    return "Running !"
  }
}