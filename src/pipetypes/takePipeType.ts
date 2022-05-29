import {PipeType} from "../PipeType";
import {PIPETYPES, STATES, Vertex} from "../types";

export class TakePipeType extends PipeType {
    static create(limit: number): PipeType {
        return new TakePipeType(limit);
    }
    private taken: number; 
    private limit: number;
    private constructor(_take: number) {
        super();
        this.limit = _take;
        this.taken = 0;
    }
    
    private done(): boolean {
        return this.limit === this.taken;
    }

    public create(_take: number) {
        return new TakePipeType(_take);
    }

    getPipeType(): PIPETYPES {
        return PIPETYPES.TAKE;
    }

    updateState(): void {
        if (this.done()) {
            this.state = STATES.DONE;
        } else {
            this.updateStateAndMakeUnqiue();
        }
    }

    get(): Vertex {
        this.taken++;
        const ret = this.list.pop()!;
        this.updateState();
        return ret;
    }

    resetState() {
        this.taken = 0;
        this.updateState();
    }

    provides(v: Vertex): void {
        this.list.push(v);
        this.updateState();
    }
}
