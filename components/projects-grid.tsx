import React from "react";
import { auth } from "@/auth";
import { getProjects } from "@/utils/project";
import ProjectCard from "./project-card";

export default async function ProjectsGrid() {
  const session = await auth();

  const projects = await getProjects(session!.user!.email!);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {projects.map((project: any) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
