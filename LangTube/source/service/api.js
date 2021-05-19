/** api는 특정 경로의 특정메소드로 들어오는 요청을 받고 요청 값에 따라 다른 결과를 response */
/** 이때 response의 형태는 JSON */
/** 서버와 통신을 위한 연결 */

const BASE_URL = "http://192.168.0.3:3333";

export const api = async (url, method, body = null, headers = {}) => {

    try {
      const endPoint = BASE_URL.concat(url);
      const reqBody = body ? JSON.stringify(body) : null;

      const fetchParams = {method, headers};

      if((method === "POST" || method === "PUT") && !reqBody) {
          throw new Error("Request body required");
      }

      if(reqBody) {
          fetchParams.headers["Content-type"] = "application/json";
          fetchParams.body = reqBody;
      }

      const fetchPromise = fetch(endPoint, fetchParams);
      const timeOutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
              reject("Request Timeout");
          }, 3000);
      });

      const response = await Promise.race([fetchPromise, timeOutPromise]);

      return response;
    } catch (e) {
      return e;
    }
}

export const fetchApi = async (url, method, body, statusCode, token = null, loader = false) => {
    try {
        const headers = {}
        const result = {
            token: null,
            success: false,
            responseBody: null
        };
        if(token) {
            headers["x-auth"] = token;
        }

        const response = await api(url, method, body, headers);

        //console.log(response);

        if(response.status === statusCode) {
            result.success = true;

            if(response.headers.get("x-auth")) {
                result.token = response.headers.get("x-auth");
            }

            let responseBody;
            const responseText = await response.text();

            try {
                responseBody = JSON.parse(responseText);
            } catch (e) {
                responseBody = responseText;
            }

            result.responseBody = responseBody;
            return result;

        }

        let errorBody;
        const errorText = await response.text();

        try {
            errorBody = JSON.parse(errorText);
        } catch (e) {
            errorBody = errorText;
        }

        result.responseBody = errorBody;

        console.log(result);

        throw result;
    } catch (error) {
        return error;
    }
}