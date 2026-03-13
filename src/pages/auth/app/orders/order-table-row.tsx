import { OrderDetails } from "@/components/order-details";
import { OrdersStatus } from "@/components/order-status";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

import { ArrowRight, Search, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import type { GetOrdersResponse } from "@/api/get-orders";
import { aprroveOrder } from "@/api/aprrove-order";

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {


  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()


  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }) {
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ["orders"],
      })
      ordersListCache.forEach(([cacheKey, cacheData]) => {

        if (!cacheData) {
          return
        }

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId == orderId) {
              return { ...order, status: "canceled" }
            }

            return order
          })
        })


      })

    },


  })



  const { mutateAsync: aprroveOrderFn } = useMutation({
    mutationFn: aprroveOrder,
    async onSuccess(_, { orderId }) {
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ["orders"],
      })





      ordersListCache.forEach(([cacheKey, cacheData]) => {

        if (!cacheData) {
          return
        }

        queryClient.setQueryData(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId == orderId) {
              return { ...order, status: "delivered" }
            }

            return order
          })
        })


      })

    },


  })




  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}


      </TableCell>
      <TableCell>
        <OrdersStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">{(order.total / 100).toLocaleString("pt-Br", {
        style: "currency",
        currency: "BRL",
      })}</TableCell>
      <TableCell>
        <Button variant="outline" size="xs"
          disabled={!["pending", "processing"].includes(order.status)}
          onClick={() => aprroveOrderFn({ orderId: order.orderId })}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          disabled={!["pending", "processing"].includes(order.status)}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          variant="ghost"
          size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
