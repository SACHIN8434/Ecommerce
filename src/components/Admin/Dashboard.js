import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ArcElement, Tooltip, Legend } from "chart.js";
import { getAdminProducts } from "../../services/operations/product";
import { useSelector, useDispatch } from "react-redux";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartDataLabels
);
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fun = async () => {
      try {
        console.log("comming to admin products");
        const res = await getAdminProducts(token, dispatch);
        console.log(res);
        setLoading(false);
      } catch (e) {
        console.log("error");
      }
    };
    fun();
  },[]);

  let outOfStock = 0;
  const { adminProducts } = useSelector((state) => state.product);
  console.log("adminProeducts is", adminProducts);

  const { token } = useSelector((state) => state.auth);
  adminProducts &&
    adminProducts.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "My First Dataset",
        backgroundColor: ["red"],
        hoberBackgroundColor: ["rgb(197,72,49)"],
        data: [0, 4000],
        tension: 0.1,
      },
    ],
  };
  console.log("admin Products are", adminProducts);

  let doughnutState;
  adminProducts && ( doughnutState = {
    labels: ["Out of Stock", "Instock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoberBackgroundColor: ["4B5000", "#3501F"],
        data: [outOfStock, adminProducts.length - outOfStock],
      },
    ],
  })

  const config = {
    type: "doughnut",
    data: doughnutState,
  };
  const options = {
    plugins: {
      legend: true,
    },
    sclaes: {
      y: {},
    },
  };
  return (
    <>
      {loading ? (
        <div>loading....</div>
      ) : (
        <div className="grid grid-cols-[1fr,5fr]">
          <Sidebar />

          <div className="h-[100vh]">
            <h1 className="flex justify-center items-center">Dashboard</h1>
            <div className="flex justify-center items-center flex-col bg-blue-500 text-white">
              <p>Total Amount</p>
              <p>200</p>
            </div>
            <div className="flex flex-row items-center justify-center mt-10 gap-x-[10vw]">
              <Link
                to={"/admin/products"}
                className="text-black bg-yellow-200 h-[100px] w-[100px] flex flex-col items-center justify-center rounded-full"
              >
                <p>Product</p>
                <p>50</p>
              </Link>
              <Link
                to={"/admin/orders"}
                className="text-black bg-yellow-200 h-[100px] w-[100px] flex flex-col items-center justify-center rounded-full"
              >
                <p>Orders</p>
                <p>4</p>
              </Link>
              <Link
                to={"/admin/users"}
                className="text-black bg-yellow-200 h-[100px] w-[100px] flex flex-col items-center justify-center rounded-full"
              >
                <p>Users</p>
                <p>2</p>
              </Link>
            </div>
            <div className="w-[70vw] m-auto">
              <Line data={lineState} options={options} />
            </div>

            <div className="w-[30vw] m-auto">
              <Doughnut data={doughnutState}></Doughnut>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
