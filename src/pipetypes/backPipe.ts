import {PipeType} from "../PipeType";
import {PIPETYPES, Vertex} from "../types";

export class BackPipeType extends PipeType {
    satisfies(label: string) {
        return this.label === label;
    }
    private label: string;
    getPipeType(): PIPETYPES {
        return PIPETYPES.BACK;
    }
    updateState(): void {
        this.updateStateAndMakeUnqiue();
    }
    provides(v: Vertex): void {
        if (v.label && v.label === this.label) {
            this.list.push(v);
        }
        this.updateState();
    }

    private constructor(_label: string) {
        super();
        this.label = _label;
    }

    static create(_label: string) {
        return new BackPipeType(_label);
    }
}
