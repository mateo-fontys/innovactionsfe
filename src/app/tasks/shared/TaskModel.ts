export interface Task {
    id?: string; // optional for creation
    title: string;
    description: string;
    payout: number;
    budget: number;
    link: string; 
    status?: 'pending' | 'in_progress' | 'completed';
  }