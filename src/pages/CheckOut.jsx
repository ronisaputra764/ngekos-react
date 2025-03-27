
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Checkout({ formatRupiah }) {
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("down");
    const [downPaymentPrice, setDownPaymentPrice] = useState(0);
    const [fullPaymentPrice, setFullPaymentPrice] = useState(0);
    const [previousPaymentData, setPreviousPaymentData] = useState(null);

    useEffect(() => {
        // Get booking data from sessionStorage
        const storedData = sessionStorage.getItem("completeBookingData");
        const previousPayment = sessionStorage.getItem("previousPaymentData");

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setBookingData(parsedData);

            // Calculate prices
            const basePrice = parsedData.totalPrice;
            const ppn = basePrice * 0.11;
            const insurance = 890000;

            setDownPaymentPrice(Math.round(basePrice * 0.3 + ppn + insurance));
            setFullPaymentPrice(Math.round(basePrice + ppn + insurance));

            // Check if there's previous payment data
            if (previousPayment) {
                const parsedPrevious = JSON.parse(previousPayment);
                setPreviousPaymentData(parsedPrevious);

                // Set payment method from previous data if available
                if (parsedPrevious.paymentMethod) {
                    setPaymentMethod(parsedPrevious.paymentMethod);
                }
            }
        } else {
            navigate("/"); // Redirect if no booking data
        }
    }, [navigate]);

    const handlePaymentChange = (method) => {
        setPaymentMethod(method);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare payment data to store in session
        const paymentData = {
            ...bookingData,
            paymentMethod,
            kosPrice: bookingData.totalPrice,
            subTotal: bookingData.totalPrice,
            ppn: bookingData.totalPrice * 0.11,
            insurance: 890000,
            grandTotal: paymentMethod === "down" ? downPaymentPrice : fullPaymentPrice,
            status: "pending",
            paymentDate: new Date().toISOString()
        };

        // Store payment data in session
        sessionStorage.setItem("previousPaymentData", JSON.stringify(paymentData));

        // Process payment and navigate to success page
        navigate("/booking-success");
    };

    if (!bookingData) {
        return <div>Loading...</div>;
    }

    // Format dates
    const startDate = new Date(bookingData.movingDate);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + bookingData.duration);

    const formatDate = (date) => {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach((accordion) => {
        // Calculate the height of each accordion element
        const height = accordion.scrollHeight;

        // Set the height as an inline style
        accordion.style.height = `${height}px`;
    });

    return (
        <div className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-white overflow-x-hidden">
            {/* Background */}
            <div className="absolute top-0 w-full h-[230px] rounded-b-[75px] bg-[linear-gradient(180deg,#F2F9E6_0%,#D2EDE4_100%)]"></div>

            {/* Top Navigation */}
            <div className="relative flex items-center justify-between px-5 mt-[60px]">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white"
                >
                    <img
                        src="/assets/images/icons/arrow-left.svg"
                        className="w-[28px] h-[28px]"
                        alt="back"
                    />
                </button>
                <p className="font-semibold">Checkout Koskos</p>
                <div className="dummy-btn w-12" />
            </div>

            {/* Property and Room Information */}
            <div className="relative flex items-center justify-between gap-2 px-5 mt-[18px]">
                <div className="flex flex-col w-full rounded-[30px] border border-[#F1F2F6] p-4 gap-4 bg-white">
                    <div className="flex gap-4">
                        <div className="flex w-[120px] h-[132px] shrink-0 rounded-[30px] bg-[#D9D9D9] overflow-hidden">
                            <img
                                src={`/assets/images/boarding_house/${bookingData.thumbnail}`}
                                className="w-full h-full object-cover"
                                alt="property"
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <p className="font-semibold text-lg leading-[27px] line-clamp-2 min-h-[54px]">
                                {bookingData.name}
                            </p>
                            <hr className="border-[#F1F2F6]" />
                            <div className="flex items-center gap-[6px]">
                                <img
                                    src="/assets/images/icons/location.svg"
                                    className="w-5 h-5 flex shrink-0"
                                    alt="location"
                                />
                                <p className="text-sm text-ngekos-grey">{bookingData.location}</p>
                            </div>
                            <div className="flex items-center gap-[6px]">
                                <img
                                    src="/assets/images/icons/profile-2user.svg"
                                    className="w-5 h-5 flex shrink-0"
                                    alt="category"
                                />
                                <p className="text-sm text-ngekos-grey">{bookingData.category}</p>
                            </div>
                        </div>
                    </div>

                    <hr className="border-[#F1F2F6]" />

                    <div className="flex gap-4">
                        <div className="flex w-[120px] h-[156px] shrink-0 rounded-[30px] bg-[#D9D9D9] overflow-hidden">
                            <img
                                src={`/assets/images/rooms/${bookingData.room.image}`}
                                className="w-full h-full object-cover"
                                alt="room"
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <p className="font-semibold text-lg leading-[27px]">{bookingData.room.name}</p>
                            <hr className="border-[#F1F2F6]" />
                            <div className="flex items-center gap-[6px]">
                                <img
                                    src="/assets/images/icons/profile-2user.svg"
                                    className="w-5 h-5 flex shrink-0"
                                    alt="capacity"
                                />
                                <p className="text-sm text-ngekos-grey">{bookingData.room.capacity}</p>
                            </div>
                            <div className="flex items-center gap-[6px]">
                                <img
                                    src="/assets/images/icons/3dcube.svg"
                                    className="w-5 h-5 flex shrink-0"
                                    alt="size"
                                />
                                <p className="text-sm text-ngekos-grey">{bookingData.room.sqft}</p>
                            </div>
                            <hr className="border-[#F1F2F6]" />
                            <p className="font-semibold text-lg text-ngekos-orange">
                                {formatRupiah(bookingData.room.price)}
                                <span className="text-sm text-ngekos-grey font-normal">/bulan</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Information Accordion */}
            <div className="accordion group flex flex-col rounded-[30px] p-5 bg-[#F5F6F8] mx-5 mt-5 overflow-hidden has-[:checked]:!h-[68px] transition-all duration-300">
                <label className="relative flex items-center justify-between">
                    <p className="font-semibold text-lg">Customer</p>
                    <img
                        src="/assets/images/icons/arrow-up.svg"
                        className="w-[28px] h-[28px] flex shrink-0 group-has-[:checked]:rotate-180 transition-all duration-300"
                        alt="toggle"
                    />
                    <input type="checkbox" className="absolute hidden" />
                </label>
                <div className="flex flex-col gap-4 pt-[22px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/images/icons/profile-2user.svg"
                                className="w-6 h-6 flex shrink-0"
                                alt="name"
                            />
                            <p className="text-ngekos-grey">Name</p>
                        </div>
                        <p className="font-semibold">{bookingData.customer.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/images/icons/sms.svg"
                                className="w-6 h-6 flex shrink-0"
                                alt="email"
                            />
                            <p className="text-ngekos-grey">Email</p>
                        </div>
                        <p className="font-semibold">{bookingData.customer.email}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/images/icons/call.svg"
                                className="w-6 h-6 flex shrink-0"
                                alt="phone"
                            />
                            <p className="text-ngekos-grey">Phone</p>
                        </div>
                        <p className="font-semibold">{bookingData.customer.phone}</p>
                    </div>
                </div>
            </div>

            {/* Booking Information Accordion */}
            <div className="accordion group flex flex-col rounded-[30px] p-5 bg-[#F5F6F8] mx-5 mt-5 overflow-hidden has-[:checked]:!h-[68px] transition-all duration-300">
                <label className="relative flex items-center justify-between">
                    <p className="font-semibold text-lg">Booking</p>
                    <img
                        src="/assets/images/icons/arrow-up.svg"
                        className="w-[28px] h-[28px] flex shrink-0 group-has-[:checked]:rotate-180 transition-all duration-300"
                        alt="toggle"
                    />
                    <input type="checkbox" className="absolute hidden" />
                </label>
                <div className="flex flex-col gap-4 pt-[22px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/images/icons/clock.svg"
                                className="w-6 h-6 flex shrink-0"
                                alt="duration"
                            />
                            <p className="text-ngekos-grey">Duration</p>
                        </div>
                        <p className="font-semibold">{bookingData.duration} Months</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/images/icons/calendar.svg"
                                className="w-6 h-6 flex shrink-0"
                                alt="start-date"
                            />
                            <p className="text-ngekos-grey">Started At</p>
                        </div>
                        <p className="font-semibold">{formatDate(startDate)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/images/icons/calendar.svg"
                                className="w-6 h-6 flex shrink-0"
                                alt="end-date"
                            />
                            <p className="text-ngekos-grey">Ended At</p>
                        </div>
                        <p className="font-semibold">{formatDate(endDate)}</p>
                    </div>
                </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-6 mt-5 pt-5">
                <div className="flex flex-col rounded-[30px] border border-[#F1F2F6] p-5 gap-4 mx-5">
                    <div className="flex items-center justify-between border-b border-[#F1F2F6] gap-[18px]">
                        {/* Down Payment Option */}
                        <label className="tab-link group relative flex flex-col justify-between gap-4">
                            <input
                                type="radio"
                                name="Payment"
                                value="down"
                                checked={paymentMethod === "down"}
                                onChange={() => handlePaymentChange("down")}
                                className="absolute -z-10 top-1/2 left-1/2 opacity-0"
                            />
                            <div className="flex items-center gap-3 mx-auto">
                                <div className="relative w-6 h-6">
                                    <img
                                        src="/assets/images/icons/status-orange.svg"
                                        className={`absolute w-6 h-6 flex shrink-0 transition-all duration-300 ${paymentMethod === "down" ? "opacity-100" : "opacity-0"}`}
                                        alt="down-payment"
                                    />
                                    <img
                                        src="/assets/images/icons/status.svg"
                                        className={`absolute w-6 h-6 flex shrink-0 transition-all duration-300 ${paymentMethod === "down" ? "opacity-0" : "opacity-100"}`}
                                        alt="down-payment"
                                    />
                                </div>
                                <p className="font-semibold">Down Payment</p>
                            </div>
                            <div className={`w-0 mx-auto transition-all duration-300 ${paymentMethod === "down" ? "ring-1 ring-[#91BF77] w-[90%]" : ""}`}></div>
                        </label>

                        <div className="flex h-6 w-[1px] border border-[#F1F2F6] mb-auto" />

                        {/* Full Payment Option */}
                        <label className="tab-link group relative flex flex-col justify-between gap-4">
                            <input
                                type="radio"
                                name="Payment"
                                value="full"
                                checked={paymentMethod === "full"}
                                onChange={() => handlePaymentChange("full")}
                                className="absolute -z-10 top-1/2 left-1/2 opacity-0"
                            />
                            <div className="flex items-center gap-3 mx-auto">
                                <div className="relative w-6 h-6">
                                    <img
                                        src="/assets/images/icons/diamonds-orange.svg"
                                        className={`absolute w-6 h-6 flex shrink-0 transition-all duration-300 ${paymentMethod === "full" ? "opacity-100" : "opacity-0"}`}
                                        alt="full-payment"
                                    />
                                    <img
                                        src="/assets/images/icons/diamonds.svg"
                                        className={`absolute w-6 h-6 flex shrink-0 transition-all duration-300 ${paymentMethod === "full" ? "opacity-0" : "opacity-100"}`}
                                        alt="full-payment"
                                    />
                                </div>
                                <p className="font-semibold">Pay in Full</p>
                            </div>
                            <div className={`w-0 mx-auto transition-all duration-300 ${paymentMethod === "full" ? "ring-1 ring-[#91BF77] w-[90%]" : ""}`}></div>
                        </label>
                    </div>

                    {/* Payment Details */}
                    <div>
                        {/* Down Payment Details */}
                        <div className={`flex flex-col gap-4 ${paymentMethod === "down" ? "" : "hidden"}`}>
                            <p className="text-sm text-ngekos-grey">
                                Anda perlu melunasi pembayaran secara cash setelah melakukan survey koskos
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/icons/card-tick.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="payment"
                                    />
                                    <p className="text-ngekos-grey">Payment</p>
                                </div>
                                <p className="font-semibold">Down Payment 30%</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/icons/receipt-2.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="subtotal"
                                    />
                                    <p className="text-ngekos-grey">Sub Total</p>
                                </div>
                                <p className="font-semibold">Rp {bookingData.totalPrice.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/icons/receipt-disscount.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="ppn"
                                    />
                                    <p className="text-ngekos-grey">PPN 11%</p>
                                </div>
                                <p className="font-semibold">Rp {(bookingData.totalPrice * 0.11).toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/icons/security-user.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="insurance"
                                    />
                                    <p className="text-ngekos-grey">Insurance</p>
                                </div>
                                <p className="font-semibold">Rp 890,000</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/icons/receipt-text.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="grand-total"
                                    />
                                    <p className="text-ngekos-grey">Grand total (30%)</p>
                                </div>
                                <p className="font-semibold">Rp {downPaymentPrice.toLocaleString('id-ID')}</p>
                            </div>
                        </div>

                        {/* Full Payment Details */}
                        <div className={`flex flex-col gap-4 ${paymentMethod === "full" ? "" : "hidden"}`}>
                            <p className="text-sm text-ngekos-grey">
                                Anda tidak perlu membayar biaya tambahan apapun ketika survey koskos
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/icons/card-tick.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="payment"
                                    />
                                    <p className="text-ngekos-grey">Payment</p>
                                </div>
                                <p className="font-semibold">Full Payment 100%</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/icons/receipt-2.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="subtotal"
                                    />
                                    <p className="text-ngekos-grey">Sub Total</p>
                                </div>
                                <p className="font-semibold">Rp {bookingData.totalPrice.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/icons/receipt-disscount.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="ppn"
                                    />
                                    <p className="text-ngekos-grey">PPN 11%</p>
                                </div>
                                <p className="font-semibold">Rp {(bookingData.totalPrice * 0.11).toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/icons/security-user.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="insurance"
                                    />
                                    <p className="text-ngekos-grey">Insurance</p>
                                </div>
                                <p className="font-semibold">Rp 890,000</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/icons/receipt-text.svg"
                                        className="w-6 h-6 flex shrink-0"
                                        alt="grand-total"
                                    />
                                    <p className="text-ngekos-grey">Grand total</p>
                                </div>
                                <p className="font-semibold">Rp {fullPaymentPrice.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation with Payment Button */}
                <div className="relative flex w-full h-[132px] shrink-0">
                    <div className="fixed bottom-5 w-full max-w-[640px] px-5 z-10">
                        <div className="flex items-center justify-between rounded-[40px] py-4 px-6 bg-[#070707]">
                            <div className="flex flex-col gap-[2px]">
                                <p className="font-bold text-xl leading-[30px] text-white">
                                    Rp {paymentMethod === "down"
                                        ? downPaymentPrice.toLocaleString('id-ID')
                                        : fullPaymentPrice.toLocaleString('id-ID')}
                                </p>
                                <span className="text-sm text-white">Grand Total</span>
                            </div>
                            <button
                                type="submit"
                                className="flex shrink-0 rounded-full py-[14px] px-5 bg-[#FF801A] font-bold text-white"
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}