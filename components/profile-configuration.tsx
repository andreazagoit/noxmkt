import { getProfiles } from "@/utils/profiles";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import AddProfileButton from "./add-profile-button";
import DeleteProfileButton from "./delete-profile-button";

type ProfileConfigurationProps = {
  projectId: string;
};

const ProfileConfiguration = async ({
  projectId,
}: ProfileConfigurationProps) => {
  const profiles = await getProfiles(projectId);

  return (
    <div>
      <div className="flex gap-4 justify-between mb-4">
        <h3 className="text-2xl mb-4">Email accounts</h3>
        <AddProfileButton projectId={projectId} />
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>id</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Port</TableHead>
              <TableHead>Secure</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((profile: any, i: number) => (
              <TableRow key={profile._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.host}</TableCell>
                <TableCell>{profile.port}</TableCell>
                <TableCell>{profile.secure ? "v" : "x"}</TableCell>
                <TableCell>
                  <DeleteProfileButton
                    projectId={projectId}
                    profileId={profile._id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProfileConfiguration;
