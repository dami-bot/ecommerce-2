export const StatCard = ({ label, value, isCurrency }) => (
  <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-md text-center">
    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{label}</p>
    <h3 className="text-3xl font-bold text-white">
      {isCurrency ? `$${Number(value).toLocaleString()}` : value}
    </h3>
  </div>
);