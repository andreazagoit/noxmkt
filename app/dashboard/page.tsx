import { auth } from "@/auth";
import NewProject from "@/components/new-project";
import ProjectsGrid from "@/components/projects-grid";
import Container from "@/components/ui/container";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");

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
