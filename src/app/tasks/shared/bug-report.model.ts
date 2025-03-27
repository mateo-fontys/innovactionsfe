export interface BugReport {
  userId: number;
  taskId: number;
  reportText: string;
  status?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}
