import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-md mb-2 text-gray-300 bg-gray-700/40">
      <button
        className="w-full p-6 text-left focus:outline-none"
        onClick={toggleAccordion}
      >
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">{title}</span>
          <span>{isOpen ? '▲' : '▼'}</span>
        </div>
      </button>
      {isOpen && (
        <div className="pb-3 px-6 text-[16px]">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
