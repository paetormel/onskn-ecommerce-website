import type { StatCardProps } from "../types/dashboard.type";

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend }) => (
    <div className='p-6 rounded-2xl bg-white border border-slate-100 shadow-sm'>
      <div className='flex items-center justify-between mb-4'>
        <div className='p-2 bg-slate-50 rounded-lg'>
          <Icon className='w-5 h-5 text-primary' />
        </div>
        <span className='text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full'>
          {trend}
        </span>
      </div>
      <h3 className='text-slate-500 text-sm'>{title}</h3>
      <p className='text-2xl font-bold text-slate-900 mt-1'>{value}</p>
    </div>
  );

export default StatCard;