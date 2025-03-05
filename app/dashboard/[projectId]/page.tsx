import React from "react";
import { getProjectById, getProjectData } from "@/utils/project";
import Container from "@/components/ui/container";
import { getProfiles } from "@/utils/profiles";
import Chart1 from "@/components/charts/chart-1";
import { Card } from "@/components/ui/card";

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { projectId } = await params;
  const project = await getProjectById(projectId);
  const projectData = await getProjectData(projectId);

  const profiles = await getProfiles(projectId);

  return (
    <Container>
      <div className="flex flex-col py-8">
        <h2 className="text-4xl sm:text-6xl font-semibold mb-8">Dashboard</h2>
        <div className="mb-4 flex gap-4">
          <Card className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Audience</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {projectData.audienceCount}
            </span>
          </Card>
          <Card className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Active User</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              1243
            </span>
          </Card>
          <Card className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Active User</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              1243
            </span>
          </Card>
          <Card className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Active User</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              1243
            </span>
          </Card>
        </div>
        <div className="flex gap-4">
          <Chart1 />
          <Chart1 />
        </div>
      </div>
    </Container>
  );
};

export default ProjectPage;
