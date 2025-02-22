import React from "react";

const EditorWrapper = ({ children }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-white mb-2">Editor</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export default EditorWrapper;
