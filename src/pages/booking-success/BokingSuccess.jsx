import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function BookingSuccess() {

    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem("completeBookingData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setBookingData(parsedData);
        }
    }, []);

    return (
        <>
            <div
                id="Content-Container"
                className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-white overflow-x-hidden"
            >
                <div
                    id="Background"
                    className="absolute top-0 w-full h-[430px] rounded-b-[75px] bg-[linear-gradient(180deg,#F2F9E6_0%,#D2EDE4_100%)]"
                />
                <div className="relative flex flex-col gap-[30px] my-[60px] px-5">
                    <h1 className="font-bold text-[30px] leading-[45px] text-center">
                        Booking Successful
                        <br />
                        Congratulations!
                    </h1>
                    <div
                        id="Header"
                        className="relative flex items-center justify-between gap-2"
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
                                        <p className="text-sm text-ngekos-grey">{bookingData?.location}City</p>
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
                                    <p className="font-semibold text-lg leading-[27px]">
                                        Executive Room
                                    </p>
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
                                            src="assets/images/icons/calendar.svg"
                                            className="w-5 h-5 flex shrink-0"
                                            alt="icon"
                                        />
                                        <p className="text-sm text-ngekos-grey">{bookingData?.movingDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[18px]">
                        <p className="font-semibold">Your Booking ID</p>
                        <div className="flex items-center rounded-full p-[14px_20px] gap-3 bg-[#F5F6F8]">
                            <img
                                src="assets/images/icons/note-favorite-green.svg"
                                className="w-5 h-5 flex shrink-0"
                                alt="icon"
                            />
                            <p className="font-semibold">{bookingData?.transactionId}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[14px]">
                        <Link
                            to={"/"}
                            className="w-full rounded-full p-[14px_20px] text-center font-bold text-white bg-[#FF801A]"
                        >
                            Explore Other Kos
                        </Link>
                        <Link
                            to={"/booking-details"}
                            className="w-full rounded-full p-[14px_20px] text-center font-bold text-white bg-[#070707]"
                        >
                            View My Booking
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}