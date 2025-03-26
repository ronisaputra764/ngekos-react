import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';

export default function CustInfo({ boardingHouse, formatRupiah }) {

    const navigate = useNavigate();
    const { id } = useParams();

    const house = boardingHouse.find((house) => house.id === id);

    const [bookingData, setBookingData] = useState(null);
    const [duration, setDuration] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dates, setDates] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        const storedData = sessionStorage.getItem("bookingData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setBookingData(parsedData);

            // Jika ada data customer di session, isi ke form
            if (parsedData.customer) {
                setCustomerInfo({
                    name: parsedData.customer.name || '',
                    email: parsedData.customer.email || '',
                    phone: parsedData.customer.phone || ''
                });
            }
        }

        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const generatedDates = [];

        for (let i = today.getDate(); i <= lastDayOfMonth; i++) {
            const date = new Date(today.getFullYear(), today.getMonth(), i);
            const realDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
            generatedDates.push(realDate);
        }

        setDates(generatedDates);
        setSelectedDate(generatedDates[0]);
        // ... generate dates
    }, [id, boardingHouse]);


    const handleDurationChange = (value) => {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue)) {
            setDuration(Math.max(1, Math.min(999, numValue)));
        }
    };

    const handleMinusClick = () => {
        setDuration(prev => Math.max(1, prev - 1));
    };

    const handlePlusClick = () => {
        setDuration(prev => Math.min(999, prev + 1));
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateTotalPrice = bookingData?.room.price * duration;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi
        if (!selectedDate) {
            alert("Please select a moving date");
            return;
        }
        if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
            alert("Please fill all customer fields");
            return;
        }

        const generateRandomString = (length) => {
            const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };

        // Generate transaction ID (format: TRX-YYYYMMDD-RANDOM8)
        const now = new Date();
        const datePart = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
        const randomPart = generateRandomString(8); // 8 karakter random
        const transactionId = `TRX-${datePart}-${randomPart}`;


        // Gabungkan data
        const completeData = {

            transactionId,
            bookingDate: now.toISOString(),
            status: "PENDING",

            // Data properti dari session lama
            id: bookingData.id,
            name: bookingData.name,
            thumbnail: bookingData.thumbnail,
            location: bookingData.location,
            category: bookingData.category,

            // Data customer dari form
            customer: customerInfo,

            // Data booking baru
            duration,
            movingDate: selectedDate,
            totalPrice: calculateTotalPrice,

            // Data kamar dari session lama
            room: bookingData.room
        };

        sessionStorage.setItem("completeBookingData", JSON.stringify(completeData));
        navigate("/checkout");
    };

    if (!bookingData || !house) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div
                id="Content-Container"
                className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-white overflow-x-hidden"
            >
                <div
                    id="Background"
                    className="absolute top-0 w-full h-[230px] rounded-b-[75px] bg-[linear-gradient(180deg,#F2F9E6_0%,#D2EDE4_100%)]"
                ></div>
                <div
                    id="TopNav"
                    className="relative flex items-center justify-between px-5 mt-[60px]"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="w-12 h-12 flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white"
                    >
                        <img
                            src="/assets/images/icons/arrow-left.svg"
                            className="w-[28px] h-[28px]"
                            alt="icon"
                        />
                    </button>
                    <p className="font-semibold">Customer Information</p>
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
                                    src={`/assets/images/boarding_house/${house.thumbnail}`}
                                    className="w-full h-full object-cover"
                                    alt="icon"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <p className="font-semibold text-lg leading-[27px] line-clamp-2 min-h-[54px]">
                                    {house.name}
                                </p>
                                <hr className="border-[#F1F2F6]" />
                                <div className="flex items-center gap-[6px]">
                                    <img
                                        src="/assets/images/icons/location.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-sm text-ngekos-grey">{bookingData?.location} City</p>
                                </div>
                                <div className="flex items-center gap-[6px]">
                                    <img
                                        src="/assets/images/icons/profile-2user.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-sm text-ngekos-grey">{bookingData?.category}</p>
                                </div>
                            </div>
                        </div>
                        <hr className="border-[#F1F2F6]" />
                        <div className="flex gap-4">
                            <div className="flex w-[120px] h-[156px] shrink-0 rounded-[30px] bg-[#D9D9D9] overflow-hidden">
                                <img
                                    src={`/assets/images/rooms/${bookingData?.room.image}`}
                                    className="w-full h-full object-cover"
                                    alt="icon"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <p className="font-semibold text-lg leading-[27px]">{bookingData?.room.name}</p>
                                <hr className="border-[#F1F2F6]" />
                                <div className="flex items-center gap-[6px]">
                                    <img
                                        src="/assets/images/icons/profile-2user.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-sm text-ngekos-grey">{bookingData?.room.capacity}</p>
                                </div>
                                <div className="flex items-center gap-[6px]">
                                    <img
                                        src="/assets/images/icons/3dcube.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <p className="text-sm text-ngekos-grey">{bookingData?.room.sqft}</p>
                                </div>
                                <hr className="border-[#F1F2F6]" />
                                <p className="font-semibold text-lg text-ngekos-orange">
                                    {formatRupiah(bookingData?.room.price)}
                                    <span className="text-sm text-ngekos-grey font-normal">/bulan</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="relative flex flex-col gap-6 mt-5 pt-5 bg-[#F5F6F8]"
                >
                    <div className="flex flex-col gap-[6px] px-5">
                        <h1 className="font-semibold text-lg">Your Informations</h1>
                        <p className="text-sm text-ngekos-grey">
                            Fill the fields below with your valid data
                        </p>
                    </div>
                    <div id="InputContainer" className="flex flex-col gap-[18px]">
                        <div className="flex flex-col w-full gap-2 px-5">
                            <p className="font-semibold">Complete Name</p>
                            <label className="flex items-center w-full rounded-full p-[14px_20px] gap-3 bg-white focus-within:ring-1 focus-within:ring-[#91BF77] transition-all duration-300">
                                <img
                                    src="/assets/images/icons/profile-2user.svg"
                                    className="w-5 h-5 flex shrink-0"
                                    alt="icon"
                                />
                                <input
                                    type="text"
                                    value={customerInfo.name}
                                    onChange={handleInputChange}
                                    name="name"
                                    className="appearance-none outline-none w-full font-semibold placeholder:text-ngekos-grey placeholder:font-normal"
                                    placeholder="Write your name"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col w-full gap-2 px-5">
                            <p className="font-semibold">Email Address</p>
                            <label className="flex items-center w-full rounded-full p-[14px_20px] gap-3 bg-white focus-within:ring-1 focus-within:ring-[#91BF77] transition-all duration-300">
                                <img
                                    src="/assets/images/icons/sms.svg"
                                    className="w-5 h-5 flex shrink-0"
                                    alt="icon"
                                />
                                <input
                                    type="email"
                                    value={customerInfo.email}
                                    onChange={handleInputChange}
                                    name="email"
                                    className="appearance-none outline-none w-full font-semibold placeholder:text-ngekos-grey placeholder:font-normal"
                                    placeholder="Write your email"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col w-full gap-2 px-5">
                            <p className="font-semibold">Phone No</p>
                            <label className="flex items-center w-full rounded-full p-[14px_20px] gap-3 bg-white focus-within:ring-1 focus-within:ring-[#91BF77] transition-all duration-300">
                                <img
                                    src="/assets/images/icons/call.svg"
                                    className="w-5 h-5 flex shrink-0"
                                    alt="icon"
                                />
                                <input
                                    type="tel"
                                    value={customerInfo.phone}
                                    onChange={handleInputChange}
                                    name="phone"
                                    className="appearance-none outline-none w-full font-semibold placeholder:text-ngekos-grey placeholder:font-normal"
                                    placeholder="Write your phone"
                                />
                            </label>
                        </div>
                        <div className="flex items-center justify-between px-5">
                            <p className="font-semibold">Duration in Month</p>
                            <div className="relative flex items-center gap-[10px] w-fit">
                                <button onClick={handleMinusClick} type="button" id="Minus" className="w-12 h-12 flex-shrink-0">
                                    <img src="/assets/images/icons/minus.svg" alt="icon" />
                                </button>
                                <input
                                    value={duration}
                                    onChange={(e) => handleDurationChange(e.target.value)}
                                    type="text"
                                    name="duration"
                                    className="appearance-none outline-none !bg-transparent w-[42px] text-center font-semibold text-[22px] leading-[33px]"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                />
                                <button onClick={handlePlusClick} type="button" id="Plus" className="w-12 h-12 flex-shrink-0">
                                    <img src="/assets/images/icons/plus.svg" alt="icon" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold px-5">Moving Date</p>
                            <Swiper slidesPerView="auto"
                                spaceBetween={14}
                                slidesOffsetAfter={20}
                                slidesOffsetBefore={20}
                                className="w-full overflow-x-hidden"
                            >
                                {dates.map((date) => {
                                    const dateObj = new Date(date);
                                    const day = dateObj.getDate();
                                    const month = dateObj.toLocaleString('default', { month: 'short' });

                                    return (
                                        <SwiperSlide key={date} className="!w-fit py-[2px]">
                                            <label className={`relative flex flex-col items-center justify-center w-fit rounded-3xl p-[14px_20px] gap-3 
                                    border transition-all duration-300
                                    ${selectedDate === date
                                                    ? 'bg-[#F2F9E6] border-[#91BF77] ring-2 ring-[#91BF77]'
                                                    : 'bg-white border-white hover:border-[#91BF77]'}
                `}>
                                                <img src="/assets/images/icons/calendar.svg" className="w-8 h-8" alt="calendar" />
                                                <p className="font-semibold text-nowrap">{day} {month}</p>
                                                <input
                                                    type="radio"
                                                    name="start_date"
                                                    className="absolute top-1/2 left-1/2 -z-10 opacity-0"
                                                    value={date}
                                                    checked={selectedDate === date}
                                                    onChange={() => setSelectedDate(date)}
                                                    required
                                                />
                                            </label>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                    <div
                        id="BottomNav"
                        className="relative flex w-full h-[132px] shrink-0 bg-white"
                    >
                        <div className="fixed bottom-5 w-full max-w-[640px] px-5 z-10">
                            <div className="flex items-center justify-between rounded-[40px] py-4 px-6 bg-[#070707]">
                                <div className="flex flex-col gap-[2px]">
                                    <p
                                        id="price"
                                        className="font-bold text-xl leading-[30px] text-white"
                                    >
                                        {formatRupiah(calculateTotalPrice)}
                                    </p>
                                    <span className="text-sm text-white">Grand Total</span>
                                </div>
                                <button
                                    type="submit"
                                    className="flex hover:cursor-pointer shrink-0 rounded-full py-[14px] px-5 bg-[#FF801A] font-bold text-white"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}