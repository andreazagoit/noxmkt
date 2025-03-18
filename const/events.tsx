export const EVENTS = {
  SENT: () => {
    console.log("SENT");
  },
  OPENED: () => {
    console.log("OPENED");
  },
  CLICKED: () => {
    console.log("CLICKED");
  },
};

export const EVENTS_LIST = Object.keys(EVENTS);
export type EVENT = keyof typeof EVENTS;
