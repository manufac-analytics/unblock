import { Group, Stack, Table, Text } from "@mantine/core";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMemo, type JSX } from "react";
import type { Balances } from "../../hooks/useBalances";

export function TokenBalance({
  ethBalance,
  tokenBalances,
}: {
  ethBalance: string;
  tokenBalances: Balances["tokenBalances"];
}): JSX.Element {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Balances["tokenBalances"][0]>();
    return [
      columnHelper.accessor((datum) => datum.metadata.name, {
        header: "Token Name",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor(
        (datum) => {
          return datum.tokenBalance.contractAddress;
        },
        {
          header: "Contract Address",
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
  }, []);

  const table = useReactTable({
    data: tokenBalances,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack>
      <Group>
        <Text fw={700}>ETH Balance:</Text>
        <Text>{ethBalance}</Text>
      </Group>
      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id}>
                  <Group gap="xs">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Group>
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
