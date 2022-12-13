import { FileRequestsController } from '@/controllers/fileRequests.controller';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class FileRequestsRoute implements Routes {
  public path = '/requests';
  public router = Router();
  public fileRequestsController = new FileRequestsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, this.fileRequestsController.createFileRequest);
    this.router.get(`${this.path}`, authMiddleware, this.fileRequestsController.getRequests);
  }
}
