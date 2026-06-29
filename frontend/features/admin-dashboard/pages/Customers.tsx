import PageWrapper from "../components/layouts/PageWrapper";
import Title from "../components/Title";

const customerStats = [
  { label: "Total customers", value: "1,284" },
  { label: "Active this week", value: "312" },
  { label: "New signups", value: "48" },
];

const recentCustomers = [
  { name: "Maria Santos", email: "maria@example.com", status: "Active" },
  { name: "Jasper Cruz", email: "jasper@example.com", status: "Pending" },
  { name: "Ella Reyes", email: "ella@example.com", status: "Active" },
];

const Customers = () => {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <Title title="Customers" />
          <p className="mt-2 text-sm text-slate-500">
            Manage your customer base and review recent activity.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {customerStats.map((item) => (
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
              Recent customers
            </h3>
          </div>

          <div className="divide-y divide-slate-200">
            {recentCustomers.map((customer) => (
              <div
                key={customer.email}
                className="flex flex-col gap-2 px-5 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium text-slate-900">{customer.name}</p>
                  <p className="text-sm text-slate-500">{customer.email}</p>
                </div>
                <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {customer.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Customers;
