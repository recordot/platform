import { TypedSerializer } from 'ts-typed';
import { clone } from 'cloneable-ts';
export default class Entity {

    /**
     * @description toString equivalent, allows you to remove the prefix from props.
     */
    toJSON(): Entity {
        return TypedSerializer.serialize(this);
    }

    clone() {
        return clone(this);
    }
}