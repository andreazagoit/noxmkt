"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

const blocksList = {
  body: {
    renderer: {
      component: (props) => <div>{props.children}</div>,
      text: (props) => `${props.children}`,
      html: (props) => `<html><body>${props.children}ciao</body></html>`,
    },
    nestedFields: ["children"],
  },
  text: {
    renderer: {
      component: (props) => <p style={{ color: "red" }}>{props.value}</p>,
      text: (props) => `${props.value}`,
      html: (props) => `<p>${props.value}</p>`,
    },
    nestedFields: [],
  },
  row: {
    renderer: {
      component: (props) => (
        <div style={{ display: "flex" }}>{props.children}</div>
      ),
      text: (props) => `[Row: ${props.children}]`,
      html: (props) => `<div>${props.children}</div>`,
    },
    nestedFields: ["children"],
  },
  button: {
    renderer: {
      component: (props) => (
        <button
          className="bg-red-700"
          onClick={() => window.open(props.link, "_blank")}
        >
          {props.children}
        </button>
      ),
      text: (props) => `[Button: ${props.link}]`,
      html: (props) =>
        `<button onclick="window.open('${props.link}', '_blank')">${props.children}</button>`,
    },
    nestedFields: ["children"],
  },
};

const renderBlock = (block, blocksList, format) => {
  const blockType = blocksList[block.element];

  if (blockType) {
    const { renderer, nestedFields } = blockType;

    const renderFunction = renderer[format];

    const blockProps = { ...block.props };

    nestedFields.forEach((nestedField) => {
      if (block.props[nestedField]) {
        const nestedElements = block.props[nestedField];

        const renderedChildren = nestedElements.map((nestedElement, index) =>
          React.isValidElement(renderBlock(nestedElement, blocksList, format))
            ? React.cloneElement(
                renderBlock(nestedElement, blocksList, format),
                { key: index }
              )
            : renderBlock(nestedElement, blocksList, format)
        );

        blockProps[nestedField] =
          format === "component" ? renderedChildren : renderedChildren.join("");
      }
    });

    if (renderFunction) {
      return renderFunction(blockProps);
    }
  }

  return null;
};

const EmailEditor = ({ projectId }) => {
  const [blocksTree, setBlocksTree] = useState({
    element: "body",
    props: {
      children: [
        {
          element: "row",
          props: {
            children: [
              {
                element: "text",
                props: {
                  value: "Example text",
                },
              },
              {
                element: "button",
                props: {
                  link: "Example text",
                },
              },
            ],
          },
        },
      ],
    },
  });

  // Add a new text element
  const addTextElement = () => {
    const newTextElement = {
      element: "text",
      props: {
        value: "New text element",
      },
    };

    setBlocksTree((prevTree) => ({
      ...prevTree,
      props: {
        ...prevTree.props,
        children: [
          ...prevTree.props.children,
          {
            element: "row",
            props: {
              children: [newTextElement],
            },
          },
        ],
      },
    }));
  };

  // Add a new row element
  const addRowElement = () => {
    const newRowElement = {
      element: "row",
      props: {
        children: [],
      },
    };

    setBlocksTree((prevTree) => ({
      ...prevTree,
      props: {
        ...prevTree.props,
        children: [...prevTree.props.children, newRowElement],
      },
    }));
  };

  // Add a new button element
  const addButtonElement = () => {
    const newButtonElement = {
      element: "button",
      props: {
        link: "https://example.com",
        children: ["Click me"],
      },
    };

    setBlocksTree((prevTree) => ({
      ...prevTree,
      props: {
        ...prevTree.props,
        children: [
          ...prevTree.props.children,
          {
            element: "row",
            props: {
              children: [newButtonElement],
            },
          },
        ],
      },
    }));
  };

  // Export to Text format
  const exportToText = () => {
    console.log(renderBlock(blocksTree, blocksList, "text"));
  };

  // Export to HTML format
  const exportToHTML = () => {
    console.log(renderBlock(blocksTree, blocksList, "html"));
  };

  const handleSendEmail = async () => {};

  return (
    <div className="flex flex-row h-full">
      <div className="flex-[0.75] p-4">
        <h3 className="font-bold text-xl mb-2">Rendered Elements</h3>
        {renderBlock(blocksTree, blocksList, "component")}
        {JSON.stringify(blocksTree)}
      </div>
      <div className="bg-neutral-900 flex-[0.25] flex flex-col">
        <div className="p-4 flex-1">
          <h3 className="font-bold mb-2">Blocks</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button className="flex=[0.5]" onClick={addTextElement}>
              Add Text
            </Button>
            <Button className="flex=[0.5]" onClick={addRowElement}>
              Add Row
            </Button>
            <Button className="flex=[0.5]" onClick={addButtonElement}>
              Add Button
            </Button>
          </div>
          <h3 className="font-bold">Settings</h3>
        </div>
        <div className="flex gap-4 w-full p-4">
          <Button className="w-full" onClick={exportToText}>
            Export to Text
          </Button>
          <Button className="w-full" onClick={exportToHTML}>
            Export to HTML
          </Button>
        </div>
        <div className="p-4">
          <Button
            className="w-full"
            onClick={() =>
              console.log(renderBlock(blocksTree, blocksList, "component"))
            }
          >
            Send Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailEditor;
