import DndProviderWrapper from "@/components/DndProvider";
import EmailComposer from "@/components/email-composer";
import React from "react";

type ComposerPageProps = {
  params: Promise<{ projectId: string }>;
};

const ComposerPage = async ({ params }: ComposerPageProps) => {
  const projectId = (await params).projectId;

  return (
    <div className="flex flex-col h-screen">
      {/* <EmailComposer projectId={projectId} /> */}
      <DndProviderWrapper>
        <EmailComposer projectId={projectId} />
      </DndProviderWrapper>
    </div>
  );
};

export default ComposerPage;
