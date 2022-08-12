import { longify } from '@cosmjs/stargate/build/queries/utils';
import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

export const sellOrdersMock: SellOrderInfo[] = [
  {
    id: longify('1'),
    seller: 'regen1qwa9xy0997j5mrc4dxn7jrcvvkpm3uwuldkrmg',
    batchDenom: 'C02-001-19930101-20031031-001',
    quantity: '4.2',
    askDenom: 'uregen',
    askAmount: '17',
    disableAutoRetire: false,
    expiration: new Date('1970-01-01T00:00:00Z'),
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
  },
  {
    id: longify('2'),
    seller: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
    batchDenom: 'C02-001-19930101-20031031-001',
    quantity: '100',
    askDenom: 'uregen',
    askAmount: '20',
    disableAutoRetire: false,
    expiration: new Date('2023-12-31T00:00:00Z'),
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
  },
  {
    id: longify('3'),
    seller: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
    batchDenom: 'C02-001-19930101-20031031-001',
    quantity: '200',
    askDenom: 'uregen',
    askAmount: '10',
    disableAutoRetire: true,
    expiration: new Date('2024-12-31T00:00:00Z'),
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
  },
  {
    id: longify('4'),
    seller: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
    batchDenom: 'C02-001-19930101-20031031-001',
    quantity: '300',
    askDenom: 'uregen',
    askAmount: '15',
    disableAutoRetire: false,
    expiration: new Date('2024-01-01T00:00:00Z'),
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
  },
  {
    id: longify('5'),
    seller: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
    batchDenom: 'C02-001-19930101-20031031-001',
    quantity: '100',
    askDenom: 'uregen',
    askAmount: '11',
    disableAutoRetire: false,
    expiration: new Date('2023-12-31T00:00:00Z'),
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
  },
  {
    id: longify('6'),
    seller: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
    batchDenom: 'C02-001-19930101-20031031-001',
    quantity: '200',
    askDenom: 'uregen',
    askAmount: '8',
    disableAutoRetire: true,
    expiration: new Date('2024-12-31T00:00:00Z'),
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
  },
  {
    id: longify('7'),
    seller: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
    batchDenom: 'C02-001-19930101-20031031-001',
    quantity: '300',
    askDenom: 'uregen',
    askAmount: '7',
    disableAutoRetire: false,
    expiration: new Date('2024-01-01T00:00:00Z'),
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
  },
];

export const txHashMock =
  '7C360FC90740051EBC00C74E845C413D5E38BABC05689DB54EA6062F4B6E6417';
