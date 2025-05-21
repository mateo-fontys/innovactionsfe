import axios from 'axios';
import { environment } from '../../../environments/environment';

const apiUrl = `${environment.apiUrl}/report`;

async function submitReport(id: number, formData: FormData, onProgress?: (progress: number) => void) {
  try {
    const response = await axios.post(`${apiUrl}/submit`, formData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const progress = progressEvent.loaded / (progressEvent.total ?? 1) * 100;
          onProgress(Math.round(progress));
        }
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
    return response.data;
  } catch (error) {
    console.error(`Error submitting bug report:`, error);
    throw error;
  }
}

async function getAllBugReports() {
  try {
    const response = await axios.get(`${apiUrl}/getAll`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bug reports:`, error);
    throw error;
  }
}


const BugReportService = {
  submitReport,
  getAllBugReports
};

export default BugReportService;