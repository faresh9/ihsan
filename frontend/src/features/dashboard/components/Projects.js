// src/components/Projects.js
import React from 'react';
const projectsData = [
    {
      id: 1,
      name: "Project Alpha",
      description: "An innovative project aimed at solving problem X.",
      status: "In Progress",
      image: "https://wallpapercave.com/wp/wp8390008.png" // Placeholder image URL
    },
    {
      id: 2,
      name: "Project Beta",
      description: "A project focused on improving service Y.",
      status: "Completed",
      image: "https://wallpapercave.com/wp/wp2003011.jpg"
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "A research initiative to explore solution Z.",
      status: "Not Started",
      image: "https://wallpapercave.com/wp/wp8486587.jpg"
    },
    {
      id: 4,
      name: "Project Delta",
      description: "A collaborative project to enhance feature W.",
      status: "In Progress",
      image: "https://wallpapercave.com/wp/wp9960747.jpg"
    }
  ];

const Projects = () => {
  return (
    <div className="relative card">
      <h2 className="card-title">projects <span className="badge badge-warning gap-2">BETA</span></h2>
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
        <span className="text-white text-4xl font-bold">Coming Soon</span>
      </div> */}
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {projectsData.map((project) => (
          <div key={project.id} className="card w-full bg-base-100 shadow-xl">
            <figure>
              <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{project.name}</h2>
              <p>{project.description}</p>
              <div className="badge badge-outline">
                {project.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;