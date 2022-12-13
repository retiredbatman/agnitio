export interface FileRequest {
  id: number;
  name: string;
  status: FileRequestStatus;
  userName: string;
  attributes?: FileRequestAttributes;
}

export enum FileRequestStatus {
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING',
  READY = 'READY',
}

export interface FileRequestAttributes {
  noOfFaces: number;
}
