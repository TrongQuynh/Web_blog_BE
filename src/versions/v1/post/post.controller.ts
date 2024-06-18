import { Controller, Get, Res, Query, HttpStatus, Param, Req, UseGuards, Post, UsePipes, ValidationPipe, UseFilters, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { CatchException, ExceptionResponse } from 'src/common/filters/common-exception.filter';
import { Request, Response } from "express";
import { isNumber } from 'class-validator';
import { GrpcService } from 'src/grpc/grpc.service';
import { AuthGuard } from 'src/versions/v1/post/guards/auth.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { IHttpResponse } from 'src/common/interface/IHttpResponse';
import { NewPostDTO } from './dto/NewPost.dto';

@Controller('v1/post')
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly postService: PostService, private readonly grpcService: GrpcService) { }

  @Get("list-post")
  async getListPost(@Query() queries: any, @Req() request: Request, @Res() response: Response) {
    try {
      const { limit = 20, skip = 0 } = queries;

      if ((limit && !isNumber(+limit)) || (skip && !isNumber(+skip))) {
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, ["Limit and Skip must be number"], null);
      }

      const data = await this.postService.getListPost(+skip, +limit);

      return response.json({
        status: 200,
        message: "ok",
        data
      });
      
    } catch (error) {
      console.log(error);

      throw new CatchException(error.response);
    }
  }

  @Get("post-suggest")
  async getPostSuggestion(@Res() response: Response) {
    try {
      const _comments = await this.postService.getPostSuggestion();
      console.log("getPostSuggestion", _comments);
      return response.json({
        message: "OK",
        status: 200,
        data: _comments
      })
    } catch (error) {
      throw new CatchException(error.response);
    }
  }

  @Get("test")
  async testRequest(@Req() request: Request) {
    const token = request.headers.authorization;
    console.log("[USER TOKEN]", token);
    return "OK"
  }

  @Get(":id")
  async getPostDetail(@Param("id") post_id: number, @Res() response: Response) {
    try {

      if (!isNumber(+post_id)) {
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, "Post id must be number", null);
      }

      const data = await this.postService.getPostDetail(+post_id);

      if (data == null) throw new ExceptionResponse(HttpStatus.NOT_FOUND, "Post not found", null);
      
      return response.json({
        message: "OK",
        status: 200,
        data
      })

    } catch (error) {
      console.log("[ERROR]", error.response);
      throw new CatchException(error.response);
    }
  }

  @Post("new-post")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(HttpExceptionFilter)
  async createPost(@Req() request: Request, @Body() body: NewPostDTO) {
    try {
      console.log("[createPost]", body);

      const user_id = +request.headers["user_id"];

      const post_id = await this.postService.handleCreateNewPost(body, user_id);

      if (body.medias.length > 0) {
        this.grpcService.updateTargetIdOrMediaRecord({// gRPC to Upload service
          target_id: post_id,
          _medias: body.medias
        });
      }

      const response: IHttpResponse<any> = {
        message: "OK",
        status: HttpStatus.OK,
        data: { post_id }
      }
      return response;
    } catch (error) {
      console.log("Error", error);
      throw new CatchException(error);
    }
  }

}
