"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CopyIcon, CheckIcon, Download, RefreshCwIcon } from 'lucide-react'
import {exportToJSON, exportToCSV} from '@/hooks/exportdata'
import { deleteProject } from "@/api/APICall";

const ROWS_PER_PAGE = 10;

const Table = ({ headers, data, createproject }) => {
  const [filterKey, setFilterKey] = useState("");
  const [filterInputValue, setFilterInputValue] = useState("");
  const [filterSelectValue, setFilterSelectValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const dropdownOptions = useMemo(() => {
    if (!filterKey) return [];
    const uniqueValues = new Set(data.map((row) => row[filterKey]));
    return [...uniqueValues].filter(Boolean);
  }, [filterKey, data]);

 const projectsData = data || [];

  const filteredData = useMemo(() => {
    const value = filterSelectValue || filterInputValue;
    if (!filterKey || !value) return projectsData;


    return projectsData.filter((row) => {
      const rowValue = String(row[filterKey] || "").toLowerCase();
      const filterValue = String(value).toLowerCase();
      return rowValue.includes(filterValue);
    });
  }, [projectsData, filterKey, filterInputValue, filterSelectValue]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil((filteredData?.length || 0) / ROWS_PER_PAGE);

  const handleView = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    deleteProject(selectedRow._id)
    .then(() => {
      alert("Project deleted successfully");
      setSelectedRow(null);
    })
    .catch((error) => {
      console.error("Error deleting project:", error);
      alert("Error deleting project");
    });
    setIsModalOpen(false);
  };

  const headerMap = {
    "s.no": "s.no",
    "projects": "name",
    "Server Id": "guildId",
    "max team": "maxTeams",
    "total team": "teams.length",
    "createdBy": "createdBy"
  };

  const clearFilters = () => {
    setFilterKey("");
    setFilterInputValue("");
    setFilterSelectValue("");
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex md:flex-row flex-col  justify-between items-center">
        <div className="flex md:flex-row flex-col md:w-auto w-full  gap-2">
          <Select className="w-full"
            onValueChange={(val) => {
              setFilterKey(val);
              setFilterInputValue("");
              setFilterSelectValue("");
              setCurrentPage(1); // reset page
            }}
          >
            <SelectTrigger className="md:w-[200px] w-full">
              <SelectValue className="text-gray-300" placeholder="Select column to filter" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
            {headers.map((header) => {
              if (header === "s.no") return null;
              const dataKey = headerMap[header];
              return (
                <SelectItem key={header} value={dataKey}>
                  {header}
                </SelectItem>
              );
            })}
            </SelectContent>
          </Select>

          {filterKey && (
            <div className="relative w-full max-w-sm">
              <Input
                placeholder={`Search in ${filterKey}`}
                value={filterInputValue}
                onChange={(e) => {
                  setFilterInputValue(e.target.value);
                  setCurrentPage(1); // reset page
                }}
                className="pr-10"
              />
            </div>
          )}
          {filterKey && dropdownOptions.length > 0 && (
            <Select className="w-full"
              value={filterSelectValue}
              onValueChange={(val) => {
                setFilterSelectValue(val);
                setCurrentPage(1); // reset page
              }}
            >
              <SelectTrigger className="md:w-[200px] w-full">
                <SelectValue className="text-gray-300" placeholder={`Select ${filterKey}`} />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {dropdownOptions.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex  sm:justify-center md:flex-nowrap flex-wrap gap-2">
        <Button
            variant="outline"
            onClick={clearFilters}
            disabled={!filterKey && !filterInputValue && !filterSelectValue}
            className="cursor-pointer px-2 sm:px-4"
          >
            <RefreshCwIcon/>
          </Button>
        <Button
            variant="outline"
            onClick={() => exportToCSV(filteredData, headers)}
            className="cursor-pointer px-2 sm:px-4"
          >
            <Download />
            Export CSV
          </Button>
          
          {/* <Button
            variant="outline"
            onClick={() => exportToCSV(filteredData, headers)}
            className="cursor-pointer"
          >
            Export CSV
          </Button>
          <Button
            variant="outline"
            onClick={() => exportToJSON(filteredData)}
            className="cursor-pointer"
          >
            Export JSON
          </Button> */}
          <Button onClick={createproject} className=" bg-discord hover:bg-discord-dark text-white cursor-pointer px-2 sm:px-4">
            Create new project +
          </Button>
        </div>
      </div>

      <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-800 font-semibold">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 border-b">
                  {header}
                </th>
              ))}
              <th className="px-4 py-3 border-b">
                  Action
                </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                 {headers.map((header, index) => {
                    let value;

                    if (header === "s.no") {
                      value = idx + 1;
                    } else {
                      const keyPath = headerMap[header];
                      if (keyPath) {
                        value = keyPath.split('.').reduce((acc, part) => acc?.[part], row);
                      } else {
                        value = "-";
                      }
                    }

                    return (
                      <td key={index} className="px-4 py-3 border-b">
                        {value ?? "-"}
                      </td>
                    );
                  })}
                   <td className="px-4 py-3 border-b">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(row)}
                      className="cursor-pointer"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center px-4 py-6">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 items-center mt-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
          <DialogTitle>
            {selectedRow?.projects || "Row Details"}
          </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 relative">
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 z-10 cursor-pointer flex items-center gap-1"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(selectedRow, null, 2));
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
              {JSON.stringify(selectedRow, null, 2)}
            </pre>
          </div>
          <DialogFooter className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={() => alert("Details Clicked!")}>
              Details
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Table;
