
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the automatic team assignment work?",
    answer: "Our system uses a balanced algorithm to randomly assign students to teams while ensuring equal distribution. You can define the number of teams and maximum members per team. Admins can also manually adjust assignments if needed."
  },
  {
    question: "Do students need to create an account?",
    answer: "No! Students simply sign in with their Discord account using the invitation link. This creates a seamless experience with no extra accounts to manage."
  },
  {
    question: "What permissions does the Discord bot need?",
    answer: "The bot needs permissions to create and manage roles, create and manage channels, and assign roles to members within your Discord server."
  },
  {
    question: "Can I customize teams after they're formed?",
    answer: "Yes, as an admin you can move students between teams, remove students, or promote members to team leaders at any time."
  },
  {
    question: "Is my data secure?",
    answer: "We take data security seriously. We only store the minimum information needed to operate the service, and all connections to Discord use OAuth2, the industry standard for secure authorization."
  },
  {
    question: "How many projects can I create?",
    answer: "You can create multiple projects and be a member of multiple teams across different projects. Each project has its own separate teams and permissions."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Common questions about TeamBuilder and how it works
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;