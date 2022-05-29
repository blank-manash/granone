import {PipeType} from "../PipeType";
import {PIPETYPES, Vertex} from "../types";

export class ChildPipeType extends PipeType {
    static create(): PipeType {
        return new ChildPipeType();
    }
    updateState(): void {
        this.updateStateAndMakeUnqiue();
    }
    provides(v: Vertex): void {
        const children = v.children;
        this.addToList(children);
        this.updateState();
    }
    getPipeType(): PIPETYPES {
        return PIPETYPES.CHILD;
    }
}
