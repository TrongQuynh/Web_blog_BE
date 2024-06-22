import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService{
    constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis){}

    public handleAddUserToBlackListViewdPost(post_id: number, user_id: number): void{
        this.redisClient.sadd(`blacklisted_post_viewed`, `${post_id}-${user_id}`);
    }

    public async isUserHaveInBlackListViewdPost(post_id: number, user_id: number): Promise<boolean>{
        return (await this.redisClient.sismember(`blacklisted_post_viewed`, `${post_id}-${user_id}`)) == 1;
    }

    public async handleClearAllBlackListViewdPost(): Promise<void>{
        await this.redisClient.del(`blacklisted_post_viewed`);
        console.log("[Run cronjob] Clear all blacklisted post viewed");
        
    }

}