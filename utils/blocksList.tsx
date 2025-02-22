import ComposerWrapper from "@/components/composer/composer-wrapper";
import EditorWrapper from "@/components/composer/editor-wrapper";

export const generateBlockList = () => {
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

  return blocksList;
};
