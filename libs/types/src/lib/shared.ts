export type Pagination = {
  take?: number;
  skip?: number;
};

export const StatusEnum = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type StatusEnum = (typeof StatusEnum)[keyof typeof StatusEnum];

export type Count = { count: number };

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type UploadFileOutput = { key: string; url: string };

export type File = {
  id: string;
  url: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
};
