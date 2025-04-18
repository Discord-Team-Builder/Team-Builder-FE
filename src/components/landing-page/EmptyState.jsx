
import React from "react";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";


const EmptyState = ({
  title,
  description,
  buttonText,
  buttonIcon = <FolderPlus className="h-4 w-4 mr-2" />,
  onClick
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 h-72">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="h-8 w-8 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
      
      {buttonText && onClick && (
        <Button onClick={onClick} className="bg-discord hover:bg-discord-dark">
          {buttonIcon}
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;