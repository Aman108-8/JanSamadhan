import { httpClient } from "./AxiosHelper";

export const getAllProblems = () => {
    return httpClient.get("/api/problems");
}