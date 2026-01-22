export interface BacktestResultDto {
    meilleur: string;
    data: BacktestDataPointDto[];
}

export interface BacktestDataPointDto {
    value: number;
    cost: number;
    weights: number | null;
    trades: number | null;
    max_drift: number;
    l1_drift: number;
    pos_BNBEUR: number;
    pos_BTCEUR: number;
    pos_ETHEUR: number;
    pos_SOLEUR: number;
    pos_XRPEUR: number;
}
