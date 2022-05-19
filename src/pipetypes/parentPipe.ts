import {PipeType, STATES, Vertex} from "../types";

export class ParentPipeType implements PipeType {
    private list: Array<Vertex>;
    private state: STATES;
    private constructor() {
        this.list = [];
        this.state = STATES.PULL;
    }
    provides(v: Vertex): void {
        v.parents.forEach((ver) => this.list.push(ver));
    }
    get(): Vertex {
        return this.list.pop()!;
    }
    getState(): STATES {
        return this.state;
    }
    public static create() {
        return new ParentPipeType();
    }
}
