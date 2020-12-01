import { Event } from "@infras/event/contracts";

export const HELLO_EVENT  = 'hello.world';

export default class HelloEvent extends Event {
    name = HELLO_EVENT;
}

export const helloHandle = async (e: HelloEvent): Promise<void> => {
  console.log("Hello World");
}
  