import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { projectSchema } from "../dashboard/projects/projectSchema";


export default function CreateProjectModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(projectSchema),
  });

 
  const onSubmit = (data) => {
    console.log('Form Data:', data);
  
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-2xl p-6 space-y-6">
        <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader> 
        <div className="text-center">
        
          <div className="flex justify-center mt-2 space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full ${
                  s === step ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
         <form onSubmit={handleSubmit(onSubmit)}>
         <div className="space-y-4">
           <div>
             <Label htmlFor="name">Name</Label>
             <Input
               id="name"
               type="text"
               {...register("name")}
               className={errors.name ? "border-red-500" : ""}
             />
             {errors.name && (
               <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
             )}
           </div>

           <div>
             <Label htmlFor="projectname">Project Name</Label>
             <Input
               id="projectname"
               type="projectname"
               {...register("projectname")}
               className={errors.projectname ? "border-red-500" : ""}
             />
             {errors.projectname && (
               <p className="text-red-500 text-sm mt-1">{errors.projectname.message}</p>
             )}
           </div>

           <div>
             <Label htmlFor="numberOfTeams">Number Of Teams</Label>
             <Input
               id="numberOfTeams"
               type="numberOfTeams"
               {...register("numberOfTeams")}
               className={errors.numberOfTeams ? "border-red-500" : ""}
             />
             {errors.numberOfTeams&& (
               <p className="text-red-500 text-sm mt-1">{errors.numberOfTeams.message}</p>
             )}
           </div>

           <div>
             <Label htmlFor="maxmemberteams">Max Member Of Teams</Label>
             <Input
               id="maxmemberteams"
               type="maxmemberteams"
               {...register("maxmemberteams")}
               className={errors.maxmemberteams ? "border-red-500" : ""}
             />
             {errors.maxmemberteams && (
               <p className="text-red-500 text-sm mt-1">{errors.maxmemberteams.message}</p>
             )}
           </div>

           <div>
             <Label htmlFor="serverid">Discord Server ID</Label>
             <Input
               id="serverid"
               type="serverid"
               {...register("serverid")}
               className={errors.serverid ? "border-red-500" : ""}
             />
             {errors.serverid && (
               <p className="text-red-500 text-sm mt-1">{errors.serverid.message}</p>
             )}
           </div>
         </div>
       </form>
        )}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
