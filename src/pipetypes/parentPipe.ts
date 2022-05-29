import {PIPETYPES, Vertex} from "../types";
import {PipeType} from "../PipeType";

export class ParentPipeType extends PipeType {
    static create(): PipeType {
        return new ParentPipeType();
    }
    updateState() {
        this.updateStateAndMakeUnqiue();
    }
    provides(v: Vertex): void {
        const parents = v.parents;
        this.addToList(parents);
        this.updateState();
    }
    
    getPipeType(): PIPETYPES {
        return PIPETYPES.PARENT;
    }
}
