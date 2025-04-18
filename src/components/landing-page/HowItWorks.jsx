
import React from "react";
import { 
  LogIn, 
  FolderPlus, 
  FileUp, 
  Send, 
  UserPlus, 
  MessagesSquare
} from "lucide-react";

const steps = [
  {
    icon: <LogIn className="h-6 w-6 text-discord" />,
    title: "Sign In with Discord",
    description: "Connect your Discord account to get started."
  },
  {
    icon: <FolderPlus className="h-6 w-6 text-discord" />,
    title: "Create a Project",
    description: "Set up your project with team requirements."
  },
  {
    icon: <FileUp className="h-6 w-6 text-discord" />,
    title: "Upload Student List",
    description: "Import students via CSV or add them manually."
  },
  {
    icon: <Send className="h-6 w-6 text-discord" />,
    title: "Send Invitations",
    description: "Students receive invites to join the project."
  },
  {
    icon: <UserPlus className="h-6 w-6 text-discord" />,
    title: "Automatic Assignment",
    description: "Students are assigned to balanced teams."
  },
  {
    icon: <MessagesSquare className="h-6 w-6 text-discord" />,
    title: "Discord Integration",
    description: "Teams get their own Discord roles and channels."
  }
];

const HowItWorks= () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">
            TeamBuilder makes team formation simple with these easy steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border outline  flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, borderColor: "rgba(0, 0, 0, 0.1)",       
              outlineColor: "rgba(0, 0, 0, 0.1)",  
              outlineWidth: "0.1px",
              outlineStyle: "solid", }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-[#7289DA] p-2  mb-4">
                {step.icon}
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-sm mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;