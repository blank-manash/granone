/**
 * @file  : asPipe.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 22.05.2022
 */
import {PipeType} from "../PipeType";
import {PIPETYPES, Vertex} from "../types";

export class AsPipeType extends PipeType {

    private label: string;

    updateState(): void {
        this.updateStateAndMakeUnqiue();
    }

    private constructor(_label: string) {
        super();
        this.label = _label;
    }

    provides(v: Vertex): void {
        v.label = this.label;
        this.list.push(v);
        this.updateState();
    }

    static create(_label: string) {
        return new AsPipeType(_label);
    }

    getPipeType(): PIPETYPES {
        return PIPETYPES.AS;
    }
}
