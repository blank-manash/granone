import {Vertex} from "../types";
import {PipeType} from "../PipeType";

export class ParentPipeType extends PipeType {
    static create(): PipeType {
        return new ParentPipeType();
    }
    updateState() {
        this.updateStateAndMakeUnqiue();
    }
    provides(v: Vertex): void {
        v.parents.forEach(v => this.list.push(v));
        this.updateState();
    }
    
}
