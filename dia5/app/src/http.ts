type Methods = "POST" | "DELETE";

const request = (url: string, options?: RequestInit) =>
  fetch(url, options)
    .then((r) => r.json())
    .catch((e) => ({ error: true, message: e.message }));

const createRequest =
  (method: Methods) =>
  <Data>(url: string, data: Data) =>
    request(url, {
      method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

export const get = request;
export const post = createRequest("POST");
export const del = createRequest("DELETE");
