import GoBackButton from "@/components/go-back-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import Nav from "@/components/ui/nav";
import { getActionById } from "@/utils/actions";
import { getEvents } from "@/utils/event";
import React from "react";
import moment from "moment";
import RefreshPageButton from "@/components/refresh-page-button";

const ActionPage = async ({ params }) => {
  const { actionId } = await params;
  const action = await getActionById(actionId);
  const events = await getEvents(actionId);

  return (
    <div>
      <Container className="mb-4">
        <Nav>
          <GoBackButton />
          <RefreshPageButton />
        </Nav>
        <h2 className="text-4xl sm:text-6xl font-semibold mb-4">
          Azione {action._id}
        </h2>
        <div className="mb-4">
          <p>Action {action._id}</p>
          <p>Campagna {action.campaign}</p>
          <p>Type {action.type}</p>
          <p>Status {action.status}</p>
        </div>
        <div className="my-4 flex flex-col gap-4">
          {events.map((event, i) => (
            <Card className="p-4" key={i}>
              <div className="flex justify-between">
                <p>{event.type}</p>
                <p>{moment(event.createdAt).format("DD/MM/YYYY HH:mm:ss")}</p>
              </div>
              <p>{`${event?.contact?.firstName || ""} ${
                event?.contact?.lastName || ""
              }`}</p>
              <p>{event?.contact?.email}</p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ActionPage;
