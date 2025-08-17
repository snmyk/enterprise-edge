import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface ReportsContextType {
  uploadedReports: Report[];
  addReport: (report: Report) => void;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const useReports = () => {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error('useReports must be used within ReportsProvider');
  return ctx;
};

let nextId = 1000;

export const ReportsProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedReports, setUploadedReports] = useState<Report[]>([]);

  const addReport = (report: Report) => {
    setUploadedReports(prev => {
      const newReports = [
        { ...report, id: nextId++ },
        ...prev
      ];
      return newReports.slice(0, 3); // Only keep max 3
    });
  };

  return (
    <ReportsContext.Provider value={{ uploadedReports, addReport }}>
      {children}
    </ReportsContext.Provider>
  );
};
