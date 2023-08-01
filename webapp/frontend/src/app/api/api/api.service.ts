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
  public async get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    const nonce = await this.generateNonce(public_key, 'GET');
    config.headers['Authorization'] = `Bearer ${nonce}`;
    return this.axiosInstance.get(url, config);
  }

  // Wrapper method to forward POST requests
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    const nonce = await this.generateNonce(public_key, 'POST');
    config.headers['Authorization'] = `Bearer ${nonce}`;
    return this.axiosInstance.post(url, data, config);
  }

  // Wrapper method to forward PUT requests
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    const nonce = await this.generateNonce(public_key, 'PUT');
    config.headers['Authorization'] = `Bearer ${nonce}`;
    return this.axiosInstance.put(url, data, config);
  }

  // Wrapper method to forward PATCH requests
  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    const nonce = await this.generateNonce(public_key, 'PATCH');
    config.headers['Authorization'] = `Bearer ${nonce}`;
    return this.axiosInstance.patch(url, data, config);
  }

  // Wrapper method to forward DELETE requests
  public async delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    const nonce = await this.generateNonce(public_key, 'DELETE');
    config.headers['Authorization'] = `Bearer ${nonce}`;
    return this.axiosInstance.delete(url, config);
  }

  // Wrapper method to forward HEAD requests
  public async head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    const nonce = await this.generateNonce(public_key, 'HEAD');
    config.headers['Authorization'] = `Bearer ${nonce}`;
    return this.axiosInstance.head(url, config);
  }

  // Wrapper method to forward OPTIONS requests
  public async options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    const nonce = await this.generateNonce(public_key, 'OPTIONS');
    config.headers['Authorization'] = `Bearer ${nonce}`;
    return this.axiosInstance.options(url, config);
  }

  // Add other wrapper methods for additional HTTP methods as needed
}