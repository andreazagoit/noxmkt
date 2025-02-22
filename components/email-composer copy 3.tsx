"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { generateEmailHtml, renderBlock } from "@/utils/export";
import { sendEmail } from "@/utils/email";
import ComposerWrapper from "./composer/composer-wrapper";
import EditorWrapper from "./composer/editor-wrapper";
import { Input } from "./ui/input";
import { generateBlockList } from "@/utils/blocksList";

const EmailComposer = ({ projectId }) => {
  type Block = {
    id: string;
    blockType: string;
    props: { [key: string]: Block[] | Block | any };
  };

  const [blocks, setBlocks] = useState<Block>({
    blockType: "container",
    props: {
      children: [
        {
          blockType: "heading",
          props: { value: "Test" },
          id: Date.now(),
        },
        {
          blockType: "text",
          props: { value: "Ciao!" },
          id: Date.now(),
        },
      ],
    },
    id: Date.now().toString(),
  });
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [receivers, setReceivers] = useState("Everyone");

  const blocksList = {
    text: {
      defaultData: {
        value: "Sample Text",
      },
      renderer: {
        component: (props) => (
          <ComposerWrapper onClick={() => handleSelectBlock(props.id)}>
            <p className="text-base">{props.value}</p>
          </ComposerWrapper>
        ),
        text: (props) => `${props.value}`,
        html: (props) => `<p>${props.value}</p>`,
      },
      editor: ({ block, handlePropertyChange }) => (
        <EditorWrapper title="Text Block Editor">
          <label className="block text-sm font-medium text-gray-700">
            Text Value
          </label>
          <input
            type="text"
            value={block.value}
            onChange={(e) => handlePropertyChange("value", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </EditorWrapper>
      ),
    },
    container: {
      defaultData: {
        children: [],
      },
      renderer: {
        component: (props) => (
          <ComposerWrapper onClick={() => handleSelectBlock(props.id)}>
            <div className="bg-red flex flex-col">{props.children}</div>
          </ComposerWrapper>
        ),
        text: (props) => `${props.value}`,
        html: (props) => `<div>${props.value}</div>`,
      },
      editor: ({ block, handlePropertyChange }) => (
        <EditorWrapper title="Text Block Editor">
          <label className="block text-sm font-medium text-gray-700">
            Text Value
          </label>
          <input
            type="text"
            value={block.value}
            onChange={(e) => handlePropertyChange("value", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </EditorWrapper>
      ),
    },
    row: {
      defaultData: {
        children: [],
      },
      renderer: {
        component: (props) => (
          <ComposerWrapper onClick={() => handleSelectBlock(props.id)}>
            <div className="flex">{props.children}</div>
          </ComposerWrapper>
        ),
        text: (props) => `${props.children}`,
        html: (props) => `<div>${props.value}</div>`,
      },
      editor: ({ block, handlePropertyChange }) => (
        <EditorWrapper title="Text Block Editor">
          <label className="block text-sm font-medium text-gray-700">
            Text Value
          </label>
          <input
            type="text"
            value={block.value}
            onChange={(e) => handlePropertyChange("value", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </EditorWrapper>
      ),
    },
    button: {
      defaultData: {
        link: "https://example.com",
        children: "Click Me",
      },
      renderer: {
        component: (props) => (
          <ComposerWrapper onClick={() => handleSelectBlock(props.id)}>
            <button className="bg-neutral-700 text-white py-2 px-4 rounded">
              {props.children}
            </button>
          </ComposerWrapper>
        ),
        text: (props) => `[Button: ${props.link}]`,
        html: (props) =>
          `<a href="${props.link}" target="_blank" style="display: inline-block; background-color: #007BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; text-align: center;">${props.children}</a>`,
      },
      editor: ({ block, handlePropertyChange }) => (
        <EditorWrapper title="Button Block Editor">
          <label className="block text-sm font-medium text-gray-700">
            Button Text
          </label>
          <input
            type="text"
            value={block.children}
            onChange={(e) => handlePropertyChange("children", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <label className="block text-sm font-medium text-gray-700">
            Button Link
          </label>
          <input
            type="text"
            value={block.link}
            onChange={(e) => handlePropertyChange("link", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </EditorWrapper>
      ),
    },
    heading: {
      defaultData: {
        value: "Sample Heading",
      },
      renderer: {
        component: (props) => (
          <ComposerWrapper onClick={() => handleSelectBlock(props.id)}>
            <h2 className="text-2xl font-semibold text-gray-800">
              {props.value}
            </h2>
          </ComposerWrapper>
        ),
        text: (props) => `[Heading: ${props.value}]`,
        html: (props) => `<h2>${props.value}</h2>`,
      },
      editor: ({ block, handlePropertyChange }) => (
        <EditorWrapper title="Heading Block Editor">
          <label className="block text-sm font-medium text-gray-700">
            Heading Value
          </label>
          <input
            type="text"
            value={block.value}
            onChange={(e) => handlePropertyChange("value", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </EditorWrapper>
      ),
    },
    spacer: {
      defaultData: {
        size: "32px",
      },
      renderer: {
        component: (props) => (
          <div className="my-4">
            <div style={{ height: props.size }}></div>
          </div>
        ),
        text: (props) => `[Spacer: ${props.size}]`,
        html: (props) => `<div style="height: ${props.size};"></div>`,
      },
      editor: ({ block, handlePropertyChange }) => (
        <EditorWrapper title="Spacer Block Editor">
          <label className="block text-sm font-medium text-gray-700">
            Spacer Size
          </label>
          <select
            value={block.size}
            onChange={(e) => handlePropertyChange("size", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="16px">Small</option>
            <option value="32px">Medium</option>
            <option value="64px">Large</option>
          </select>
        </EditorWrapper>
      ),
    },
    separator: {
      defaultData: {},
      renderer: {
        component: () => (
          <div className="my-4">
            <hr className="my-4 border-t-2 border-gray-300" />
          </div>
        ),
        text: () => "[Separator]",
        html: () =>
          `<hr style="margin: 16px 0; border-top: 2px solid #ccc;" />`,
      },
      editor: () => (
        <div className="text-sm text-gray-700">No properties for separator</div>
      ),
    },
  };

  const handleSelectBlock = () => {};

  const addBlock = (blockType, parentId, parentKey) => {
    const blockDefaults = blocksList[blockType]?.defaultData;
    if (!blockDefaults) return;

    const newBlock = {
      id: Date.now().toString(),
      blockType,
      props: blockDefaults,
    };

    // Recursive function to add the block
    const addBlockRecursively = (blocks) => {
      return blocks.map((block) => {
        if (block.id === parentId) {
          // Return a new block with the new block added to parentKey
          return {
            ...block,
            props: {
              ...block.props,
              [parentKey]: [...block.props[parentKey], newBlock],
            },
          };
        }

        // If the block has children, recursively process them
        if (block.props.children) {
          return {
            ...block,
            props: {
              ...block.props,
              children: addBlockRecursively(block.props.children),
            },
          };
        }

        // Return the block unchanged if no conditions matched
        return block;
      });
    };

    // Process the blocks and update the state
    const updatedBlocks = addBlockRecursively(blocks.props.children);
    setBlocks(updatedBlocks);
  };

  const handleSendEmail = async () => {
    /* const mail = await sendEmail({
      projectId: projectId,
      email: "",
      receivers: {
        emails: [],
        tags: [receivers],
      },
      data: {
        text: textContent,
        html: htmlContent,
      },
    }); */
  };

  return (
    <div className="flex flex-row h-full">
      <div className="flex-[0.75] p-4">
        <Input
          value={receivers}
          onChange={(e) => setReceivers(e.target.value)}
        />
        <h3 className="font-bold text-xl mb-2">Rendered Elements</h3>
        <div
          style={{
            height: 200,
            width: 400,
            background: "red",
            padding: 30,
            display: "flex",
            gap: 40,
          }}
          onClick={() => console.log("external")}
        >
          <div
            style={{ height: 80, width: 80, background: "blue" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevents the event from propagating to the parent
              console.log("internal - blue");
            }}
          >
            1
          </div>
          <div
            style={{ height: 80, width: 80, background: "green" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevents the event from propagating to the parent
              console.log("internal - green");
            }}
          >
            2
          </div>
        </div>
        {renderBlock(blocks, blocksList, "component")}
      </div>
      <div className="bg-neutral-900 flex-[0.25] flex flex-col">
        <div className="p-4 flex-1">
          <h3 className="font-bold mb-2 text-white">Blocks</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              className="flex-[0.5]"
              onClick={() => addBlock("text", blocks, "children")}
            >
              Add Text
            </Button>
            <Button className="flex-[0.5]" onClick={() => addBlock("button")}>
              Add Button
            </Button>
            <Button className="flex-[0.5]" onClick={() => addBlock("heading")}>
              Add Heading
            </Button>
            <Button className="flex-[0.5]" onClick={() => addBlock("spacer")}>
              Add Spacer
            </Button>
            <Button
              className="flex-[0.5]"
              onClick={() => addBlock("separator")}
            >
              Add Separator
            </Button>
          </div>
          {selectedBlock && (
            <div>
              <h4 className="font-semibold text-white mb-2">Editor</h4>
              {blocksList[selectedBlock.blockType]?.editor({
                block: selectedBlock,
                handlePropertyChange,
              })}
            </div>
          )}
        </div>
        <div className="p-4">
          <Button
            className="w-full bg-blue-600 text-white"
            onClick={handleSendEmail}
          >
            Send Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;
