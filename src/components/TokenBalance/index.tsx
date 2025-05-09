import { Group, Stack, Table } from "@mantine/core";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMemo, type JSX } from "react";
interface TokenRow {
  name: string;
  symbol: string;
  balance: string;
}

export function TokenBalance(): JSX.Element {
  const columnHelper = createColumnHelper<TokenRow>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("name", {
        header: "Token Name",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("symbol", {
        header: "Symbol",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("balance", {
        header: "Balance",
        cell: (info) => {
          return info.getValue();
        },
      }),
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
