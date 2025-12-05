import React from 'react';
import { File as CourseFile } from '../types';
import { FileText, Download } from 'lucide-react';
import { formatFileSize } from '../utils/formatters';

interface FileListProps {
  files: CourseFile[];
  title?: string;
}

const FileList: React.FC<FileListProps> = ({ files, title = 'Файлы' }) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
        {files.map((file) => (
          <div key={file.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <a 
              href={file.url} 
              download
              className="btn btn-secondary text-xs p-2 flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Скачать
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;