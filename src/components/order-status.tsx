
type OrderStatus =
    | "pending"
    | "canceled"
    | "processing"
    | "delivering"
    | "delivered"


interface OrdersStatusProps {
    status: OrderStatus
}

const OrderStatusMap: Record<OrderStatus, string> = {
    pending: "Pendente",
    canceled: "Cancelado",
    delivered: "Entregue",
    delivering: "Em entrega",
    processing: "Em preparo",


}



export function OrdersStatus({ status }: OrdersStatusProps) {

    return (
        <div className="flex items-center gap-2">
            {status == "pending" && (

                <span data-testid="badge" className="h-2 w-2 rounded-full bg-slate-400" />
            )}

            {status == "canceled" && (

                <span data-testid="badge" className="h-2 w-2 rounded-full bg-rose-500" />
            )}

            {status == "delivered" && (

                <span data-testid="badge" className="h-2 w-2 rounded-full bg-emerald-500" />
            )}

            {["processing", "delivering"].includes(status) && (

                <span data-testid="badge" className="h-2 w-2 rounded-full bg-amber-400" />
            )}


            <span className="text-muted font-medium">
                {OrderStatusMap[status]}

            </span>
        </div>
    )


}