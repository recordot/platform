import { HELLO_EVENT } from '@infras/event/events/HelloEvent';

export type Events = 'event' | typeof HELLO_EVENT ;

export abstract class Event {
    name: Events = 'event';
    data: any;
    by?: {[key:string]:unknown};
}

export abstract class Handler {
    abstract handle(event:Event): void;
}
