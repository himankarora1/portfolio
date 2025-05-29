import React from "react";

const Resume = () => {
  return (
    <section className="p-8 bg-white dark:bg-gray-900">
      <h3 className="text-3xl font-bold mb-4 text-center">Resume</h3>
      <div className="flex flex-col items-center">
        <embed
          src="/resume.pdf"
          type="application/pdf"
          className="w-full h-[500px] border rounded"
        />
        <a href="/resume.pdf" download className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default Resume;