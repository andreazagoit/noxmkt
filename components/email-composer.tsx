"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { generateEmailHtml } from "@/utils/export";
import { sendEmail } from "@/utils/email";
import ComposerWrapper from "./composer/composer-wrapper";
import EditorWrapper from "./composer/editor-wrapper";
import { Input } from "./ui/input";
import { useDrag, useDrop } from "react-dnd";
import DraggableBlock, { DraggableTypes } from "./draggable-block";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";

const EmailComposer = ({ projectId, onSave }) => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [title, setTitle] = useState("Titolo");
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const blocksList = {
    text: {
      defaultData: {
        value: "Sample Text",
      },
      renderer: {
        component: (props) => (
          <ComposerWrapper
            type={DraggableTypes.EMAIL_RENDERED}
            block={props}
            onClick={() => handleSelectBlock(props.id)}
          >
            <p>{props.value}</p>
          </ComposerWrapper>
        ),
        html: (props) => `<p>${props.value}</p>`,
        text: (props) => `${props.value}\n`,
      },
      editor: ({ block, handlePropertyChange }) => (
        <EditorWrapper>
          <label className="block text-sm font-medium text-gray-700">
            Text Value
          </label>
          <Textarea
            value={block.value}
            onChange={(e) => handlePropertyChange("value", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md h-52"
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
          <ComposerWrapper
            type={DraggableTypes.EMAIL_RENDERED}
            block={props}
            onClick={() => handleSelectBlock(props.id)}
          >
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
        <EditorWrapper>
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
          <ComposerWrapper
            type={DraggableTypes.EMAIL_RENDERED}
            block={props}
            onClick={() => handleSelectBlock(props.id)}
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {props.value}
            </h2>
          </ComposerWrapper>
        ),
        text: (props) => `[Heading: ${props.value}]`,
        html: (props) => `<h2>${props.value}</h2>`,
      },
      editor: ({ block, handlePropertyChange }) => (
        <EditorWrapper>
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
          <ComposerWrapper
            type={DraggableTypes.EMAIL_RENDERED}
            block={props}
            onClick={() => handleSelectBlock(props.id)}
          >
            <div className="my-4">
              <div style={{ height: props.size }}></div>
            </div>
          </ComposerWrapper>
        ),
        text: (props) => `[Spacer: ${props.size}]`,
        html: (props) => `<div style="height: ${props.size};"></div>`,
      },
      editor: ({ block, handlePropertyChange }) => (
        <EditorWrapper>
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
        component: (props) => (
          <ComposerWrapper
            type={DraggableTypes.EMAIL_RENDERED}
            block={props}
            onClick={() => handleSelectBlock(props.id)}
          >
            <div className="my-4">
              <hr className="my-4 border-t-2 border-gray-300" />
            </div>
          </ComposerWrapper>
        ),
        text: (props) => "[Separator]",
        html: (props) =>
          `<hr style="margin: 16px 0; border-top: 2px solid #ccc;" />`,
      },
      editor: () => (
        <div className="text-sm text-gray-700">No properties for separator</div>
      ),
    },
  };

  const addBlock = (key) => {
    const blockTemplate = blocksList[key]?.defaultData;
    if (blockTemplate) {
      setBlocks([
        ...blocks,
        { ...blockTemplate, id: Date.now(), blockType: key },
      ]);
    }
  };

  const handleSelectBlock = (id) => {
    const block = blocks.find((block) => block.id === id);
    if (block) {
      setSelectedBlock(block);
    } else {
      console.warn(`Block with ID ${id} not found`);
    }
  };

  const handlePropertyChange = (key, value) => {
    const updatedBlock = { ...selectedBlock, [key]: value };
    setSelectedBlock(updatedBlock);
    setBlocks(
      blocks.map((block) =>
        block.id === selectedBlock.id ? updatedBlock : block
      )
    );
  };

  const handleSendEmail = async () => {
    /*  const textContent = renderBlocks(blocks, blocksList, "text");
    const htmlContent = generateEmailHtml(
      renderBlocks(blocks, blocksList, "html")
    );

    const mail = await sendEmail({
      projectId: projectId,
      email: "",
      receivers: {
        emails: [],
        tags: [receivers],
      },
      data: {
        title,
        text: textContent,
        html: htmlContent,
      },
    }); */
  };

  const [hoverIndex, setHoverIndex] = useState(null);

  const moveBlock = (fromIndex, toIndex) => {
    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
    updatedBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(updatedBlocks);
  };

  const [, drop] = useDrop({
    accept: DraggableTypes.EMAIL_COMPOSER,
    hover: (item) => {
      const draggedIndex = item.index;
      if (draggedIndex !== hoverIndex) {
        setHoverIndex(draggedIndex);
      }
    },
    drop: (item: any) => {
      console.log(item);
      const { block } = item;

      const newBlock = { ...block, id: Date.now() };
      setBlocks((prevBlocks) => {
        // Add the new block to the end of the array
        return [...prevBlocks, newBlock];
      });
    },
  });

  const [, deleteDrop] = useDrop({
    accept: DraggableTypes.EMAIL_RENDERED,
    hover: (item: any) => {
      setIsDeleteHovered(true); // Set hover state to true when item is dragged over
    },
    drop: (item: any) => {
      console.log(item);
      const blockId = item.block.id;
      setBlocks((prevBlocks) =>
        prevBlocks.filter((block) => block.id !== blockId)
      );
      setIsDeleteHovered(false); // Reset hover state after drop
      setSelectedBlock(null);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const availableBlocks = [
    {
      name: "Heading",
      blockType: "heading",
      data: blocksList["heading"].defaultData,
    },
    {
      name: "Text",
      blockType: "text",
      data: blocksList["text"].defaultData,
    },
    {
      name: "Button",
      blockType: "button",
      data: blocksList["button"].defaultData,
    },
    {
      name: "Spacer",
      blockType: "spacer",
      data: blocksList["spacer"].defaultData,
    },
    {
      name: "Separator",
      blockType: "separator",
      data: blocksList["separator"].defaultData,
    },
  ];

  return (
    <div className="flex flex-row h-full gap-4">
      <div className="flex-[0.75] flex flex-col">
        <Input
          className="mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div
          className="p-4 border border-dashed border-white rounded-md mb-4 flex-1"
          ref={drop as any}
        >
          {renderBlocks(blocks, blocksList, "component")}
        </div>
        <div
          ref={deleteDrop as any}
          className="p-4 border border-dashed border-white rounded-md"
        >
          <p className="text-center text-white">Drag here to delete blocks</p>
        </div>
      </div>
      <div className="bg-neutral-900 flex-[0.25] flex flex-col">
        <div className="p-4 flex-1">
          <h3 className="font-bold mb-2 text-white">Blocks</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableBlocks.map((block, index) => (
              <DraggableBlock
                key={index}
                type={DraggableTypes.EMAIL_COMPOSER}
                block={{ blockType: block.blockType, ...block.data }}
                onClick={() => addBlock(block.blockType)}
              >
                <Card className="aspect-square flex items-center justify-center">
                  {block.name}
                </Card>
              </DraggableBlock>
            ))}
          </div>
          <div className="flex flex-col gap-2 mb-4"></div>
          {selectedBlock && (
            <div>
              {blocksList[selectedBlock.blockType]?.editor({
                block: selectedBlock,
                handlePropertyChange,
              })}
            </div>
          )}
        </div>
        <div className="p-4">
          <Button
            className="w-full"
            onClick={() =>
              onSave({ type: "SEND_EMAIL", data: { title, blocks } })
            }
          >
            Salva
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;

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
