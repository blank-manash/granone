import {PipeType} from "./PipeType";
import {Entity, STATES, Vertex} from "./types";

export class QueryRunner {
    private prog: Array<PipeType>;
    private adj: Array<Array<number>>;
    private results: Entity[];
    private done: boolean;

    constructor(_prog: Array<PipeType>, _adj: Array<Array<number>>) {
        this.prog = _prog;
        this.done = false;
        this.results = [];
        this.adj = _adj;
    }

    static create(_prog: Array<PipeType>, _adj: Array<Array<number>>) {
        return new QueryRunner(_prog, _adj);
    }

    private isEnd(index: number): boolean {
        return index + 1 === this.prog.length;
    }

    private provide(pipe: PipeType, v: Vertex | null) {
        if (v == null) return;
        pipe.provides(v);
    }

    private processRunningState(pipe: PipeType) {
        return pipe.get();
    }

    private processPullState() {
        return null;
    }

    private process(pipe: PipeType): Vertex | null {
        const state = pipe.getState();
        switch (state) {

            case STATES.RUNNING:
                return this.processRunningState(pipe);

            case STATES.PULL:
                return this.processPullState();

            case STATES.DONE:
                this.done = true;
                return null;

            default:
                throw Error("Undefined STATE");
        };

    }


    private dfs(i: number, v: Vertex | null) {

        if (this.done) return;

        const pipe = this.prog.at(i)!;
        this.provide(pipe, v);
        let ver = this.process(pipe);
        while (ver != null && !this.done) {

            if (this.isEnd(i)) {
                this.results.push(ver.entity)
            }

            const children = this.adj.at(i)!;
            for (const child of children) {
                this.dfs(child, ver);
                if (this.done) return;
            }
            ver = this.process(pipe);
        }

    }

    public run(): Array<Entity> {
        this.dfs(0, null);
        const entities =  [...new Set(this.results)];
        this.results = [];
        return entities;
    }
}
