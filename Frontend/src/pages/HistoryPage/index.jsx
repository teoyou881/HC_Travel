import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Types } from '../../store/user';

function HistoryPage() {
    const userData = useSelector((state) => state.user?.userData);
    const orderHistory = useSelector((state) => state.user.orderHistory);
    const dispatch = useDispatch();

    // const [orderHistory, setorderHistory] = useState({});
    useEffect(() => {
        dispatch({ type: Types.GET_HISTORY, userId: userData._id });
    }, [dispatch, userData]);
    return (
        <section>
            <div className='text-center m-7'>
                <h2 className='text-2xl'>History</h2>
            </div>
            {orderHistory?.length > 0 ? (
                <div>
                    {orderHistory.map((history) => (
                        <div key={history.id} className='flex justify-center border-2 p-2 m-2'>
                            <div className='w-[920px] h-[330px]'>
                                <div className='flex justify-between h-[66px] bg-gray-200 mb-2'>
                                    <div className='flex justify-between '>
                                        <div className='flex flex-col justify-center mx-4 '>
                                            <div className='font-light text-xs'>ORDER PLACED</div>
                                            <div>
                                                {history.created.createdMonth}{' '}
                                                {history.created.createdDay}
                                                {', '} {history.created.createdYear}
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center justify-center mr-4 '>
                                            <div className='font-light text-xs text-start'>
                                                TOTAL
                                            </div>
                                            <div>${history.total}</div>
                                        </div>
                                    </div>

                                    <div className='py-2 pr-2'> ORDER # {history.id}</div>
                                </div>
                                <span className='font-medium text-xl '>
                                    {/* TODO
                                                convert mongoDB date format to yyyy-mm-dd
                                                this should be done I think.. before saving it to redux
                                                that means.. at backside? before sending data to front like saga or thunk */}
                                    Purchased {history.created.createdMonth}{' '}
                                    {history.created.createdDay}
                                    {', '} {history.created.createdYear}
                                </span>

                                {history.product?.map((item) => (
                                    // const orderData = new Date(orderHistory.).toISOString().slice(0, 10);
                                    <div key={item.id} className='my-4 mb-2  last:mb-0'>
                                        <div className='flex justify-start'>
                                            <div className='w-[100px] h-[90px] relative'>
                                                {/* TODO
                                                    when clicking image, go to product detail */}
                                                <img
                                                    src={item.image}
                                                    alt='representImage'
                                                    className='w-[90px] h-[90px]'
                                                />
                                                {item.quantity > 1 && (
                                                    <span className='absolute top-[71px] left-[93px] inline-flex items-center justify-center w-5 h-5 text-xs font-thin text-black bg-white border-[1px] border-gray-400 rounded-full'>
                                                        {item.quantity}
                                                    </span>
                                                )}
                                            </div>
                                            <div className='pl-4'>description</div>
                                        </div>
                                    </div>
                                ))}
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
