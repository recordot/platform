import { HELLO_EVENT } from '@infras/event/events/HelloEvent';

export interface Event {
    /**
     * 이벤트 이름
     */
    name: string;
    [key: string]: any;
}

export abstract class Handler {
    abstract handle(event: Event): void;
}
