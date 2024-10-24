import axios, { type AxiosInstance } from 'axios'

import type { App } from 'vue'

export let httpClient: AxiosInstance

export const initHttpClientPlugin = (app: App, options: { baseURL?: string }) => {
  httpClient = axios.create({
    withCredentials: false,
    baseURL: options.baseURL,
  })
}
