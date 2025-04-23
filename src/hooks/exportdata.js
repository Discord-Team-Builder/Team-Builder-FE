const exportToCSV = (data, headers, filename = "table_data.csv") => {
    const csvRows = [];
  
    // Headers
    csvRows.push(headers.join(","));
  
    // Data
    data.forEach(row => {
      const values = headers.map(header => JSON.stringify(row[header] ?? ""));
      csvRows.push(values.join(","));
    });
  
    // Create blob and download
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  const exportToJSON = (data, filename = "table_data.json") => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  export {
    exportToCSV,
    exportToJSON
  }