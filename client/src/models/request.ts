export interface Request {
    id: number;
    name: string;
    status: RequestStatus;
    userName: string;
    attributes?: RequestAttributes;
  }
  
  export enum RequestStatus {
    QUEUED,
    RUNNING,
    READY,
  }
  
  export interface RequestAttributes {
    noOfFaces: number;
  }