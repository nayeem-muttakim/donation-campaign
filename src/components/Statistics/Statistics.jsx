
import { useEffect, useState } from "react";
import { PieChart, Pie,  Cell } from "recharts";
  



const COLORS = ["#FF444A", "#00C49F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Statistics = () => {

  const[donation,setDonation]=useState([]) 

  const data = [
    { name: "Group A", value: 12-donation.length },
    { name: "Group B", value: donation.length },
  ];
  useEffect(()=>{
    const donationCard = JSON.parse(localStorage.getItem('donation')); 
    if(donationCard){
        setDonation(donationCard)
    }
 
},[])

  return (
    <div className="flex flex-col items-center justify-center gap-16 pb-40">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={180}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-14">
           <div className="flex items-center gap-4">
           <h1 className="text-lg font-normal ">Your donation</h1>
           <div className="w-[100px] rounded-sm h-3 bg-[#00C49F]"></div>
           </div>
           <div className="flex items-center gap-4">
           <h1 className="text-lg font-normal ">Total donation</h1>
           <div className=" w-[100px] rounded-sm h-3 bg-[#FF444A]"></div>
           </div>
           
      </div>
    </div>
  );
};

export default Statistics;
