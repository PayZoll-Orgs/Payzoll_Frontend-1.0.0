"use client";

import React, { useState, DragEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import "../../styles/gradients.css";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#131620]/90 backdrop-filter backdrop-blur-md w-full max-w-xl mx-4 rounded-2xl border border-[#22304a]/40 overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#22304a]/30 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#F2F2F2] font-mono" style={{
              textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
            }}>Bulk Upload Employees</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Download Template Section */}
            <InfoCard />

            {/* Upload Section */}
            <UploadSection dragActive={dragActive} handleDrag={handleDrag} handleDrop={handleDrop} handleChange={handleChange} selectedFile={selectedFile} />

            {/* Guidelines */}
            <Guidelines />
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-[#22304a]/30 flex justify-end space-x-4">
            <button 
              onClick={onClose} 
              className="px-6 py-2 rounded-xl border border-[#22304a]/40 text-gray-400 hover:text-white hover:border-[#22304a] transition-colors font-mono text-xs sm:text-sm bg-[#0c0f16]/60 backdrop-blur-sm"
            >
              Cancel
            </button>
            <button 
              className="px-6 py-2 rounded-xl bg-[#2D8B75] text-white hover:bg-[#2D8B75]/90 transition-all border border-[#2D8B75]/30 text-xs sm:text-sm font-bold font-mono shadow-md shadow-[#2D8B75]/20"
              aria-label="Upload and process file"
            >
              Upload & Process
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const InfoCard: React.FC = () => (
  <div className="bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl p-4 border border-[#22304a]/30 flex items-start space-x-4">
    <div className="w-10 h-10 rounded-lg bg-[#131620]/80 flex items-center justify-center border border-[#22304a]/30">
      <FileSpreadsheet className="w-5 h-5 text-[#2D8B75]" />
    </div>
    <div className="flex-1">
      <h3 className="font-semibold mb-1 text-[#F2F2F2] font-mono">Download Template</h3>
      <p className="text-sm text-gray-400 mb-2 font-mono">Use our template to ensure your data is formatted correctly</p>
      <button 
        className="text-[#2D8B75] text-sm hover:text-[#2D8B75]/80 transition-colors font-mono"
        aria-label="Download template file"
      >
        Download Template →
      </button>
    </div>
  </div>
);

interface UploadSectionProps {
  dragActive: boolean;
  handleDrag: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
}

const UploadSection: React.FC<UploadSectionProps> = ({ dragActive, handleDrag, handleDrop, handleChange, selectedFile }) => (
  <div
    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors backdrop-blur-sm ${
      dragActive 
        ? "border-[#2D8B75] bg-[#2D8B75]/10" 
        : "border-[#22304a]/30 hover:border-[#22304a]"
    }`}
    onDragEnter={handleDrag}
    onDragLeave={handleDrag}
    onDragOver={handleDrag}
    onDrop={handleDrop}
  >
    <input 
      type="file" 
      accept=".csv,.xlsx,.xls" 
      onChange={handleChange} 
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
      aria-label="Upload CSV or Excel file"
      title="Upload employee data file"
    />
    <div className="space-y-4">
      <div className="w-16 h-16 rounded-full bg-[#0c0f16]/90 mx-auto flex items-center justify-center border border-[#22304a]/30">
        <Upload className="w-8 h-8 text-[#2D8B75]" />
      </div>
      <h4 className="font-semibold mb-2 text-[#F2F2F2] font-mono">{selectedFile ? selectedFile.name : "Drop your file here"}</h4>
      <p className="text-sm text-gray-400 font-mono">Support for CSV and Excel files</p>
    </div>
  </div>
);

const Guidelines: React.FC = () => (
  <div className="bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl p-4 border border-[#22304a]/30 flex items-start space-x-3">
    <AlertCircle className="w-5 h-5 text-[#B38D36] flex-shrink-0 mt-0.5" />
    <div className="text-sm text-[#F2F2F2]">
      <p className="font-semibold mb-1 font-mono">Important Guidelines:</p>
      <ul className="list-disc pl-4 space-y-1 text-gray-400 font-mono">
        <li>Ensure all required fields are filled</li>
        <li>Wallet addresses must be valid</li>
        <li>Maximum 100 employees per upload</li>
        <li>File size should not exceed 5MB</li>
      </ul>
    </div>
  </div>
);

export default BulkUploadModal;