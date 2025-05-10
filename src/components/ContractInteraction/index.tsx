import { Group, Stack, Table } from "@mantine/core";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMemo } from "react";
import type { AssetTransfersResult } from "alchemy-sdk";
import type { JSX } from "react";

export function ContractInteraction(): JSX.Element {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<AssetTransfersResult>();
    return [
      columnHelper.accessor("blockNum", {
        header: "Block Number",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("to", {
        header: "Smart Contract Address",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("asset", {
        header: "Asset",
        cell: (info) => {
          return info.getValue();
        },
      }),

      columnHelper.accessor("value", {
        header: "Value",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor("hash", {
        header: "Transaction Hash",
        cell: (info) => {
          return info.getValue();
        },
      }),
      columnHelper.accessor(
        (row) => {
          return row.rawContract.address;
        },
        {
          id: "rawContractAddress",
          header: "Raw Contract",
          cell: (info) => {
            return info.getValue();
          },
        },
      ),
    ];
  }, []);

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
      </Table>
    </Stack>
  );
}
