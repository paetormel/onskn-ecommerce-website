import PageWrapper from "../components/layouts/PageWrapper";
import Title from "../components/Title";

const settings = [
  {
    title: "Store profile",
    description: "Update your store name, contact email, and branding details.",
  },
  {
    title: "Notifications",
    description: "Choose which order, payment, and customer alerts you want.",
  },
  {
    title: "Security",
    description: "Manage admin passwords, sessions, and access controls.",
  },
];

const Setting = () => {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <Title title="Settings" />
          <p className="mt-2 text-sm text-slate-500">
            Manage admin preferences and store-wide configuration.
          </p>
        </div>

        <section className="grid gap-4 lg:grid-cols-3">
          {settings.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Quick setup</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Store name
              </span>
              <input
                type="text"
                defaultValue="Admin Portal"
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Support email
              </span>
              <input
                type="email"
                defaultValue="support@example.com"
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              Save changes
            </button>
            <button className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Reset
            </button>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Setting;
