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
        const parents = v.parents;
        if (v.label == undefined)
            this.addToList(parents);
        else
            this.addToListWithLabel(parents, v.label);
        this.updateState();
    }
    
}
