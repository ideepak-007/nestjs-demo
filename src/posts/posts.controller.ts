import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostStatus } from '@prisma/client';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private postService: PostsService) {}

  //POST //posts
  @Post()
  createPost(@Request() req, @Body() dto: CreatePostDto) {
    return this.postService.createPost(req.user.id, dto);
  }

  //GET /posts/my-posts?status=published
  @Get('my-posts')
  getUserPosts(@Request() req, @Query('status') status?: PostStatus) {
    return this.postService.getUserPosts(req.user.id, status);
  }

  //DELETE /posts/:id
  @Delete(':id')
  deletePost(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(req.user.id, id);
  }
}
