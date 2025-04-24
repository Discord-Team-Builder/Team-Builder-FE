
import React from "react";
import { Users, Bot, Mail, Shield } from "lucide-react";

const features = [
  {
    icon: <Users />,
    title: "Automated Team Formation",
    description: "Automatically create balanced teams based on your requirements. No more manual assignments."
  },
  {
    icon: <Bot />,
    title: "Discord Integration",
    description: "Seamlessly create Discord roles and private channels for each team with our bot integration."
  },
  {
    icon: <Mail />,
    title: "Invitation System",
    description: "Upload student emails and send personalized invites. Track who has joined and who hasn't."
  },
  {
    icon: <Shield />,
    title: "Role-Based Permissions",
    description: "Grant specific permissions to admins, team leaders, and members for better team management."
  }
];

const FeaturesSection= () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600">
            Everything you need to create and manage cohort teams efficiently
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8" 
        >
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-gray-50 hover:shadow-md border outline  transition-shadow"
              style={{
                borderColor: "rgba(0, 0, 0, 0.1)",       
                outlineColor: "rgba(0, 0, 0, 0.1)",  
                outlineWidth: "1px",
                outlineStyle: "solid",
              }}
            >
              <div className="bg-gray-200 text-[#7289DA] w-10 h-10 rounded-full p-2  mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold  mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;