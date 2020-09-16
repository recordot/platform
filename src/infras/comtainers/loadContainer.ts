import { IocContext } from "power-di";
import { EventEmitter } from "events";

export default function loadContainer(){
    
    const context = IocContext.DefaultInstance;

    context.register(EventEmitter,'EventEmitter');

}

export function clearContainer(){
    const context = IocContext.DefaultInstance;
    try {
        context.clear();
    } catch (error) {
        
    }
}