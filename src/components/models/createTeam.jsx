import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Description } from "@radix-ui/react-dialog";
import { CircleCheckBig, InfoIcon} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { teamSchema } from "../dashboard/teams/teamSchema";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { getProjectsData } from "@/lib/getProjectsData";
import {useSnapshot} from 'valtio';
import globalState from '@/globalstate/page';
import { createTeam } from "@/api/APICall";
import EmailPreview from "../shared/EmailPreview";
import { Loader2 } from "lucide-react";
import Papa from "papaparse";


export default function CreateTeamModal({ open, onClose }) {
  const snap = useSnapshot(globalState)
  const projects = getProjectsData(snap.projects);
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [useTextField, setUseTextField] = useState(true);
  const [isBotConnected, setIsBotConnected] = useState(false);
  const [parsedEmails, setParsedEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(teamSchema),
    mode: "onChange",
    defaultValues: {
      projectName: "",
      teamName: "",
      useTextField: false,
      emailList: "",
      csvFile: null,
    },
  });

  useEffect(() => {
    if (open) {
      setStep(1); 
    }
  }, [open]);
 
  useEffect(() => {
  if (useTextField) {
    setParsedEmails([]);
    setSelectedFile(null);
    setValue("csvFile", null);
  }
}, [useTextField, setValue]);

  const onSubmit = (data) => {
  setIsLoading(true);
  try{

  
  const formData = new FormData();
  formData.append('teamName', data.teamName);
  formData.append('projectId', data.projectName);

  // Append emails or CSV file based on the toggle
   if (useTextField) {
    const emailsRaw = data.emailList || "";
    const emailsArray = emailsRaw
      .split(/[\n,]+/) // split by comma or new line
      .map(email => email.trim()) // trim whitespace
      .filter(email => email.length > 0); // remove empty strings
    formData.append('members', JSON.stringify(emailsArray));
  } else {
    formData.append('csvFile', data.csvFile);
  }

  createTeam(formData)
    .then((response) => {
      console.log('Team created:', response);
      // Reset form and close modal
      setStep(1);
      setSelectedFile(null);
      setUseTextField(false);
      setIsBotConnected(false);
      onClose();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  catch (error) {
    console.error('Error:', error);
  } finally {
    setIsLoading(false);
    onClose();
  }  
};

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file);
    setValue("csvFile", file, { shouldValidate: true });

    Papa.parse(file, {
      header: false, // We just need plain rows
      skipEmptyLines: true,
      complete: function (results) {
        const emailColumn = results.data
        .map(row => row[0].trim())
        .filter(email => email && email.length > 0);
        setParsedEmails(emailColumn);
        console.log("Parsed Emails:", emailColumn);
        // Optionally: you can also validate email format here
      },
    });
  }
};

  const formValues = watch();
  const isStep1Complete = formValues.teamName;
  const isStep2Complete = useTextField
  ? formValues.emailList && !errors.emailList
  : selectedFile && !errors.csvFile;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-2xl p-6 space-y-6">
        <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
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
        <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
         
         <div className="space-y-2">
           

           <div>
             <Label className="py-2" htmlFor="projectName">Project Name</Label>
             <Select  onValueChange={(val) => setValue("projectName", val)}>
                <SelectTrigger className='w-full '>
                <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent className=' z-50 bg-white'>
                {projects.map((p) => (
                    <SelectItem key={p._id} value={p._id}>
                    {p.name}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
             {errors.projectName && (
               <p className="text-red-500 text-sm mt-1">{errors.projectName.message}</p>
             )}
           </div>


           <div>
             <Label className="py-2" htmlFor="teamName">teamName</Label>
             <Input
               id="teamName"
               {...register("teamName")}
               className={errors.teamName ? "border-red-500" : ""}
             />
             {errors.teamName && (
               <p className="text-red-500 text-sm mt-1">{errors.teamName.message}</p>
             )}
             <Description className="text-gray-400 text-sm font-light p-1">Your team name should be unique</Description>
           </div>
         </div>
       
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
              <div className="mt-2">
                <p className="text-gray-700 mt-2">{`> ${selectedFile.name}`} </p>
                <EmailPreview emails={parsedEmails} />
              </div>            )}
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
             type={step === 3 && isBotConnected ? "submit" : "button"}
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
             onClick={(e) => {
              console.log("buton clicked 1");
              e.preventDefault(); // 👈 prevents accidental form submit
              console.log("buton clicked 2");
              if (step === 3 && isBotConnected) {
                console.log("buton clicked 3");
                onSubmit(formValues);
              } else {
                setStep((prev) => Math.min(prev + 1, 3));
                console.log("buton clicked 4");
              }
            }}
          >
            {step === 3
            ? isLoading
              ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Creating...
                </>
              )
              : "Create Team"
            : "Continue"}
          </Button>
          </div>
          
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
