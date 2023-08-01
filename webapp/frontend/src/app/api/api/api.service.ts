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


  public generateNonce(public_key: string, request_type: string): AxiosPromise<any> {
    return this.post('/nonce', {
      public_key: public_key,
      request_type: request_type
    });
  }
  // Wrapper method to forward GET requests
  public get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axiosInstance.get(url, config);
  }

  // Wrapper method to forward POST requests
  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
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