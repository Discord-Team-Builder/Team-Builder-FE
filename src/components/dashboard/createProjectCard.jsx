import { useState } from "react";
import { FilePlus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateProjectModal from '@/components/models/createProject';

const CreateProjectCard = () => {
  const [open, setOpen] = useState(false);
  const handleCreateProject = () => setOpen((prev) => !prev)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen(true)}
          className="flex flex-col items-center justify-center gap-1 border border-dashed border-gray-300 rounded-lg p-6 hover:shadow-md cursor-pointer transition-all"
        >
          <FilePlus className="h-6 w-6 text-gray-500" />
          <h4 className="font-semibold text-black">Create new project</h4>
          <p className="text-sm text-gray-500">Start a new team collaboration</p>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <CreateProjectModal open={open} onClose={handleCreateProject} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectCard;
