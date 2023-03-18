import axios, { AxiosResponse, AxiosError, AxiosInstance, AxiosBasicCredentials, CancelToken } from 'axios'
import { trimObject } from 'sub_modules/utils/helpers/object'

const Canceller = axios.CancelToken

export type TypeRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type type_service_option = {
	method: TypeRequestMethod
	headers?: {}
	token?: string
	auth?: AxiosBasicCredentials
	query?: any
	data?: any
	onUploadProgress?: (progressEvent: any) => void
	onDownloadProgress?: (progressEvent: any) => void
	cancelToken?: CancelToken
}

class ServiceModel {

	protected static __type = 'service'

	baseUrl: string
	service: AxiosInstance
	headers: { [key: string]: string } | undefined

	constructor(baseURL: string, timeout: number = 0, {
		headers
	}: {
		headers?: { [key: string]: string }
	} = {}) {

		this.baseUrl = baseURL || ''
		this.service = axios.create({
			baseURL,
			timeout,
		})
		this.headers = headers
		return this
	}

	private _getHeaderAuth(token: string) {
		return token ? {
			Authorization: `Bearer ${token}`,
		} : {}
	}

	private async request(url: string, option: type_service_option = {
		method: 'GET',
		headers: {},
		token: undefined,
		auth: undefined,
		query: undefined,
		data: undefined,
		onUploadProgress: undefined,
		onDownloadProgress: undefined,
		cancelToken: undefined,
	}) {
		const b_url = this.baseUrl
		const base_url = b_url[b_url.length - 1] === '/' ? b_url.slice(0, b_url.length - 1) : b_url
		const _url = url[0] === '/' ? url.slice(1, url.length) : url
		const __url = base_url + (base_url ? '/' : '') + _url + ''
		// const canceller = Canceller.source()

		if (process.env.AXIOS_DEBUG === 'true') {
			Log()
			Log('Axios :::> ', __url, trimObject({
				...this.headers ? this.headers : {},
				...option,
				data: option.data,
				res: undefined
			}))
			Log()
		}
		return await this.service.request({
			url: __url, // Stringify the url

			// `headers` are custom headers to be sent
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Cache-Control': 'no-cache',
				...this.headers ? this.headers : {},
				...option.headers ? option.headers : {} as any,
				...this._getHeaderAuth(option?.token as string),

			},

			auth: option.auth,

			// `params` are the URL parameters to be sent with the request
			// Must be a plain object or a URLSearchParams object
			params: option.query,

			// `method` is the request method to be used when making the request
			method: option.method,

			// `data` is the data to be sent as the request body
			// Only applicable for request methods 'PUT', 'POST', and 'PATCH'
			// When no `transformRequest` is set, must be of one of the following types:
			// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
			// - Browser only: FormData, File, Blob
			// - Node only: Stream, Buffer
			data: option.data,

			// `responseType` indicates the type of data that the server will respond with
			// options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
			responseType: 'json', // default

			// `validateStatus` defines whether to resolve or reject the promise for a given
			// HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
			// or `undefined`), the promise will be resolved; otherwise, the promise will be
			// rejected.
			// validateStatus: function(status) {
			// 	return status >= 200 && status < 300; // default
			// },

			// `onUploadProgress` allows handling of progress events for upload
			onUploadProgress: option.onUploadProgress,
			// `onDownloadProgress` allows handling of progress events for downloads
			onDownloadProgress: option.onDownloadProgress,

			// `cancelToken` specifies a cancel token that can be used to cancel the request
			// (see Cancellation section below for details)
			cancelToken: option.cancelToken,
		}).then((res: AxiosResponse) => {
			// this.log('Getting a response', this.baseUrl + url)
			return res.data
		}).catch((err: AxiosError) => {
			// this.warn('Catching an error',  this.baseUrl + url, option)
			// this.warn(err)
			// this.warn(err.response)

			throw {
				status: err.response?.status,
				statusText: err.response?.statusText,
				data: err.response?.data || err.response || err
			}
		})

	}

	generateCanceller() {
		return Canceller.source()
	}

	async GET(url: string, options?: Omit<type_service_option, 'method'>) {
		return this.request(url, {
			method: 'GET',
			...options,
		})
	}

	async POST(url: string, options?: Omit<type_service_option, 'method'>) {
		return this.request(url, {
			method: 'POST',
			...options,
		})
	}

	async DELETE(url: string, options?: Omit<type_service_option, 'method'>) {
		return this.request(url, {
			method: 'DELETE',
			...options,
		})
	}

	async PUT(url: string, options: Omit<type_service_option, 'method'>) {
		return this.request(url, {
			method: 'PUT',
			...options,
		})
	}

	async PATCH(url: string, options?: Omit<type_service_option, 'method'>) {
		return this.request(url, {
			method: 'PATCH',
			...options,
		})
	}

}

export default ServiceModel
