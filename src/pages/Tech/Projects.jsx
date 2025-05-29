import React from "react";

const Projects = () => {
  return (
    <section className="p-8 bg-gray-100 dark:bg-gray-800">
      <h3 className="text-3xl font-bold mb-4 text-center">Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-xl shadow bg-white dark:bg-gray-700">
          <h4 className="text-xl font-semibold">Portfolio Website</h4>
          <p>React + Tailwind portfolio with dual identity for tech and artist roles.</p>
          <a href="#" className="text-blue-500">View Code</a>
        </div>
        <div className="p-4 border rounded-xl shadow bg-white dark:bg-gray-700">
          <h4 className="text-xl font-semibold">Inventory Manager</h4>
          <p>JavaFX & MySQL system for managing stock, customers, suppliers, and dashboards.</p>
          <a href="#" className="text-blue-500">View Code</a>
        </div>
      </div>
    </section>
  );
};

export default Projects;