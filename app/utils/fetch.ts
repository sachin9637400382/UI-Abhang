import API_ENDPOINTS from "./api-endpoints";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiResponse<T> {
    StatusCode: number,
    Message: string,
    Data: T;
    error?: string;
    TotalRecordCount: number,
    Page: {
        PageNumber: number,
        PageSize: number
    }
}

export const apiCall = async <T>(
    endpoint: string,
    method: HttpMethod,
    body: Record<string, any> | null = null
): Promise<ApiResponse<T>> => {
    try {
        const options: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
       
        const response = await fetch(`${API_ENDPOINTS.API_BASE_URL}${endpoint}`, options);
        
        if (!response.ok) {
            //throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as ApiResponse<T>;
        return data;
    } catch (error) {
        return { StatusCode: 500, Message: 'Internal Server Error', Data: {} as T, error: "", TotalRecordCount: 0, Page: { PageNumber: 0, PageSize: 0 } };
    }
};
