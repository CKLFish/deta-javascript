import fetch from 'node-fetch';

interface Request {
  body?: any;
  method?: string;
  baseURL?: string;
  headers?: { [key: string]: string };
}

interface Response {
  status: number;
  response?: any;
  error?: Error;
}

enum Method {
  Put = 'put',
  Delete = 'delete',
}

export default class Requests {
  private requestConfig: Request;

  /**
   * Requests constructor
   *
   * @param {string} projectKey
   * @param {string} baseURL
   */
  constructor(projectKey: string, baseURL: string) {
    const [projectId] = projectKey.split('_');

    this.requestConfig = {
      baseURL: baseURL.replace(':project_id', projectId),
      headers: {
        'X-API-Key': projectKey,
        'Content-Type': 'application/json',
      },
    };
  }

  /**
   * put sends a HTTP put request
   *
   * @param {string} uri
   * @param {any} payload
   * @returns {Promise<Response>}
   */
  public put(uri: string, payload: any): Promise<Response> {
    return Requests.fetch(uri, {
      ...this.requestConfig,
      body: payload,
      method: Method.Put,
    });
  }

  /**
   * delete sends a HTTP delete request
   *
   * @param {string} uri
   * @returns {Promise<Response>}
   */
  public async delete(uri: string): Promise<Response> {
    return Requests.fetch(uri, {
      ...this.requestConfig,
      method: Method.Delete,
    });
  }

  static async fetch(url: string, config: Request): Promise<Response> {
    const response = await fetch(`${config.baseURL}${url}`, {
      body: JSON.stringify(config.body),
      method: config.method,
      headers: config.headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        error: new Error(data?.errors?.[0] || 'Something went wrong'),
      };
    }

    return { status: response.status, response: data };
  }
}