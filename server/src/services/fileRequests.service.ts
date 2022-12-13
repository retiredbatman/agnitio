import * as faceapi from 'face-api.js';
import { User } from '@interfaces/users.interface';
import { FileRequest, FileRequestStatus } from '@/interfaces/fileRequests.interface';
import * as canvas from 'canvas';

export class FileRequestService {
  public fileRequests: FileRequest[] = [];

  public async createFileRequest(file: canvas.Image, user: User, name: string) {
    const id = this.fileRequests.length + 1;
    const fileRequestData: FileRequest = {
      id,
      name,
      userName: user.userName,
      status: FileRequestStatus.QUEUED,
    };
    this.fileRequests.push(fileRequestData);

    setTimeout(async () => {
      this.updateFileRequestRunning(fileRequestData);
      try {
        const detections = await faceapi.detectAllFaces(file as unknown as HTMLImageElement);
        this.updateFileRequestReady(fileRequestData, detections);
      } catch (err) {
        console.error(err);
      }
    }, 1000);
    return fileRequestData;
  }

  public updateFileRequestReady(fileRequestData: FileRequest, detections: faceapi.FaceDetection[]) {
    this.fileRequests = this.fileRequests.map(fileRequest => {
      if (fileRequest.id === fileRequestData.id) {
        return {
          ...fileRequest,
          status: FileRequestStatus.READY,
          attributes: {
            noOfFaces: detections?.length,
          },
        };
      }
      return fileRequest;
    });
  }

  public updateFileRequestRunning(fileRequestData: FileRequest) {
    this.fileRequests = this.fileRequests.map(fileRequest => {
      if (fileRequest.id === fileRequestData.id) {
        return {
          ...fileRequest,
          status: FileRequestStatus.RUNNING,
        };
      }
      return fileRequest;
    });
  }

  public async findAllRequests(user: User) {
    if (user.isAdmin) {
      return this.fileRequests;
    }
    return this.fileRequests.filter(request => request.userName === user.userName);
  }
}
