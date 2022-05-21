import {PipeType} from "./PipeType";
import {Entity, STATES, Vertex} from "./types";

export class QueryRunner {
    private prog: Array<PipeType>;
    private prev: Array<number>;
    private index: number;
    private vertex: Vertex | null;

    constructor(_prog: Array<PipeType>, _prev: Array<number>) {
        this.prog = _prog;
        this.prev = _prev;
        this.index = 0;
        this.vertex = null;
    }

    static create(_prog: Array<PipeType>, _prev: Array<number>) {
        return new QueryRunner(_prog, _prev);
    }

    public run(): Array<Entity> {

        const results: Array<Entity> = [];
        if (this.prog.length === 0) return results;

        while (true) {
            const pipeType: PipeType = this.prog.at(this.index)!;
            const currentIndex = this.index;
            const isEnd: boolean = this.index === this.prog.length - 1;
            if (this.vertex) {
                pipeType.provides(this.vertex);
                this.vertex = null;
            }

            // Update this.Index
            let state = pipeType.getState();
            if (state === STATES.RUNNING) {
                this.vertex = pipeType.get();
                if (isEnd) {
                    results.push(this.vertex.entity);
                    this.vertex = null;
                } else {
                    this.index = this.index + 1;
                }
            } else if (state === STATES.PULL) {
                this.index = this.prev[this.index];
            } else {
                break;
            }
            state = pipeType.getState();
            // Update Prev
            if (state === STATES.RUNNING) {
                this.prev[currentIndex] = currentIndex;
            } else if (state === STATES.PULL) {
                this.prev[currentIndex] = this.prev[currentIndex - 1];
            }
        }

        return [...new Set(results)];
    }
}
