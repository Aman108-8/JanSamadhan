import { httpClient } from "./AxiosHelper";

export const registerUser = (data) => {
    return httpClient.post("/auth/users/register", data);
}

export const loginUser = (data) => {
    return httpClient.post("/auth/users/login", data);
}

export const createProblem = (data) => {
    return httpClient.post("/api/problems", data);
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

export const uploadProblemMedia = (problemId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    return httpClient.post(`/api/problem/${problemId}/images`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}