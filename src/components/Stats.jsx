// *********************
// Role of the component: Stats component that displays the balance overview with the new orders, sales, and revenue
// Name of the component: Stats.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Stats />
// Input parameters: no input parameters
// Output: Stats component that displays the balance overview with the new orders, sales, and revenue
// *********************

import SingleStats from "./SingleStats";

const Stats = ({orders}) => {

  const totalOrders = orders.length;
  const totalSales = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;
  const totalRevenue =
    orders
      ?.filter(order =>
        order.status.toLowerCase() !== "pending" &&
        order.status.toLowerCase() !== "cancelled"
      )
      .reduce((sum, order) => sum + (order.total || 0), 0) || 0;

  return (
    <div>
      <h2 className="text-3xl text-whiteSecondary font-bold mb-7 mt-4">Balance Overview</h2>
      <div className="flex justify-start gap-x-20 max-[1800px]:flex-wrap gap-y-10 mr-1 max-[1352px]:gap-x-10 max-[1050px]:mr-5">
        <SingleStats title="Total Orders" value={totalOrders} />
        <SingleStats title="Total Sales" value={`$${totalSales}`} />
        <SingleStats title="Total Revenue" value={`$${totalRevenue}`} />
      </div>
    </div>
  );
};
export default Stats;