import { PostStatus } from '@prisma/client';
import { IsEnum, IsInt } from 'class-validator';

export class GetUserPostsDto {
  @IsInt()
  userId!: number;

  @IsEnum(PostStatus)
  status?: PostStatus;
}
