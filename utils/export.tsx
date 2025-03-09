import React from "react";

export const generateEmailHtml = (htmlContent: string) => {
  return `
    <!DOCTYPE html>
    <html lang="it">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Conferma iscrizione alla newsletter</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
            text-align: center;
          }
          p {
            color: #555;
            font-size: 16px;
          }
          h2 {
            color: #333;
            font-size: 24px;
            font-weight: bold;
          }
          .footer {
            font-size: 12px;
            text-align: center;
            color: #888;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${htmlContent}
        </div>
      </body>
    </html>
  `;
};

export const renderBlock = (
  block,
  blocksList,
  mode: "component" | "html" | "text"
) => {
  for (const key in block.props) {
    const value = block.props[key];

    if (Array.isArray(value)) {
      block.props[key] = value.map((child, index) =>
        child?.blockType ? (
          <React.Fragment key={index}>
            {renderBlock(child, blocksList, mode)}
          </React.Fragment>
        ) : (
          child
        )
      );
    } else if (value?.blockType) {
      block.props[key] = renderBlock(value, blocksList, mode);
    }
  }

  const renderer = blocksList[block.blockType]?.renderer?.[mode];
  if (!renderer) {
    console.warn(`Renderer not found for block type: ${block.blockType}`);
    return null;
  }

  const renderedContent = renderer(block.props);

  if (mode === "component") {
    return <React.Fragment>{renderedContent}</React.Fragment>;
  }

  return renderedContent.join ? renderedContent.join("") : renderedContent;
};

export const renderBlocks = (
  blocks,
  blocksList,
  mode: "component" | "html" | "text"
) => {
  const renderResults = blocks.map((block) => {
    const renderer = blocksList[block.blockType]?.renderer?.[mode];

    if (!renderer) {
      console.warn(`Renderer not found for block type: ${block.blockType}`);
      return null;
    }

    return renderer(block);
  });

  if (mode === "component") {
    return (
      <React.Fragment>
        {renderResults.map((block, index) => (
          <React.Fragment key={index}>{block}</React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  return renderResults.filter(Boolean).join("");
};
