import {PipeType} from "../PipeType";
import {Vertex} from "../types";

export class ChildPipeType extends PipeType {
    static create(): PipeType {
        return new ChildPipeType();
    }
    updateState(): void {
        this.updateStateAndMakeUnqiue();
    }
    provides(v: Vertex): void {
        const children = v.children;
        if (v.label == undefined)
            this.addToList(children);
        else
            this.addToListWithLabel(children, v.label);
        this.updateState();
    }
}
