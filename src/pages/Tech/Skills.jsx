import React from "react";

const Skills = () => {
  const skillGroups = {
    Languages: ["JavaScript", "Python", "Java", "SQL"],
    Frontend: ["React", "Tailwind CSS", "Bootstrap"],
    Backend: ["Node.js", "Express", "JavaFX", "MySQL"],
    Tools: ["Git", "VSCode", "Postman", "Docker"]
  };

  return (
    <section className="p-8 bg-gray-100 dark:bg-gray-800">
      <h3 className="text-3xl font-bold mb-6 text-center">Skills / Tech Stack</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(skillGroups).map(([category, skills]) => (
          <div key={category} className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow">
            <h4 className="text-xl font-semibold mb-2">{category}</h4>
            <ul className="list-disc list-inside">
              {skills.map(skill => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;