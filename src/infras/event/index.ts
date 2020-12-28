import { IocContext } from "power-di";
import { Event } from "./contracts";
import { HELLO_EVENT, helloHandle } from "./events/HelloEvent";

export const fire = async (event: Event) => {

    const env = process.env.NODE_ENV
    const emitter = IocContext.DefaultInstance.get('EventEmitter');
    
    if (env === 'test' || env === 'develop') {
        await emitter.emit(event.name, event);
    } else {
        emitter.emit(event.name, event);
    }
    
}

export const loadEventListeners = () => {
    const emitter = IocContext.DefaultInstance.get('EventEmitter');
    emitter.on(HELLO_EVENT,helloHandle);
}

