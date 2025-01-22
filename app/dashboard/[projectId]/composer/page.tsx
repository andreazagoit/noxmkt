import EmailComposer from "@/components/email-composer";
import React from "react";

type ComposerPageProps = {
  params: Promise<{ projectId: string }>;
};

const ComposerPage = async ({ params }: ComposerPageProps) => {
  const projectId = (await params).projectId;

  return (
    <div className="flex flex-col h-screen">
      <EmailComposer projectId={projectId} />
    </div>
  );
};

export default ComposerPage;
