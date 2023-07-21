import { toast } from "react-toastify";
import configs from "../config";

export class ApiClient {
  constructor(ctx) {
    this.baseUrl = configs.apiUrl;

    this._ctx = ctx || {};
  }

  _request({ method, url, data, config = {} }) {
    return new Promise((resolve, reject) => {
      let payload = {
        method,
        headers: {
          ...config.headers,
        },
        ...config,
      };

      if (!config.multipart) {
        payload.headers["Content-Type"] = "application/json";
      }

      if (data) {
        if (payload.method === "GET") {
          //   url += "?" + stringify(data);
        } else {
          if (!config.multipart) {
            payload.body = JSON.stringify(data);
          } else {
            payload.body = data;
          }
        }
      }

      fetch(this.baseUrl + url, payload)
        .then((response) => {
          if (response.status === 401) {
            const errText = "Not authorized";
            reject(errText);
            // throw new Error("Not authorized");
          }
          return response.json();
        })
        .then((json) => {
          if (json?.data) {
            if (payload.method === "POST" || payload.method === "PUT") {
              toast.success("Success!");
            }
            resolve(json);
          } else {
            toast.error(json.message);
            reject(json);
          }
        })
        .catch((err) => {
          toast.error(err);
          reject(err);
        });
    });
  }

  get(url, params, config) {
    return this._request({
      method: "GET",
      url,
      data: params,
      config,
    });
  }

  post(url, body, config) {
    return this._request({
      method: "POST",
      url,
      data: body,
      config,
    });
  }

  put(url, body, config) {
    return this._request({
      method: "PUT",
      url,
      data: body,
      config,
    });
  }

  patch(url, body, config) {
    return this._request({
      method: "PATCH",
      url,
      data: body,
      config,
    });
  }

  delete(url, body, config) {
    return this._request({
      method: "DELETE",
      url,
      data: body,
      config,
    });
  }
}

export default new ApiClient();
