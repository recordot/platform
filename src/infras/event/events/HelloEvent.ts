import { Events, Event } from "@infras/event/contracts";

export const HELLO_EVENT  = 'hello.world';

export default class HelloEvent extends Event {
    name: Events = HELLO_EVENT;
}

export const helloHandle = async (e:Event): Promise<void> => {
  console.log("Hello World");
}
  