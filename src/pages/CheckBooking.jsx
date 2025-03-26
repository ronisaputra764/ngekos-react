import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function CheckBooking() {

    const navigate = useNavigate();

    const [bookingData, setBookingData] = useState(null);
    const [bookingId, setBookingId] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const storedData = sessionStorage.getItem("completeBookingData");

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setBookingData(parsedData);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (bookingId === bookingData?.transactionId && email === bookingData?.customer.email && phone === bookingData?.customer.phone) {
            navigate("/booking-details");
        } else {
            setError("There is no transaction");
        }
    };

    return (
        <>
            <div
                id="Content-Container"
                className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-white overflow-x-hidden"
            >
                <div
                    id="Background"
                    className="absolute top-0 w-full h-[430px] rounded-b-[75px] bg-[linear-gradient(180deg,#F2F9E6_0%,#D2EDE4_100%)]"
                ></div>
                <div className="relative flex flex-col gap-[30px] my-[60px] px-5">
                    <h1 className="font-bold text-[30px] leading-[45px] text-center">
                        Check Your
                        <br />
                        Booking Details
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col rounded-[30px] border border-[#F1F2F6] p-5 gap-6 bg-white"
                    >
                        <div className="flex flex-col gap-[6px]">
                            <h1 className="font-semibold text-lg">Your Informations</h1>
                            <p className="text-sm text-ngekos-grey">
                                Fill the fields below with your valid data
                            </p>
                        </div>

                        {error && <p className="text-red-500">{error}</p>}

                        <div id="InputContainer" className="flex flex-col gap-[18px]">
                            <div className="flex flex-col w-full gap-2">
                                <p className="font-semibold">Booking ID</p>
                                <label className="flex items-center w-full rounded-full p-[14px_20px] gap-3 bg-white ring-1 ring-[#F1F2F6] focus-within:ring-[#91BF77] transition-all duration-300">
                                    <img
                                        src="assets/images/icons/note-favorite-grey.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <input
                                        type="text"
                                        value={bookingId}
                                        onChange={(e) => setBookingId(e.target.value)}
                                        className="appearance-none outline-none w-full font-semibold placeholder:text-ngekos-grey placeholder:font-normal"
                                        placeholder="Write your booking id"
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <p className="font-semibold">Email Address</p>
                                <label className="flex items-center w-full rounded-full p-[14px_20px] gap-3 bg-white ring-1 ring-[#F1F2F6] focus-within:ring-[#91BF77] transition-all duration-300">
                                    <img
                                        src="assets/images/icons/sms.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none outline-none w-full font-semibold placeholder:text-ngekos-grey placeholder:font-normal"
                                        placeholder="Write your email"
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <p className="font-semibold">Phone No</p>
                                <label className="flex items-center w-full rounded-full p-[14px_20px] gap-3 bg-white ring-1 ring-[#F1F2F6] focus-within:ring-[#91BF77] transition-all duration-300">
                                    <img
                                        src="assets/images/icons/call.svg"
                                        className="w-5 h-5 flex shrink-0"
                                        alt="icon"
                                    />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="appearance-none outline-none w-full font-semibold placeholder:text-ngekos-grey placeholder:font-normal"
                                        placeholder="Write your phone"
                                    />
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-full p-[14px_20px] bg-[#FF801A] font-bold text-white"
                            >
                                View My Booking
                            </button>
                        </div>
                    </form>
                </div>
                <div id="BottomNav" className="relative flex w-full h-[138px] shrink-0">
                    <nav className="fixed bottom-5 w-full max-w-[640px] px-5 z-10">
                        <div className="grid grid-cols-4 h-fit rounded-[40px] justify-between py-4 px-5 bg-[#070707]">
                            <Link
                                to={"/"}
                                className="flex flex-col items-center text-center gap-2"
                            >
                                <img
                                    src="assets/images/icons/global.svg"
                                    className="w-8 h-8 flex shrink-0"
                                    alt="icon"
                                />
                                <span className="font-semibold text-sm text-white">Discover</span>
                            </Link>
                            <Link
                                to={"/check-booking"}
                                className="flex flex-col items-center text-center gap-2"
                            >
                                <img
                                    src="assets/images/icons/note-favorite-green.svg"
                                    className="w-8 h-8 flex shrink-0"
                                    alt="icon"
                                />
                                <span className="font-semibold text-sm text-white">Orders</span>
                            </Link>
                            <a
                                href="#"
                                className="flex flex-col items-center text-center gap-2"
                            >
                                <img
                                    src="assets/images/icons/search-status.svg"
                                    className="w-8 h-8 flex shrink-0"
                                    alt="icon"
                                />
                                <span className="font-semibold text-sm text-white">Find</span>
                            </a>
                            <a href="#" className="flex flex-col items-center text-center gap-2">
                                <img
                                    src="assets/images/icons/24-support.svg"
                                    className="w-8 h-8 flex shrink-0"
                                    alt="icon"
                                />
                                <span className="font-semibold text-sm text-white">Help</span>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    );
}