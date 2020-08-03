import { Response, Request, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

export interface CustomSuccess {
  meta?: {
    take: number;
    itemCount: number;
    page: number;
    pageCount: number;
  };
  message?: any;
  code?: number;
}

interface Error{
  status?: number;
  message?: string;
  detail?: any;
}

class ResponseHelper {
  static get HTTP_STATUS() {
    return HttpStatus;
  }

  static middlewareResponse(req: Request, res: Response, next: NextFunction) {
    res.onSuccess = ResponseHelper.getDefaultResponseHandler(res).onSuccess;
    res.onError = ResponseHelper.getDefaultResponseHandler(res).onError;
    return next();
  }

  static getDefaultResponseHandler(res: Response) {
    return {
      onSuccess(data: any, custom: CustomSuccess = {}) {
        const {
          meta, 
          message, 
          code
        } = custom;
        return res.status(code || ResponseHelper.HTTP_STATUS.OK).json({
          success: true,
          message,
          data,
          meta,
        });
      },
      onError(error: Error) {
        let status = error.status || 500;
        let message = error.message;
        let detail = error.detail.errors ? error.detail : error.detail.message || error.detail
        if(!message){
          switch (status) {
            case 500:
              message = 'Server error';
              break;
            case 400:
              message = 'Bad Request';
              break;
            case 404:
              message = 'Not Found';
              break;
            default:
              message = 'Unknown error';
              break;
          }
        }
        return res.status(status).json({
          success: false,
          status,
          detail,
          message,
        });
      },
    };
  }
}
export default ResponseHelper;
