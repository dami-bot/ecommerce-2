import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const SalesChart = ({ data }) => (
  <div className="w-full" style={{ minHeight: '320px' }}>
    {/* Cambiamos height="100%" por un valor fijo como 300 */}
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
        <XAxis 
          dataKey="fecha" 
          stroke="#888" 
          tick={{fill: '#888', fontSize: 12}} 
        />
        <YAxis 
          stroke="#888" 
          tick={{fill: '#888', fontSize: 12}} 
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
          itemStyle={{ color: '#3b82f6' }}
        />
        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);