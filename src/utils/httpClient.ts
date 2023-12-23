import { Axios, isAxiosError } from 'axios';

class HttpClient {
  client: Axios;
  constructor() {
    this.validateBaseUrl();
    this.client = new Axios({
      baseURL: process.env.BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  private validateBaseUrl() {
    if (process.env.BASE_URL) {
      throw new Error('base url이 제공되지 않았습니다.');
    }
  }

  async get(url: string, params?: any) {
    try {
      const res = await this.client.get(url, { params });
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return new Error(error.message);
      }
      throw new Error(`URL:${url} GET 요청 에러`);
    }
  }

  async post<T>(url: string, data: T) {
    try {
      const res = await this.client.post(url, data);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return new Error(error.message);
      }
      throw new Error(`URL:${url} POST 요청 에러`);
    }
  }
}

export const httpClient = new HttpClient();
