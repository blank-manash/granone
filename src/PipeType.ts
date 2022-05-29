import {PIPETYPES, STATES, Vertex} from "./types";

/*
 * A PipeType is an object, which takes an object (gremlin) and outputs
 * another, now that may be the same gremlin, or something entirely else
 * It can also output states, like `done` or `pull`.
 */

export abstract class PipeType {
    protected state: STATES;
    protected list: Array<Vertex>;
    protected pullIndices: Array<number>;
    protected constructor() {
        this.list = [];
        this.pullIndices = [];
        this.state = STATES.PULL;
    }
    protected updateStateAndMakeUnqiue() {
        this.makeUnique();
        this.state = this.list.length === 0 ? STATES.PULL : STATES.RUNNING;
    }
    protected makeUnique() {
        this.list = [...new Set(this.list)];
    }
    
    protected addToList(array: Vertex[]) {
        array.forEach(x => this.list.push(x));
    }
    
    addToPullIndex(i: number) {
        this.pullIndices.push(i);
    }

    getPullIndices(): Array<number> {
        return this.pullIndices;
    }

    abstract getPipeType(): PIPETYPES;
    abstract updateState(): void;
    abstract provides(v: Vertex): void;
    get(): Vertex {
        const vertex = this.list.pop()!;
        this.updateState();
        return vertex;
    }
    getState(): STATES {
        return this.state;
    }
}

