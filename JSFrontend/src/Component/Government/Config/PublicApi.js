import { httpClient } from "./AxiosHelper";

export const getAllProblems = () => {
    return httpClient.get("/api/problems");
}

export const getProblemReportImages = (reportId) => {
    return httpClient.get(`/api/problem-reports/${reportId}/images`);
};

export const getProblemImageUrl = (imageName) => {
    return `${httpClient.defaults.baseURL}/api/problem-reports/file/${encodeURIComponent(imageName)}`;
};

// Update problem status
export const updateProblemStatus = (problemId, status) => {
    return httpClient.put(
        `/api/problems/status/${problemId}`,
        status,
        {
            headers: {
                "Content-Type": "text/plain"
            }
        }
    );
};