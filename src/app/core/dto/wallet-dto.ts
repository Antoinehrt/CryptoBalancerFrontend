import {CryptoDto} from './crypto-dto';

export interface WalletDto {
    id: number;
    userId: number;
    crypto: CryptoDto[];
}
