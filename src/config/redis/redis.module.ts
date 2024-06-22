/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {Module, Inject} from "@nestjs/common";
import { Redis } from "ioredis";
import { RedisConfigService } from "./redis-config.service";
import { ConfigService } from "@nestjs/config";
@Module({
    providers:[
        {
            provide: 'REDIS_CLIENT',
            useFactory: (ConfigService)=> new RedisConfigService(ConfigService).connect(),
            inject: [ConfigService]
        }
    ],
    exports: ['REDIS_CLIENT']
})
export class RedisModule{
    constructor(@Inject("REDIS_CLIENT") private readonly redisClient: Redis){
        this.checkConnection();
    }

    private async checkConnection(): Promise<void>{
        try {
            await this.redisClient.ping();
            console.log("[REDIS]: Connect Success");
            
        } catch (error) {
            console.log("[REDIS]: Connect Fail", error);
        }
    }
}