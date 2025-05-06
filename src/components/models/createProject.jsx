import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { projectSchema } from "../dashboard/projects/projectSchema";
import { Description } from "@radix-ui/react-dialog";
import { CircleCheckBig, InfoIcon} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import globalState from "@/globalstate/page";
import { useSnapshot } from "valtio";


export default function CreateProjectModal({ open, onClose }) {
  const snap = useSnapshot(globalState);
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [useTextField, setUseTextField] = useState(false);
  const [isBotConnected, setIsBotConnected] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(projectSchema),
    mode: "onChange",
    defaultValues: {
      useTextField: false,
      emailList: "",
      csvFile: null,
      projectname: "",
      maxTeam: "",
      maxMember: "",
      serverId: "",
    },
  });

  const filteredGuilds = snap.guilds?.filter(guild => {
    const permissions = BigInt(guild.permissions); // Use BigInt to avoid issues with large numbers
    const hasAdmin = (permissions & 0x00000008n) === 0x00000008n;
    const hasManageServer = (permissions & 0x00000020n) === 0x00000020n;
  
    return guild.owner || hasAdmin || hasManageServer;
  });

  useEffect(() => {
    if (open) {
      setStep(1); 
    }
  }, [open]);
 
  const onSubmit = (data) => {
    console.log('Form Data:', data);
  
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setValue("csvFile", file, { shouldValidate: true }); // Update state with the selected file
    }
  };

  const formValues = watch();
  const isStep1Complete = formValues.projectname && formValues.maxTeam && formValues.maxMember && formValues.serverId;
  const isStep2Complete = useTextField
  ? formValues.emailList && !errors.emailList
  : selectedFile && !errors.csvFile;

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
         <div className="space-y-2">
           

           <div>
             <Label className="py-2" htmlFor="projectname">Project Name</Label>
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
             <Label className="py-2" htmlFor="maxTeam">Number Of Teams</Label>
             <Input
               id="maxTeam"
               type="number"
               {...register("maxTeam")}
               className={errors.maxTeam ? "border-red-500" : ""}
             />
             {errors.maxTeam&& (
               <p className="text-red-500 text-sm mt-1">{errors.maxTeam.message}</p>
             )}
           </div>

           <div>
             <Label className="py-2" htmlFor="maxMember">Max Member Of Teams</Label>
             <Input
               id="maxMember"
               type="number"
               {...register("maxMember")}
               className={errors.maxMember ? "border-red-500" : ""}
             />
             {errors.maxMember && (
               <p className="text-red-500 text-sm mt-1">{errors.maxMember.message}</p>
             )}
           </div>

           <div>
             <Label className="py-2" htmlFor="serverId">Discord Server</Label>
             <Select onValueChange={(value) => setValue("serverId", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a server" />
              </SelectTrigger>
              <SelectContent className="bg-white cursor-pointer">
                {filteredGuilds?.map((guild) => (
                  <SelectItem key={guild._id} value={guild.guildId}>
                    <div className="flex items-center space-x-2">
                      <img
                        src={`https://cdn.discordapp.com/icons/${guild.guildId}/${guild.icon}.png`}
                        alt="server-icon"
                        className="w-5 h-5 rounded-full"
                      />
                      <span>{guild.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
                {errors.serverId && (
                  <p className="text-red-500 text-sm mt-1">{errors.serverId.message}</p>
                )}
                <Description className="text-yellow-600 text-sm font-medium mt-2">
                  ⚠️ Make sure you have the required permissions to add the bot to a server.
                  You must either be the Server <strong>Owner</strong>, have the <strong>Administrator</strong> role, or have the <strong>Manage</strong> Server permission.
                </Description>
             {/* <Description className="text-gray-400 text-sm font-light p-1">Enable Developer Mode (Settings → Advanced), then right-click the server name and click “Copy Server ID”</Description> */}
           </div>
         </div>
       </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
            <Label htmlFor="csvUploadToggle" className="text-sm font-medium">
              {useTextField ? "Enter Student Emails" : "Upload Student List (CSV)"}
            </Label>
            <div className="flex items-center space-x-2">
            <Switch className="data-[state=checked]:bg-discord data-[state=unchecked]:bg-gray-300" id="csvUploadToggle" checked={useTextField} onCheckedChange={setUseTextField} />
              <Label htmlFor="airplane-mode">Custom email</Label>
            </div>
            
            </div>

            {/* Conditionally render based on toggle */}
            {useTextField ? (
              <div>
                
                <textarea
                
                  id="emailList"
                  placeholder="write email of students "
                  type="text"
                  {...register("emailList")}
                  className={errors.emailList ? "border-red-500 w-full h-32" : "w-full h-32"}
                />
                {errors.emailList && (
                  <p className="text-red-500 text-sm mt-1">{errors.emailList.message}</p>
                )}
              </div>
            ) : (
              <div className="relative border border-dashed border-gray-400 rounded-lg py-6 px-4 text-center space-y-2 cursor-pointer hover:bg-gray-50 transition">
                <p className="text-sm text-gray-600">Click to upload CSV</p>
                <p className="text-xs text-gray-400">Only CSV files with email addresses</p>

                <div className="absolute inset-0 opacity-0 z-10">
                  <input
                    type="file"
                    accept=".csv"
                    className="w-full h-full cursor-pointer"
                    onChange={handleFileChange} 
                  />
                </div>
              </div>
            )}
            {selectedFile && (
              <p className="text-gray-700 mt-2">{`> ${selectedFile.name}`} </p> // Show the selected file name
            )}
            <div className=" flex gap-2 text-sm p-3 opacity-70 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
            <InfoIcon/> {!useTextField ? <div><strong> CSV Format:</strong> <p>First column must contain email addresses. Additional columns with student information are optional.</p></div>: <p>
          Enter one or more email addresses separated by <strong>commas</strong> or <strong>new lines</strong>.
        </p>} 
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex flex-col">
              <strong>Bot Setup</strong>
              <p>Connect the Team Builder bot to your Discord server to automate team creation and notifications.</p>
            </div>
            <div className="flex gap-4 items-center">
              <Button 
                type="button" 
                onClick={() => setIsBotConnected(true)} 
                className="text-white  bg-discord hover:bg-discord-dark cursor-pointer">Add bot to server</Button>{!isBotConnected ? <p className="text-amber-700/50 gap-2 flex font-bold"><InfoIcon className="-rotate-180"/> Not Connected</p>: <p className="text-green-600/50 gap-2 flex font-bold"><CircleCheckBig /> Connected</p> }
              
            </div>
            <div className=" flex gap-2 text-sm p-3 opacity-70 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
            <InfoIcon/> <div><strong> Next Steps</strong> 
            <ul className="list-decimal list-outside pl-4 ">
              <li>Make sure the Team Builder bot is added to your Discord server</li>
              <li>Share the invite link with your students</li>
              <li>Students will authenticate with Discord and join the project</li>
              <li>Teams will be formed automatically based on your settings</li>
            </ul>
            </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button 
            className="cursor-pointer"
            variant="outline"   
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}>
            Back
          </Button>
          <div className="flex gap-2 ">
          {step === 2 && 
          <Button 
            className="cursor-pointer"
            variant="outline"   
            onClick={() => setStep((prev) => Math.min(prev + 1, 3))}>
            Skip
          </Button>}
          <Button
            type="button"
            disabled={
              (step === 1 && (!isStep1Complete || Object.keys(errors).length > 0)) ||
              (step === 2 && !isStep2Complete) ||
              (step === 3 && !isBotConnected) // 👈 disable on step 3 if bot not connected
            }
            className={`text-white ${
              ((step === 1 && (!isStep1Complete || Object.keys(errors).length > 0)) ||
              (step === 2 && !isStep2Complete) ||
              (step === 3 && !isBotConnected))
                ? "bg-discord cursor-not-allowed"
                : "bg-discord hover:bg-discord-dark cursor-pointer"
            }`}
            onClick={() => {
              if (step === 3 && isBotConnected) {
                onClose(); // Close the modal
              } else {
                setStep((prev) => Math.min(prev + 1, 3));
              }
            }}
          >
            Continue
          </Button>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
