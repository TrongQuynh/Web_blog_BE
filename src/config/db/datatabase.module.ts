/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './TypeOrmConfig.service';
import { DataSource} from "typeorm";

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports:  [ConfigModule],
            useClass: TypeOrmConfigService
        })
    ]
})
export class DatabaseModule {
    constructor(private dataSource: DataSource){
        console.log(`[DB-CONNECTION]: ${dataSource.isInitialized}`);
        
    }
}