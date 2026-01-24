import {AssetModel} from './asset.model';

export interface WalletModel {
    id: number | null;
    userId: number;
    items: AssetModel[];
}
