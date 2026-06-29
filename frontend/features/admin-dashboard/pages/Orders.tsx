import PageWrapper from "../components/layouts/PageWrapper";
import Title from "../components/Title";

const orderStats = [
  { label: "Pending orders", value: "26" },
  { label: "Completed today", value: "84" },
  { label: "Revenue today", value: "$12,480" },
];

const recentOrders = [
  { id: "#ORD-1042", customer: "Maria Santos", total: "$128.00", status: "Paid" },
  { id: "#ORD-1041", customer: "Jasper Cruz", total: "$54.50", status: "Processing" },
  { id: "#ORD-1040", customer: "Ella Reyes", total: "$218.90", status: "Shipped" },
];

const Orders = () => {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <Title title="Orders" />
          <p className="mt-2 text-sm text-slate-500">
            Track order status and review the latest transactions.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {orderStats.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {item.value}
              </p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent orders
            </h3>
          </div>

          <div className="divide-y divide-slate-200">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-2 px-5 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium text-slate-900">{order.id}</p>
                  <p className="text-sm text-slate-500">{order.customer}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-700">
                    {order.total}
                  </span>
                  <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Orders;
