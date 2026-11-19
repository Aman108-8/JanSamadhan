import { httpClient } from "./AxiosHelper";

export const registerUser = (data) => {
    return httpClient.post("/auth/users/register", data);
}

export const loginUser = (data) => {
    return httpClient.post("/auth/users/login", data);
}

export const createProblem = (data) => {
    return httpClient.post(`/api/problems/user/${data.userId}`, data);
}

export const getProblemsByUser = (userId) => {
    return httpClient.get(`/api/problems/user/${userId}`);
}

export const deleteProblem = (problemId) => {
    return httpClient.delete(`/api/problems/${problemId}`);
}

export const getProblemCategories = () => {
    return httpClient.get('/api/problem-categories');
};

export const uploadProblemMedia = (reportId, file) => {
    const formData = new FormData();
    formData.append("file", file);

        return httpClient.post(`/api/problem-reports/${reportId}/images`, formData);
}