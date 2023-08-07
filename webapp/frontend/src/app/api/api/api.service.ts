import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL: environment.url,
    timeout: 1000
  });
  private axiosInstance: AxiosInstance;


  constructor() {
    this.axiosInstance = ApiService.axiosInstance;
  }

  // Static wrapper method to forward GET requests
  static get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return ApiService.axiosInstance.get(url, config);
  }

  // Static wrapper method to forward POST requests
  static post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return ApiService.axiosInstance.post(url, data, config);
  }


  public static generateNonce(public_key: string, request_type: string): AxiosPromise<any> {
    if(!public_key || !request_type){
      console.log('public_key and request_type are required');
      console.log("public_key: " + public_key);
      console.log("request_type: " + request_type);
      throw new Error('public_key and request_type are required');
    }
    return ApiService.axiosInstance.post('/nonce', {
      public_key: public_key,
      action: request_type
    });
  }
  public static buildHeaders(public_key: string, signature : string){
    return {
      'x-public-key': public_key,
      'x-signature': signature
    }
  }
  // Wrapper method to forward GET requests
  public async get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    const nonce = await this.generateNonce(public_key, 'GET');
    config = {...config, headers: {...config.headers, 'X-Nonce': nonce}};
    return this.axiosInstance.get(url, config);
  }

  // Wrapper method to forward POST requests
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    const nonce = await this.generateNonce(public_key, 'POST');
    config = {...config, headers: {...config.headers, 'X-Nonce': nonce}};
    return this.axiosInstance.post(url, data, config);
  }

  // Wrapper method to forward PUT requests
  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axiosInstance.put(url, data, config);
  }

  // Wrapper method to forward PATCH requests
  public patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axiosInstance.patch(url, data, config);
  }

  // Wrapper method to forward DELETE requests
  public delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axiosInstance.delete(url, config);
  }

  // Wrapper method to forward HEAD requests
  public head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axiosInstance.head(url, config);
  }

  // Wrapper method to forward OPTIONS requests
  public options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axiosInstance.options(url, config);
  }

  // Add other wrapper methods for additional HTTP methods as needed
}