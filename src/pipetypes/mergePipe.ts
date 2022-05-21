/**
 * @file  : mergePipe.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 22.05.2022
 */

import {PipeType} from '../PipeType'
import {Vertex} from '../types';

export class MergePipeType extends PipeType {
    private labels: Set<string>;
    constructor() {
        super();
        this.labels = new Set<string>();
    }
    updateState(): void {
    }
    provides(v: Vertex): void {
    }
}
