import { create } from 'zustand';

export interface Report {
  id: number;
  title: string;
  location: string;
  time: string;
  status: string;
  statusColor: string;
  type: string;
  typeIcon: any;
  typeColor: string;
  points: number;
  image: string;
}

interface ReportState {
  reports: Report[];
  addReport: (report: Report) => void;
}

export const useReportStore = create<ReportState>((set) => ({
  reports: [],
  addReport: (report) =>
    set((state) => ({
      reports: [report, ...state.reports].slice(0, 3), // keep max 3
    })),
}));