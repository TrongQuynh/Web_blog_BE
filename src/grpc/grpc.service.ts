import { Injectable, OnModuleInit, Inject, HttpStatus } from "@nestjs/common";
import {UserService} from "src/grpc/user";
import { ClientGrpc } from '@nestjs/microservices';
import { CatchException } from "src/common/filters/common-exception.filter";
import { UploadService } from "./upload";
import { take } from "rxjs";

@Injectable()
export class GrpcService implements OnModuleInit{
    private userServiceClient: UserService;
    private uploadServiceClient: UploadService;

    constructor(@Inject('USER_PACKAGE') private grpcAuthService: ClientGrpc, @Inject('UPLOAD_PACKAGE') private grpcUpload: ClientGrpc){}

    onModuleInit() {
        this.userServiceClient = this.grpcAuthService.getService<UserService>("UserService");
        this.uploadServiceClient = this.grpcUpload.getService<UploadService>("UploadService");
    }

    async isTokenValid(token: string): Promise<number | null>{
       try {
        const response = await this.userServiceClient.isValidToken({token}).toPromise();
        // console.log("[isTokenValid]", response);
        
        const {status, data} = response;
        if(status !== HttpStatus.OK) return null;
        else return data;
        
       } catch (error) {
            console.log("[ERROR][gRPC-Service]isTokenValid", String(error));
            throw new CatchException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: [String(error)], data: null });
       }
    }

    updateTargetIdOrMediaRecord(data: {target_id: number, _medias: number[] }){
        try {
            this.uploadServiceClient.UpdateUploadRecord(data).pipe(take(1)).subscribe();
        } catch (error) {
            console.log("[ERROR][gRPC-Service]updateTargetIdOrMediaRecord", String(error));
            throw new CatchException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: [String(error)], data: null });
        }
    }
    

}