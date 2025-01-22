import axios from "axios";
import Link from "next/link";
import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

type ProjectCardProps = {
  project: any;
};

const ProjectCard = async ({ project }: ProjectCardProps) => {
  return (
    <Link href={`/dashboard/${project._id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ProjectCard;
