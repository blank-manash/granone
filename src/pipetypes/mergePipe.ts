/**
 * @file  : mergePipe.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 22.05.2022
 */

import {PipeType} from '../PipeType'
import {STATES, Vertex} from '../types';

export class MergePipeType extends PipeType {
    private labelSet: Set<string>;
    updateState(): void {
        this.updateStateAndMakeUnqiue();
    }
    provides(v: Vertex): void {
        if (v.label == undefined) return;
        v.label.forEach((value, key) => {
            if (!this.labelSet.has(key)) return;
            value.label = v.label;
            this.list.push(value);
        });
        this.updateState();
    }
    private constructor(...args: string[]) {
        super();
        this.labelSet = new Set<string>();
        args.forEach(x => this.labelSet.add(x));
    }
    static create(...args: string[]) {
        return new MergePipeType(...args);
    }
}
