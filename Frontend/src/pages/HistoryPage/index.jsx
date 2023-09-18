import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "../../store/user";

function HistoryPage() {
    const userData = useSelector((state) => state.user?.userData);
    const orderHistory = useSelector((state) => state.user.orderHistory);
    console.log(orderHistory);
    const dispatch = useDispatch();

    // const [orderHistory, setorderHistory] = useState({});
    useEffect(() => {
        dispatch({ type: Types.GET_HISTORY, userId: userData._id });
    }, [dispatch, userData]);
    return (
        <section>
            <div className="text-center m-7">
                <h2 className="text-2xl">History</h2>
            </div>
            {orderHistory?.length > 0 ? (
                <div>
                    {orderHistory.map((history) => (
                        <div key={history.id} className="flex justify-center border-2 p-2 m-2">
                            <div className="w-[920px] h-[330px]">
                                <div className=" h-[66px] bg-gray-200 ">up</div>
                                <span className="font-medium text-xl">
                                    {/* TODO
                                                convert mongoDB date format to yyyy-mm-dd
                                                this should be done I think.. before saving it to redux
                                                that means.. at backside? before sending data to front like saga or thunk */}
                                    Purchased {history.created.createdMonth}{" "}
                                    {history.created.createdDay}
                                    {", "} {history.created.createdYear}
                                </span>
                                <div>
                                    {history.product?.map((item) => (
                                        // const orderData = new Date(orderHistory.).toISOString().slice(0, 10);
                                        <div key={item.id} className="mb-2 last:mb-0">
                                            <div className="flex justify-start">
                                                <div className="w-[100px] h-[90px]">
                                                    {/* TODO
                                                    when clicking image, go to product detail */}
                                                    <img
                                                        src={item.image}
                                                        className="w-[90px] h-[90px]"></img>
                                                </div>
                                                <div>description</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}

            {/* <table className="w-full text-sm text-left text-gray-500">
                <thead className="border-[1px] text-black text-base">
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>
                <tbody>
                    {userData?.history.map((item) => (
                        <tr className="border-b " key={item.paymentId}>
                            <td>{item.id}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{dayjs(item.dateOfPurchase).format("YYYY/MM/DD_HH-mm-ss")}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </section>
    );
}

export default HistoryPage;
