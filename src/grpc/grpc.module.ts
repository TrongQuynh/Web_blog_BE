import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "UPLOAD_PACKAGE",  //This name is used for dependency injection and doesn't directly affect the client connection.
        transport: Transport.GRPC,
        options: {
          loader: {
            keepCase: true
          },
          url: "0.0.0.0:5001",
          package: "upload", // This property specifies the package name within your .proto file that defines the gRPC service.
          protoPath: join(__dirname, '../../src/grpc/proto/upload.proto')
        }
      },
      {
        name: "USER_PACKAGE",
        transport: Transport.GRPC,
        options: {
          loader: {
            keepCase: true
          },
          url: "localhost:8000",
          package: "user",
          protoPath: join(__dirname, '../../src/grpc/proto/user.proto')
        }
      }
    ])
  ],
  exports: [ClientsModule]
})
export class GrpcModule {
  constructor() {
    console.log("[PROTO-PATH]", __dirname);
  }
}