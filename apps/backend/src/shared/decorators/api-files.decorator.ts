import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

export function ApiFiles(files: string[], maxCount?: number | number[]) {
  const uploadFields = files.map((file, index) => ({
    name: file,
    maxCount: Array.isArray(maxCount) ? maxCount[index] ?? 1 : maxCount ?? 1,
  }));
  return applyDecorators(
    UseInterceptors(FileFieldsInterceptor(uploadFields)),
    ApiConsumes('multipart/form-data')
  );
}
