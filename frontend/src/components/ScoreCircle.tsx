import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ScoreCircleProps {
  score: number;
  color: string;
}

export function ScoreCircle({ score, color }: ScoreCircleProps) {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ];

  return (
    <div className="relative w-48 h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill={color} />
            <Cell fill="#E5E7EB" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[#1E293B]">{score}%</div>
        <div className="text-[#64748B]">Match</div>
      </div>
    </div>
  );
}
