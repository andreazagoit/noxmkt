import ProjectModel from "@/models/Project";
import TagModel from "@/models/Tag";

export const createTag = async ({ projectId, name }) => {
  try {
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const newTag = new TagModel({ name: name });
    await newTag.save();

    project.tags.push(newTag._id);
    await project.save();

    return project;
  } catch (error) {
    console.error("Error creating tag and adding to project:", error);
    throw new Error("Could not create tag and add to project");
  }
};
