import { Wrench } from 'lucide-react';

const WorkingOnItPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center  text-gray-800 px-4 py-20">
      <Wrench className="w-16 h-16 text-discord animate-pulse mb-4" />
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">We're Working On It</h1>
      <p className="text-center text-lg text-gray-600 max-w-md">
        This page is under construction. We're working hard to bring you something amazing very soon.
      </p>
    </div>
  );
};

export default WorkingOnItPage;
