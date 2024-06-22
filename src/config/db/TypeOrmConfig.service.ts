/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

// import {PostEntity, CategoryEntity, UserEntity,CommentEntity, MediaEntity} from "src/common/entity";
// import { HashtagEntity } from "src/common/entity/hashtag.entity";
// import { ReactionEntity } from "src/common/entity/reaction.entity";
// import { UserPostReactionEntity } from "src/common/entity/user_post_reaction.entity";
// import { ViewsEntiy } from "src/common/entity/views.entity";
import {  PostEntity, CategoryEntity, UserEntity,CommentEntity, HashtagEntity, MediaEntity, ViewsEntiy, ReactionEntity, UserPostReactionEntity } from "web-blog-shared-resource";
// import { UserPostReactionEntity } from "web-blog-shared-resource";


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService){}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "mysql",
            host: this.configService.get('DATABASE_HOST'),
            port: this.configService.get('DATABASE_PORT'),
            username: this.configService.get('DATABASE_USERNAME'),
            password: this.configService.get('DATABASE_PWD'),
            database: this.configService.get('DATABASE'),
            logging: ["error"],
            entities: [
                PostEntity, CategoryEntity, UserEntity,CommentEntity, HashtagEntity, 
                MediaEntity, ViewsEntiy, ReactionEntity, UserPostReactionEntity
                // __dirname + '/../**/*.entity{.ts,.js}'
            ],
            maxQueryExecutionTime: 1000, // This code will log all queries which run for more than 1 second.
            // synchronize: true
        };
    }
}