import EmailComposer from "@/components/email-composer";
import React from "react";

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
};

const ComposerPage = async ({ params }: RootLayoutProps) => {
  const projectId = (await params).projectId;

  return (
    <div className="flex flex-col h-screen">
      <EmailComposer projectId={projectId} />
    </div>
  );
};

export default ComposerPage;
