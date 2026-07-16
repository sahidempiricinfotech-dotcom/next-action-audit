import {
  cancelOrder,
  exportOrdersCsv,
  listMyOrders,
} from "@/src/actions/orders";

export default async function OrdersPage() {
  const orders = await listMyOrders();
  const cancel = cancelOrder.bind(null, "selected-order");

  return (
    <main>
      <h1>Orders</h1>
      <pre>{JSON.stringify(orders, null, 2)}</pre>
      <form action={cancel}>
        <input name="reason" aria-label="Cancellation reason" />
        <button type="submit">Cancel order</button>
      </form>
      <form action={exportOrdersCsv}>
        <button type="submit">Export CSV</button>
      </form>
    </main>
  );
}
