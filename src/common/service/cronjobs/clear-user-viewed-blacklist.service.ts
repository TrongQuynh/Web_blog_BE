import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { RedisService } from "src/config/redis/redis.service";

@Injectable()
export class ClearUserViewedBlacklistService {

    constructor(private redisService: RedisService){}

    @Cron("0 0 0 * * *", {
        name: "cron-job-clear-user-viewed-blacklist",
    })
    async handleCron() {
        // TODO: Implement the logic here.
        this.redisService.handleClearAllBlackListViewdPost();
    }
}
