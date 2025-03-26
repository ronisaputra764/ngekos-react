import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";

export default function RoomAvailable({ boardingHouse, formatRupiah, getCityNameById, getCategoryNameById }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedRoom, setSelectedRoom] = useState(null);

    const house = boardingHouse.find((house) => house.id === id);

    // Data rooms bisa diambil dari props atau API
    const rooms = [
        {
            name: "Deluxe Room",
            image: "room8.jpg",
            capacity: "1 People",
            sqft: "184 sqft flat",
            price: 1793444
        },
        {
            name: "Executive Room",
            image: "room6.jpg",
            capacity: "2 People",
            sqft: "184 sqft flat",
            price: 3250000
        },
        {
            name: "President Estate",
            image: "room7.jpg",
            capacity: "4 People",
            sqft: "184 sqft flat",
            price: 5300000
        }
    ];

    const handleRoomChange = (room) => {
        setSelectedRoom(room);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedRoom) {
            alert("Please select a room");
            return;
        }

        // Simpan data ke session storage
        const bookingData = {
            id: house.id,
            name: house.name,
            thumbnail: house.thumbnail,
            location: getCityNameById(house.city_id),
            category: getCategoryNameById(house.category_id),
            capacity: rooms.capacity,
            sqft: rooms.sqft,
            price: rooms.price,
            roomImage: rooms.image,
            room: selectedRoom,
        };

        //         alert(`Booking Data:
        // ID: ${bookingData.id}
        // Name: ${bookingData.name}
        // Thumbnail: ${bookingData.thumbnail}
        // Location: ${bookingData.location}
        // Sqft: ${bookingData.room.sqft}
        // Room Name: ${bookingData.room.name}
        // Room Price: ${bookingData.room.price}`);


        sessionStorage.setItem("bookingData", JSON.stringify(bookingData));

        navigate(`/cust-info/${id}`);

    };

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
                    <p className="font-semibold">Choose Available Room</p>
                    <div className="dummy-btn w-12" />
                </div>
                <div
                    id="Header"
                    className="relative flex items-center justify-between gap-2 px-5 mt-[18px]"
                >
                    <div className="flex w-full rounded-[30px] border border-[#F1F2F6] p-4 gap-4 bg-white">
                        <div className="flex w-[120px] h-[132px] shrink-0 rounded-[30px] bg-[#D9D9D9] overflow-hidden">
                            <img
                                src={`/assets/images/boarding_house/${house.thumbnail}`}
                                className="w-full h-full object-cover"
                                alt="icon"
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <h1 className="font-semibold text-lg leading-[27px] line-clamp-2 min-h-[54px]">
                                {house.name}
                            </h1>
                            <hr className="border-[#F1F2F6]" />
                            <div className="flex items-center gap-[6px]">
                                <img
                                    src="/assets/images/icons/location.svg"
                                    className="w-5 h-5 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-sm text-ngekos-grey">{getCityNameById(house.city_id)} City</p>
                            </div>
                            <div className="flex items-center gap-[6px]">
                                <img
                                    src="/assets/images/icons/profile-2user.svg"
                                    className="w-5 h-5 flex shrink-0"
                                    alt="icon"
                                />
                                <p className="text-sm text-ngekos-grey">{getCategoryNameById(house.category_id)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 mt-5">
                    <h2 className="font-bold px-5">Available Rooms</h2>
                    <div id="RoomsContainer" className="flex flex-col gap-4 px-5">
                        {rooms.map((room, index) => (
                            <label key={index} className="relative group">
                                <input
                                    type="radio"
                                    name="room"
                                    className="absolute top-1/2 left-1/2 -z-10 opacity-0"
                                    required
                                    onChange={() => handleRoomChange(room)}
                                    checked={selectedRoom?.name === room.name}
                                />
                                <div className="flex rounded-[30px] border border-[#F1F2F6] p-4 gap-4 bg-white hover:border-[#91BF77] group-has-[:checked]:ring-2 group-has-[:checked]:ring-[#91BF77] transition-all duration-300">
                                    <div className="flex w-[120px] h-[156px] shrink-0 rounded-[30px] bg-[#D9D9D9] overflow-hidden">
                                        <img
                                            src={`/assets/images/rooms/${room.image}`}
                                            className="w-full h-full object-cover"
                                            alt="icon"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 w-full">
                                        <h3 className="font-semibold text-lg leading-[27px]">
                                            {room.name}
                                        </h3>
                                        <hr className="border-[#F1F2F6]" />
                                        <div className="flex items-center gap-[6px]">
                                            <img
                                                src="/assets/images/icons/profile-2user.svg"
                                                className="w-5 h-5 flex shrink-0"
                                                alt="icon"
                                            />
                                            <p className="text-sm text-ngekos-grey">{room.capacity}</p>
                                        </div>
                                        <div className="flex items-center gap-[6px]">
                                            <img
                                                src="/assets/images/icons/3dcube.svg"
                                                className="w-5 h-5 flex shrink-0"
                                                alt="icon"
                                            />
                                            <p className="text-sm text-ngekos-grey">{room.sqft}</p>
                                        </div>
                                        <hr className="border-[#F1F2F6]" />
                                        <p className="font-semibold text-lg text-ngekos-orange">
                                            {formatRupiah(room.price)}
                                            <span className="text-sm text-ngekos-grey font-normal">
                                                /bulan
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                    <div id="BottomButton" className="relative flex w-full h-[98px] shrink-0">
                        <div className="fixed bottom-[30px] w-full max-w-[640px] px-5 z-10">
                            <button
                                type="submit"
                                className="w-full rounded-full p-[14px_20px] bg-[#FF801A] font-bold text-white text-center"
                            >
                                Continue Booking
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}