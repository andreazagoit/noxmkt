const ActionTypes = {
  SEND_EMAIL: (props) => {
    console.log("Sending email to", props);
  },
  UPDATE_LANDING_PAGE: (props: { url: string; updateText: string }) => {
    console.log("Updating landing page:", props);
  },
  PREPARE_IMAGES: (props: { imagesToPrepare: number }) => {
    console.log("Preparing", props.imagesToPrepare, "images");
  },
  SET_UP_EMAIL_TRIGGER: (props: { triggerType: string }) => {
    console.log("Setting up email trigger for", props.triggerType);
  },
  CREATE_NEW_SUBJECT_LINE: (props: { subject: string }) => {
    console.log("Creating new subject line:", props.subject);
  },
  SEND_REMINDER_EMAIL: (props: {
    subject: string;
    recipient: string;
    body: string;
  }) => {
    console.log("Sending reminder email to", props.recipient, props);
  },
} as const;

type ActionType = keyof typeof ActionTypes;
