import { PostStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title!: string;

  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @IsInt()
  userId!: number;
}
