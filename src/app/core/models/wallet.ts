import {Asset} from './asset';

export interface Wallet {
    id: number | null;
    userId: number;
    items: Asset[];
}
