import type { Request } from "express";

type MulterFiles =
  | Express.Multer.File[]
  | Record<string, Express.Multer.File[]>
  | undefined;

export function getUploadedFiles(
  req: Request,
  fieldName = "images"
): Express.Multer.File[] {
  const files = req.files as MulterFiles;

  if (!files) return [];
  if (Array.isArray(files)) return files;

  if (typeof files === "object") {
    const fieldFiles = files[fieldName];
    if (Array.isArray(fieldFiles)) return fieldFiles;

    return Object.values(files).flat();
  }

  return [];
}
