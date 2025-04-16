export interface Task {
    id?: number; // optional for creation
    title: string;
    description: string;
    payout: number;
    budget: number;
    link: string; 
    image?: string;
    difficulty: 'HIGH' | 'MEDIUM' | 'LOW';
    status?: 'ACCEPTED' | 'PENDING' | 'DECLINED' | 'DEACTIVATED';
  }