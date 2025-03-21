import AddContactButton from "@/components/add-contact-button";
import ContactsTable from "@/components/contacts-table";
import Container from "@/components/ui/container";
import Nav from "@/components/ui/nav";
import { getContacts } from "@/utils/contact";
import { getProfiles } from "@/utils/profiles";
import { getProjectById } from "@/utils/project";

type AudiencePageProps = {
  params: Promise<{ projectId: string }>;
};

const AudiencePage = async ({ params }: AudiencePageProps) => {
  const { projectId } = await params;
  const contacts = await getContacts(projectId);
  const project = await getProjectById(projectId);

  const profiles = await getProfiles(projectId);

  return (
    <Container>
      <div className="flex flex-wrap gap-4 justify-end">
        <Nav>
          <AddContactButton projectId={project._id} />
        </Nav>
      </div>
      <div className="mb-4">
        <h2 className="text-4xl sm:text-6xl font-semibold mb-4">Audience</h2>
        <ContactsTable contacts={contacts} />
      </div>
    </Container>
  );
};

export default AudiencePage;
