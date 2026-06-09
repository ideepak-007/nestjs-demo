import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostStatus } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // Create a post
  async createPost(userId: number, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        status: dto.status || 'draft',
        userId,
      },
    });
  }

  //get posts
  async getUserPosts(userId: number, status?: PostStatus) {
    if (status && !Object.values(PostStatus).includes(status as PostStatus)) {
      throw new BadRequestException('Invalid status');
    }
    return this.prisma.post.findMany({
      where: {
        userId,
        ...(status && { status }), // only add status if filter provied
      },
    });
  }

  //Delete Post
  async deletePost(userId: number, postId: number) {
    //find post

    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    //Not found
    if (!post) {
      throw new NotFoundException('post not found');
    }

    //Not owner

    if (post.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    //Delete
    return this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
