import { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";

export class RedisConfigService {
    
    constructor(private configService: ConfigService) { }

    public connect(): Redis {
        return new Redis({
            host: this.configService.get('DATABASE_REDIS_HOST'),
            port: this.configService.get('DATABASE_REDIS_PORT')
        })
    }
}