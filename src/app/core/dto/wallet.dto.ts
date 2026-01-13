import {AssetDto} from './asset.dto';

export interface WalletDto {
    id: number | null;
    userId: number;
    items: AssetDto[];
}
