import {PipeType} from "../PipeType";
import {PIPETYPES, Vertex} from "../types";

export class ExceptPipeType extends PipeType {
    static create(name: string): PipeType {
        return new ExceptPipeType(name);
    }

    private label: string;

    private constructor(_label: string) {
        super();
        this.label = _label;
    }

    getPipeType(): PIPETYPES {
        return PIPETYPES.EXCEPT;
    }

    updateState(): void {
        this.updateStateAndMakeUnqiue();
    }

    provides(v: Vertex): void {
        if (this.canPass(v.label))
            this.list.push(v);
        this.updateState();
    }

    private canPass(label: string | undefined) {
        if (label == undefined)
            return true;
        return label !== this.label;
    }

}
