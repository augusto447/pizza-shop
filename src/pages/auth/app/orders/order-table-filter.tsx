import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface OrderTableFiltersProps {
  onFilter: (filters: { orderId?: string; customerName?: string; status?: string }) => void;
}

export function OrderTableFilters({ onFilter }: OrderTableFiltersProps) {
  const [orderId, setOrderId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      orderId: orderId || undefined,
      customerName: customerName || undefined,
      status: status === "all" ? undefined : status,
    });
  };

  const handleReset = () => {
    setOrderId("");
    setCustomerName("");
    setStatus("all");
    onFilter({});
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <span className="text-sm font-semibold">Filtros</span>

      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos Status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delivering">Em Entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" /> Filtrar resultados
      </Button>

      <Button type="button" variant="outline" size="xs" onClick={handleReset}>
        <X className="mr-2 h-4 w-4" /> Remover filtros
      </Button>
    </form>
  );
}