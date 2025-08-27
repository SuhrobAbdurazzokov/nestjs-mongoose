import { IResponse } from 'src/interfaces/success-response';

export const getSuccessRes = (
  data: object,
  statusCode: number = 200,
  message: string = 'success',
): IResponse => {
  return {
    statusCode,
    message,
    data,
  };
};
