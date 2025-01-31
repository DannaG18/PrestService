import axios, { AxiosResponse} from "axios";

export class GenericService<T, ID> {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    /**
     * Function to build the appropiate URL for the API based on the ID.
     * @param id - Can be a single ID or an object containing composite IDs.
     * @returns a string representing the full URL to call.
     */
    private buildUrl(id: ID): string {
        if (typeof id === 'object' && id !== null) {
            return `${this.apiUrl}/${Object.values(id).join('/')}`;
        }
        return `${this.apiUrl}/${id}`;
    }
    
    async findAll(): Promise<T[]> {
        try {
            const response: AxiosResponse<T[]> = await axios.get<T[]>(this.apiUrl);
            return response.data;
        }catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    /**
     * Fetches an entity by ID (single or composite)
     * @param id - can be a single ID or an object with composite ID
     */
    async findById(id: ID): Promise<T> {
        try {
            const url = this.buildUrl(id);
            const response: AxiosResponse<T> = await axios.get<T>(url);
            return response.data;
        } catch(error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error('Entity not found');
                }
                if (error.response?.status === 500) {
                    console.error('Server error:', error.response.data);
                    throw new Error('Server error occurred');
                }
            }
            console.error(`Error fetching entity with ID ${id}:`, error);
            throw error;
        }
    }

    async create(entity: T): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.post<T>(this.apiUrl, entity);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error saving entity:', error);
            throw error;
        }
    }

    async update(entity: T, id: ID): Promise<T> {
        try {
            const url = this.buildUrl(id);
            const response: AxiosResponse<T> = await axios.put<T>(url, entity);
            return response.data;
        } catch (error) {
            console.error('Error updating entity:', error);
            throw error;
        }
    }

    async delete(id: ID): Promise<void> {
        try {
            const url = this.buildUrl(id);
            await axios.delete(url);
        } catch (error) {
            console.error(`Error deleting entity with ID ${id}:`, error);
            throw error;
        }
    }
}