"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { NgowHengReport } from "@/utils/ngowHengAnalyzer";

interface AnalysisContextProps {
  report: NgowHengReport | null;
  setReport: (report: NgowHengReport | null) => void;
  capturedImage: string | null;
  setCapturedImage: (image: string | null) => void;
}

const AnalysisContext = createContext<AnalysisContextProps | undefined>(undefined);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [report, setReport] = useState<NgowHengReport | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  return (
    <AnalysisContext.Provider value={{ report, setReport, capturedImage, setCapturedImage }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
