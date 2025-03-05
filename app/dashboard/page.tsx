import NewProject from "@/components/new-project";
import ProjectsGrid from "@/components/projects-grid";
import Container from "@/components/ui/container";
import React from "react";

const DashboardPage = async () => {
  return (
    <div>
      <Container>
        <NewProject />
        <ProjectsGrid />
      </Container>
    </div>
  );
};

export default DashboardPage;
