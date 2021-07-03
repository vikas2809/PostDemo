import { get } from 'lodash';

export class Network {
  async getRequest(type): any {
    let request = {
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return request;
  }

  async wrapperWithOptions(url: string, request: any) {
    console.log('request', request);
    try {
      const response = await fetch(url, request);
      console.log('response:', response)
      if (!response.ok) {
        if (response.status === 401 && response.status === 500 && response.status === 400) {
          console.log('Got 401, now calling logout', response);
        }
        const err = await response.json();
        const newError = new Error(get(err, 'title'));
        newError.name = response.status
        throw newError;
      }
      else {
        const res = await response.text();
        console.log('.text ', res)
        return JSON.parse(res);
      }
    }
    catch (error) {
      console.log('Error', error);
      return error;
    }
  }

  getRaw = async (service): Promise<*> => {
    try {
      const request = await this.getRequest('GET');
      return this.wrapperWithOptions(service, request)
    }
    catch (err) {
      throw err;
    }
  }

  postToJson = async (service: ServiceType, data: any): Promise<*> => {
    try {
      const JSONData = JSON.stringify(data);
      return this.postRaw(service, JSONData)
    }
    catch (err) {
      throw err;
    }
  }

  postRaw = async (service: ServiceType, data: any,): Promise<*> => {
    try {
      const request = await this.getRequest('POST');
      request.body = data;
      return this.wrapperWithOptions(service, request)
    }
    catch (err) {
      console.log('Error------>', err)
      throw err;
    }
  }

}

export default new Network();