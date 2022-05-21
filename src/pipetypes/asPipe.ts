/**
 * @file  : asPipe.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 22.05.2022
 */
import {PipeType} from "../PipeType";
import {STATES, Vertex} from "../types";

export class AsPipeType extends PipeType {
    
    private label: string;
    updateState(): void {
        this.state = STATES.AS;
    }
    provides(v: Vertex): void {
        this.list.push(v);
    }
    constructor(_label: string) {
        super();
        this.label = _label;
        this.updateState();
    }
    getLabel(): string {
        return this.label;
    }
}
