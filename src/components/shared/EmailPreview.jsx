const EmailPreview = ({ emails }) => {
  if (emails.length === 0) return null;
  
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">
          {emails.length} emails found
        </span>
      </div>
      <div className="max-h-40 overflow-y-auto">
        <ul className="list-disc list-inside space-y-1">
          {emails.map((email, index) => (
            <li key={index} className="text-sm text-gray-700">
              {email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmailPreview;