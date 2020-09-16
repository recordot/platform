import { IocContext } from "power-di";
import async from 'async';
import { Event } from "./contracts";
import { HELLO_EVENT, helloHandle } from "./events/HelloEvent";

export const fire = (event: Event) => {

    const env = process.env.NODE_ENV
    if (env === 'test' || env === 'develop') {
        const emitter = IocContext.DefaultInstance.get('EventEmitter');
        emitter.emit(event.name, event);
    } else {
        const queue = async.queue( (event:Event) => {
            const emitter = IocContext.DefaultInstance.get('EventEmitter');
            emitter.emit(event.name, event);
        }, 1);
        queue.push(event);    
    }
    
}

export const loadEventListeners = () => {
    const emitter = IocContext.DefaultInstance.get('EventEmitter');
    emitter.on(HELLO_EVENT,helloHandle);
}

