
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const data = [
  { country: 'USA', "hot dog": 60, "burger": 80, "sandwich": 70 },
  { country: 'Germany', "hot dog": 30, "burger": 90, "sandwich": 80 },
  { country: 'France', "hot dog": 40, "burger": 60, "sandwich": 90 },
  { country: 'Italy', "hot dog": 50, "burger": 40, "sandwich": 100 },
];

const BarChart = () => {
  return (
    <div style={{ height: 400 }}>
      <h2>Biểu Đồ Cột</h2>
      <ResponsiveBar
        data={data}
        keys={['hot dog', 'burger', 'sandwich']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Quốc Gia',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Số Lượng',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default BarChart;
