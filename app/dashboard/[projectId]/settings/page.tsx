import CodeBox from "@/components/code-box";
import ProfileConfiguration from "@/components/profile-configuration";
import Container from "@/components/ui/container";
import { getProjectById } from "@/utils/project";
import React from "react";

type SettingsPageProps = {
  params: Promise<{ projectId: string }>;
};

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  return (
    <Container>
      <div className="flex flex-col py-8">
        <h2 className="text-4xl sm:text-6xl font-semibold mb-8">Settings</h2>

        <div className="mb-8">
          <ProfileConfiguration projectId={projectId} />
        </div>

        {/* Section for bearer token */}
        <div className="mb-8">
          <h3 className="text-2xl font-medium mb-4">Bearer Token</h3>
          <CodeBox value={project.token} />
        </div>
      </div>
    </Container>
  );
};

export default SettingsPage;
