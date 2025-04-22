import { useState } from "react";
import { FilePlus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CreateProjectCard = () => {
  const [open, setOpen] = useState(false);

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

        <form className="space-y-4">
          <input
            name="project-name"
            type="text"
            placeholder="Project Name"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-discord"
          />
          <textarea
            name="project-description"
            placeholder="Project Description"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-discord"
          />
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectCard;
