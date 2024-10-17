import axios, { AxiosResponse } from 'axios';
import { ApprovalStatus } from '../models/ApprovalStatus';

const API_URL = 'http://localhost:8080/api/approvalstatus';

/**
 * Fetches all approvalstatus from the API.
 * @returns A promise that resolves to an array of approvalstatus.
 */
export const findAll = async (): Promise<ApprovalStatus[]> => {
    try {
        const response: AxiosResponse<ApprovalStatus[]> = await axios.get<ApprovalStatus[]>(API_URL);
        return response.data; // Return only the data from the response
    } catch (error) {
        console.error('Error fetching approvalstatus:', error);
        throw error; // Propagate the error
    }
};

/**
 * Fetches a ApprovalStatus by its ID.
 * @param id - The ID of the ApprovalStatus to fetch.
 * @returns A promise that resolves to the ApprovalStatus.
 */
export const findById = async (id: string): Promise<ApprovalStatus> => {
    try {
        const response: AxiosResponse<ApprovalStatus> = await axios.get<ApprovalStatus>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ApprovalStatus with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Saves a new ApprovalStatus to the API.
 * @param ApprovalStatus - The ApprovalStatus to save.
 * @returns A promise that resolves to the saved ApprovalStatus.
 */

// export const create = async (ApprovalStatus : ApprovalStatus) => {
//     return axios.post<ApprovalStatus>(API_URL, ApprovalStatus);
// };
export const create = async (ApprovalStatus: ApprovalStatus): Promise<ApprovalStatus> => {
    try {
        const response: AxiosResponse<ApprovalStatus> = await axios.post<ApprovalStatus>(API_URL, ApprovalStatus);
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error saving ApprovalStatus:', error);
        throw error;
    }
};

/**
 * Updates an existing ApprovalStatus.
 * @param ApprovalStatus - The ApprovalStatus to update.
 * @returns A promise that resolves to the updated ApprovalStatus.
 */
export const updateApprovalStatus = async (ApprovalStatus: ApprovalStatus): Promise<ApprovalStatus> => {
    try {
        const response: AxiosResponse<ApprovalStatus> = await axios.put<ApprovalStatus>(`${API_URL}/${ApprovalStatus.id}`, ApprovalStatus);
        return response.data;
    } catch (error) {
        console.error('Error updating ApprovalStatus:', error);
        throw error;
    }
};

/**
 * Deletes a ApprovalStatus by its ID.
 * @param code - The ID of the ApprovalStatus to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteApprovalStatus = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting ApprovalStatus with ID ${id}:`, error);
        throw error;
    }
};