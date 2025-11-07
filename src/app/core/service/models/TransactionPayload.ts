export interface TransactionPayload {
  order: 'COMPRA' | 'VENDA';
  crypto: number;
  priceCrypto: number;
  amountUsd: number;
}

