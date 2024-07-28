import { ApiRequestProps } from '../types/stack.types';
import { dispatchPostRobotRequest } from '../utils/adapter';

class CMA {
  private _connection: any;

  constructor(connection: any) {
    this._connection = connection;
  }

  api(payload: ApiRequestProps): Promise<any> {
    return dispatchPostRobotRequest(this._connection, payload);
  }
}

export default CMA;