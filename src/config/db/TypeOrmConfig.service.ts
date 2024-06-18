/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import {PostEntity, CategoryEntity, UserEntity,CommentEntity, MediaEntity} from "src/common/entity";
import { HashtagEntity } from "src/common/entity/hashtag.entity";


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
                PostEntity, CategoryEntity, UserEntity,CommentEntity, HashtagEntity, MediaEntity
                // __dirname + '/../**/*.entity{.ts,.js}'
            ],
            maxQueryExecutionTime: 1000, // This code will log all queries which run for more than 1 second.
            // synchronize: true
        };
    }
}