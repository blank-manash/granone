import {STATES, Vertex} from "./types";

/*
 * A PipeType is an object, which takes an object (gremlin) and outputs
 * another, now that may be the same gremlin, or something entirely else
 * It can also output states, like `done` or `pull`.
 */

export abstract class PipeType {
    protected state: STATES;
    protected list: Array<Vertex>;
    protected constructor() {
        this.list = [];
        this.state = STATES.PULL;
    }
    protected updateStateNormal() {
        this.state = this.list.length === 0 ? STATES.PULL : STATES.RUNNING;
    }
    abstract updateState(): void;
    abstract provides(v: Vertex): void;
    get(): Vertex {
        return this.list.pop()!;
    }
    getState(): STATES {
        return this.state;
    }
}

