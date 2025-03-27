import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function BookingDetails({ formatRupiah }) {

    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState(null);
    const [previousData, setPreviousData] = useState(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem("completeBookingData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setBookingData(parsedData);
        }
    }, []);

    useEffect(() => {
        const storedData = sessionStorage.getItem("previousPaymentData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setPreviousData(parsedData);
        }
    }, []);

    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach((accordion) => {
        // Calculate the height of each accordion element
        const height = accordion.scrollHeight;

        // Set the height as an inline style
        accordion.style.height = `${height}px`;
    });

    return (
        <>
            <div
                id="Content-Container"
                className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-white overflow-x-hidden"
            >
                <div
                    id="Background"
                    className="absolute top-0 w-full h-[230px] rounded-b-[75px] bg-[linear-gradient(180deg,#F2F9E6_0%,#D2EDE4_100%)]"
                />
                <div
                    id="TopNav"
                    className="relative flex items-center justify-between px-5 mt-[60px]"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="w-12 h-12 flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white"
                    >
                        <img
                            src="assets/images/icons/arrow-left.svg"
                            className="w-[28px] h-[28px]"
                            alt="icon"
                        />
                    </button>
                    <p className="font-semibold">My Booking Details</p>
                    <div className="dummy-btn w-12" />
                </div>
                <div
                    id="Header"
                    className="relative flex items-center justify-between gap-2 px-5 mt-[18px]"
                >
                    <div className="flex flex-col w-full rounded-[30px] border border-[#F1F2F6] p-4 gap-4 bg-white">
                        <div className="flex gap-4">
                            <div className="flex w-[120px] h-[132px] shrink-0 rounded-[30px] bg-[#D9D9D9] overflow-hidden">
                                <img
                                    src={`assets/images/boarding_house/${bookingData?.thumbnail}`}
                                    className="w-full h-full object-cover"
                                    alt="icon"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <p className="font-semibold text-lg leading-[27px] line-clamp-2 min-h-[54px]">
                                    {bookingData?.name}
                                </p>
                                <hr className="border-[#F1F2F6]" />
                                <div className="flex items-center gap-[6px]">
                                    <img
                                        src="assets/images/icons/location.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-sm text-ngekos-grey">{bookingData?.location} City</p>
                                </div>
                                <div className="flex items-center gap-[6px]">
                                    <img
                                        src="assets/images/icons/profile-2user.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-sm text-ngekos-grey">{bookingData?.category}</p>
                                </div>
                            </div>
                        </div>
                        <hr className="border-[#F1F2F6]" />
                        <div className="flex gap-4">
                            <div className="flex w-[120px] h-[138px] shrink-0 rounded-[30px] bg-[#D9D9D9] overflow-hidden">
                                <img
                                    src={`assets/images/rooms/${bookingData?.room.image}`}
                                    className="w-full h-full object-cover"
                                    alt="icon"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <p className="font-semibold text-lg leading-[27px]">{bookingData?.room.name}</p>
                                <hr className="border-[#F1F2F6]" />
                                <div className="flex items-center gap-[6px]">
                                    <img
                                        src="assets/images/icons/profile-2user.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-sm text-ngekos-grey">{bookingData?.room.capacity}</p>
                                </div>
                                <div className="flex items-center gap-[6px]">
                                    <img
                                        src="assets/images/icons/3dcube.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-sm text-ngekos-grey">{bookingData?.room.sqft}</p>
                                </div>
                                <div className="flex items-center gap-[6px]">
                                    <img
                                        src="assets/images/icons/shopping-bag.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-sm text-ngekos-grey">Bonus Included</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion group flex flex-col rounded-[30px] p-5 bg-[#F5F6F8] mx-5 mt-5 overflow-hidden has-[:checked]:!h-[68px] transition-all duration-300">
                    <label className="relative flex items-center justify-between">
                        <p className="font-semibold text-lg">Customer</p>
                        <img
                            src="assets/images/icons/arrow-up.svg"
                            className="w-[28px] h-[28px] flex shrink-0 group-has-[:checked]:rotate-180 transition-all duration-300"
                            alt="icon"
                        />
                        <input type="checkbox" className="absolute hidden" />
                    </label>
                    <div className="flex flex-col gap-4 pt-[22px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/profile-2user.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Name</p>
                            </div>
                            <p className="font-semibold">{bookingData?.customer.name}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/sms.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Email</p>
                            </div>
                            <p className="font-semibold">{bookingData?.customer.email}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/call.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Phone</p>
                            </div>
                            <p className="font-semibold">{bookingData?.customer.phone}</p>
                        </div>
                    </div>
                </div>
                <div className="accordion group flex flex-col rounded-[30px] p-5 bg-[#F5F6F8] mx-5 mt-5 overflow-hidden has-[:checked]:!h-[68px] transition-all duration-300">
                    <label className="relative flex items-center justify-between">
                        <p className="font-semibold text-lg">Booking</p>
                        <img
                            src="assets/images/icons/arrow-up.svg"
                            className="w-[28px] h-[28px] flex shrink-0 group-has-[:checked]:rotate-180 transition-all duration-300"
                            alt="icon"
                        />
                        <input type="checkbox" className="absolute hidden" />
                    </label>
                    <div className="flex flex-col gap-4 pt-[22px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/calendar.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Booking ID</p>
                            </div>
                            <p className="font-semibold">{bookingData?.transactionId}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/clock.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Duration</p>
                            </div>
                            <p className="font-semibold">{bookingData?.duration} Months</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/calendar.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Started At</p>
                            </div>
                            <p className="font-semibold">{bookingData?.movingDate}</p>
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/calendar.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Ended At</p>
                            </div>
                            <p className="font-semibold">10 Maret 2024</p>
                        </div> */}
                    </div>
                </div>
                <div className="accordion group flex flex-col rounded-[30px] p-5 bg-[#F5F6F8] mx-5 mt-5 overflow-hidden has-[:checked]:!h-[68px] transition-all duration-300">
                    <label className="relative flex items-center justify-between">
                        <p className="font-semibold text-lg">Payment</p>
                        <img
                            src="assets/images/icons/arrow-up.svg"
                            className="w-[28px] h-[28px] flex shrink-0 group-has-[:checked]:rotate-180 transition-all duration-300"
                            alt="icon"
                        />
                        <input type="checkbox" className="absolute hidden" />
                    </label>
                    <div className="flex flex-col gap-4 pt-[22px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/card-tick.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Payment</p>
                            </div>
                            <p className="font-semibold">{previousData?.paymentMethod} payment</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/receipt-2.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Kos Price</p>
                            </div>
                            <p className="font-semibold">{formatRupiah(bookingData?.room.price)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/receipt-2.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Sub Total</p>
                            </div>
                            <p className="font-semibold">{formatRupiah(previousData?.subTotal)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/receipt-disscount.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">PPN 11%</p>
                            </div>
                            <p className="font-semibold">{formatRupiah(previousData?.ppn)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/security-user.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Insurance</p>
                            </div>
                            <p className="font-semibold">{formatRupiah(previousData?.insurance)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="assets/images/icons/receipt-text.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-ngekos-grey">Grand total</p>
                            </div>
                            <p className="font-semibold">{formatRupiah(previousData?.grandTotal)}</p>
                        </div>

                        {previousData?.status === 'pending' ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="assets/images/icons/security-card.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-ngekos-grey">Status</p>
                                </div>
                                <p className="rounded-full p-[6px_12px] bg-[#FF801A] font-bold text-xs leading-[18px]">
                                    PENDING
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="assets/images/icons/security-card.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-ngekos-grey">Status</p>
                                </div>
                                <p className="rounded-full p-[6px_12px] bg-[#91BF77] font-bold text-xs leading-[18px]">
                                    SUCCESSFUL
                                </p>
                            </div>
                        )}

                    </div>
                </div>
                <div id="BottomButton" className="relative flex w-full h-[98px] shrink-0">
                    <div className="fixed bottom-[30px] w-full max-w-[640px] px-5 z-10">
                        <a
                            href="#"
                            className="flex w-full justify-center rounded-full p-[14px_20px] bg-[#FF801A] font-bold text-white"
                        >
                            Contact Customer Service
                        </a>
                    </div>
                </div>
            </div>

        </>
    );
}