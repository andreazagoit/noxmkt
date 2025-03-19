import { auth } from "@/auth";
import NewProject from "@/components/new-project";
import ProjectsGrid from "@/components/projects-grid";
import TestButton from "@/components/test-button";
import Container from "@/components/ui/container";
import React from "react";

const DashboardPage = async () => {
  const data = await auth();

  return (
    <div>
      <TestButton />
      <Container>
        <NewProject />
        <ProjectsGrid />
      </Container>
    </div>
  );
};

export default DashboardPage;
