import { useMemo } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import EmptyState from 'web-components/src/components/empty-state';
import EmptyCartIcon from 'web-components/src/components/icons/EmptyCartIcon';
import {
  ActionsTable,
  RenderActionButtonsFunc,
  SortCallbacksType,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';

import { UseStateSetter } from 'types/react/use-state';

import { NormalizedSellOrder } from '../../../pages/Marketplace/Storefront/Storefront.types';
import { getSellOrdersRow } from './SellOrdersTable.config';
import getSellOrdersTableRow from './SellOrdersTable.Row';

type Props = {
  sellOrders: NormalizedSellOrder[];
  sortCallbacks?: SortCallbacksType;
  renderActionButtonsFunc?: RenderActionButtonsFunc;
  onTableChange?: UseStateSetter<TablePaginationParams>;
};

const SellOrdersTable = ({
  sellOrders,
  sortCallbacks = [],
  renderActionButtonsFunc = i => void 0,
  onTableChange,
}: Props): JSX.Element => {
  const { _ } = useLingui();
  const hasSellOrders = sellOrders.length > 0;
  const SellOrdersRow = useMemo(() => getSellOrdersRow(_), [_]);
  return (
    <>
      {hasSellOrders && (
        <ActionsTable
          tableLabel={_(msg`Sell orders`)}
          headerRows={SellOrdersRow}
          rows={sellOrders.map(sellOrder =>
            getSellOrdersTableRow({ sellOrder, _ }),
          )}
          sortCallbacks={sortCallbacks}
          renderActionButtons={renderActionButtonsFunc}
          onTableChange={onTableChange}
        />
      )}
      {!hasSellOrders && (
        <EmptyState
          message={_(msg`No sell orders found`)}
          icon={<EmptyCartIcon sx={{ fontSize: 84, fill: 'none' }} />}
        />
      )}
    </>
  );
};

export default SellOrdersTable;
