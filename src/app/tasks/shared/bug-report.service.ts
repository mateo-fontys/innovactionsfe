
import { environment } from  '../../../environments/environment';
import axios from 'axios';
import { BugReport } from './bug-report.model';


async function submitReport(report: BugReport){
    try {
      const response = await axios.post(`${environment.apiUrl}/report`, report);
      return response.data;
    } catch (error) {
      console.error('Error submitting bug report:', error);
      throw error;
    }
  }

  const BugReportService = {
    submitReport,
  };

  export default BugReportService;  