import { Group, Stack, Table, Text, Pagination } from "@mantine/core";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMemo, useState, type JSX } from "react";
import type { Balances } from "../../hooks/useBalances";

export function TokenBalance({
  ethBalance,
  tokenBalances,
}: {
  ethBalance: string;
  tokenBalances: Balances["tokenBalances"];
}): JSX.Element {
  const [activePage, setActivePage] = useState(1);
  const rowsPerPage = 10;

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (activePage - 1) * rowsPerPage;
    return tokenBalances.slice(startIndex, startIndex + rowsPerPage);
  }, [activePage, tokenBalances]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Balances["tokenBalances"][0]>();
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
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack w={1500}>
      <Group>
        <Text fw={700}>ETH Balance:</Text>
        <Text>{ethBalance}</Text>
      </Group>
      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th key={header.id}>
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
        <Table.Tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Table.Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Td>
                  );
                })}
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
      <Group justify="flex-end">
        <Pagination
          total={Math.ceil(tokenBalances.length / rowsPerPage)}
          value={activePage}
          onChange={setActivePage}
        />
      </Group>
    </Stack>
  );
}
