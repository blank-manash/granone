/**
 * @file  : asPipe.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 22.05.2022
 */
import {PipeType} from "../PipeType";
import {Vertex} from "../types";

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
        if (v.label === undefined)
            v.label = new Map<string, Vertex>();
        v.label.set(this.label, v);
        this.list.push(v);
        this.updateState();
    }
    static create(_label: string) {
        return new AsPipeType(_label);
    }
}
