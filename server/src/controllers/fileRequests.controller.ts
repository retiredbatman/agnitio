import { NextFunction, Response } from 'express';
import { FileRequestService } from '@/services/fileRequests.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { FileRequest } from '@/interfaces/fileRequests.interface';
import * as canvas from 'canvas';

export class FileRequestsController {
  public fileRequestsService = new FileRequestService();

  public createFileRequest = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { user } = req;
    const { name } = req.body;
    const { file } = req.files;
    const img = await canvas.loadImage(file.tempFilePath);
    try {
      const fileRequestData = this.fileRequestsService.createFileRequest(img, user, name);
      res.json(fileRequestData);
    } catch (error) {
      next(error);
    }
  };

  public getRequests = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user } = req;
      const findAllFileRequests: FileRequest[] = await this.fileRequestsService.findAllRequests(user);

      res.status(200).json(findAllFileRequests);
    } catch (error) {
      next(error);
    }
  };
}
