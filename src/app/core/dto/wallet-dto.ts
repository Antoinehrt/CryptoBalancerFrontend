import {Crypto} from '../models/crypto';

export interface WalletDto {
    id: number;
    userId: number;
    crypto: Crypto
}
