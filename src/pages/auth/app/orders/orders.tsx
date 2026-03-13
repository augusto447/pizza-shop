import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import z from "zod";

import { Table, TableBody, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filter";
import { Pagination } from "@/components/paginations";
import { getOrders } from "@/api/get-orders";
import { OrderTableSkeleton } from "./order-table-skeleton";

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<{ orderId?: string; customerName?: string; status?: string }>({});

  const pageIndex = z.coerce.number()
    .transform(page => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders", pageIndex, filters],
    queryFn: () => getOrders({ pageIndex, ...filters }),

  });

  const handlePaginate = (newPageIndex: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set("page", (newPageIndex + 1).toString());
      return params;
    });
  };

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Pedidos</h1>

        <div className="space-y-2.5">
          {/* Passa o setFilters para o componente de filtros */}
          <OrderTableFilters onFilter={setFilters} />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Clientes</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[180px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                {isLoadingOrders && <OrderTableSkeleton />}
                {isLoading && (
                  <TableRow>
                    <TableHead colSpan={8} className="text-center">Carregando pedidos...</TableHead>
                  </TableRow>
                )}

                {!isLoading && result?.orders?.length === 0 && (
                  <TableRow>
                    <TableHead colSpan={8} className="text-center">Nenhum pedido encontrado</TableHead>
                  </TableRow>
                )}

                {!isLoading &&
                  result?.orders?.map(order => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              pageIndex={pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  );
}