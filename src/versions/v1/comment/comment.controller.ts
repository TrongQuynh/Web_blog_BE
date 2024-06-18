import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommentService } from './comment.service';

@Controller('v1/comment')
export class CommentController {
    constructor(private commentService: CommentService){}

    @Get("newest-comment")
    async getNewestComment(@Res() response: Response) {
        const _comments = await this.commentService.getNewestComments();
        return response.json({
            status: 200,
            message: "OK",
            data: _comments
        })
    }
}
