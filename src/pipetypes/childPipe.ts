import {PipeType} from "../PipeType";
import {Vertex} from "../types";

export class ChildPipeType extends PipeType {
    static create(): PipeType {
        return new ChildPipeType();
    }
    updateState(): void {
        this.updateStateNormal();
    }
    provides(v: Vertex): void {
        v.children.forEach(v => this.list.push(v));
    }
}
