import { AiOutlineSave } from "react-icons/ai";
import { HiOutlineSave } from "react-icons/hi";
import {
  InputWithLabel,
  Sidebar,
  SimpleInput,
  TextAreaInput,
  WhiteButton,
} from "../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../api_config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const[loading, setLoading] = useState(false)
  const [ orderData, setOrderData ] = useState({
    id: "",
    status: "",
    created_at: "",
    totalAmount: 0,
    items: []
  });

  useEffect(() => {
    // Fetch order data from API or state management
    const token = localStorage.getItem("token")
    const fetchOrderData = async () => {
      const response = await axios.get(`${API_BASE_URL}/admin_order_details/${id}/`,{
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
        console.log("Fetched order data:", response.data);
      setOrderData(response.data);
    };

    fetchOrderData();
  }, []);

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const payload = {
            status: orderData.status,
            };
            const token = localStorage.getItem("token")

            const response = await axios.patch(
            `${API_BASE_URL}/edit_order/${id}/`,
            payload,{
              headers:{
                "Authorization": `Bearer ${token}`
              }
            }
            );

            toast.success("Order updated successfully.");
            console.log("Updated order response:", response.data);
            navigate("/orders"); // or any success route
        } catch (error) {
            console.error("Failed to update order:", error);
            toast.error("Failed to update order.");
        } finally{
          setLoading(false)
        }
        };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-emerald-50 text-stone-700">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Edit order
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              {/* <button className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2">
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Save draft
                </span>
              </button> */}
              <WhiteButton
                textSize="lg"
                width="48"
                py="2"
                text="Update order"
                onClick={handleSubmit}  // now this will work
                >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              </WhiteButton>
            </div>
          </div>

          {/* Add Product section here  */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Order information
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Order ID">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a order ID..."
                    readOnly
                    value={orderData.id}
                    onChange={(e) => setOrderData({ ...orderData, id: e.target.value })}
                  />
                </InputWithLabel>

               <InputWithLabel label="Status">
                    <select
                        value={orderData.status}
                        onChange={(e) => setOrderData({ ...orderData, status: e.target.value })}
                        className="w-full px-4 py-2 border dark:bg-blackPrimary dark:border-gray-600 border-gray-300 rounded-md text-blackPrimary dark:text-whiteSecondary bg-whiteSecondary focus:outline-none"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Order Confirmed">Order Confirmed</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </InputWithLabel>

                <InputWithLabel label="Created At">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a created at date..."
                    value={orderData.created_at}
                    readOnly
                    onChange={(e) => setOrderData({ ...orderData, created_at: e.target.value })}
                  />
                </InputWithLabel>
              </div>
            </div>

            {/* right div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Products in order
              </h3>
              <div>
                <div className="mt-5">
                  {orderData.items.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-300"
                    >
                        {/* Product info: name + variant */}
                        <div className="col-span-6 flex items-center gap-4">
                        {/* Optional image */}
                        {/* <img
                            src="/src/assets/product-placeholder.jpg"
                            alt={item.product}
                            className="w-12 h-12 rounded-md border object-cover"
                        /> */}
                        <div>
                            <p className="text-lg font-semibold dark:text-whiteSecondary text-blackPrimary">
                            {item.product}
                            </p>
                            <p className="text-sm text-gray-500">
                            Variant: {item.product_variant?.color}
                            </p>
                        </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                        <p className="text-md font-medium dark:text-whiteSecondary text-blackPrimary">
                            ${item.price}
                        </p>
                        <p className="text-xs text-gray-500">Unit Price</p>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 text-center">
                        <p className="text-md font-medium dark:text-whiteSecondary text-blackPrimary">
                            {item.quantity}
                        </p>
                        <p className="text-xs text-gray-500">Quantity</p>
                        </div>

                        {/* Total */}
                        <div className="col-span-2 text-right">
                        <p className="text-md font-semibold dark:text-whiteSecondary text-blackPrimary">
                            ${item.total_price}
                        </p>
                        <p className="text-xs text-gray-500">Total</p>
                        </div>
                    </div>
                    ))}
                </div>
              </div>
              <div className="mt-5">
                <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                  Total
                </h3>
                <div className="mt-4 flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <span className="dark:text-whiteSecondary text-blackPrimary">Total products</span>
                    <span className="dark:text-whiteSecondary text-blackPrimary">
                        {orderData.items.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="dark:text-whiteSecondary text-blackPrimary">Total price</span>
                    <span className="dark:text-whiteSecondary text-blackPrimary">
                        ${orderData.totalAmount || orderData.total_amount}
                        </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditOrder;
