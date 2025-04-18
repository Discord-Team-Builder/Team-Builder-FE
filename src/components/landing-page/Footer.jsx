
import React from "react";
import { Users } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Users className="h-6 w-6 text-discord" />
            <span className="font-bold text-xl">TeamBuilder</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 items-center">
            <a href="#" className="text-sm text-gray-600 hover:text-discord mb-2 md:mb-0">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-discord mb-2 md:mb-0">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-discord">
              Contact Us
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TeamBuilder. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;