import { Group, Stack, Table } from "@mantine/core";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMemo, type JSX } from "react";
import type { Balances } from "../../hooks/useBalances";

export function TokenBalance(): JSX.Element {
  const columnHelper = createColumnHelper<Balances["tokenBalances"][0]>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor(
        (datum) => {
          return datum.metadata.name;
        },
        {
          header: "Token Name",
          cell: (info) => {
            return info.getValue();
          },
        },
      ),
      columnHelper.accessor(
        (datum) => {
          return datum.metadata.symbol;
        },
        {
          header: "Symbol",
          cell: (info) => {
            return info.getValue();
          },
        },
      ),
      columnHelper.accessor(
        (datum) => {
          return datum.tokenBalance.tokenBalance;
        },
        {
          header: "Balance",
          cell: (info) => {
            return info.getValue();
          },
        },
      ),
    ];
  }, [columnHelper]);

  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack>
      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                      <Group gap="xs">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Group>
                    </Table.Th>
                  );
                })}
              </Table.Tr>
            );
          })}
        </Table.Thead>
      </Table>
    </Stack>
  );
}
