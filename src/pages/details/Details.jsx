import { Link, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

export default function Details({ boardingHouses, formatRupiah, getCategoryNameById, getCityNameById }) {

    const navigate = useNavigate();

    const { id } = useParams();

    const house = boardingHouses.find((house) => house.id === id);


    const tabLinks = document.querySelectorAll('.tab-link');

    // Add click event listener to each button
    tabLinks.forEach(button => {
        button.addEventListener('click', () => {
            // Get the target tab id from the data attribute
            const targetTab = button.getAttribute('data-target-tab');

            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('flex');
                content.classList.add('hidden');
            });

            // Remove active state from all buttons
            tabLinks.forEach(btn => {
                btn.classList.remove('!bg-ngekos-black', '!text-white');
            });

            // Show the target tab content
            document.querySelector(targetTab).classList.remove('hidden');
            document.querySelector(targetTab).classList.add('flex');

            // Add active state to the clicked button
            button.classList.add('!bg-ngekos-black', '!text-white');
        });
    });

    return (
        <>
            <div
                id="Content-Container"
                className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-white overflow-x-hidden"
            >
                <div
                    id="ForegroundFade"
                    className="absolute top-0 w-full h-[143px] bg-[linear-gradient(180deg,#070707_0%,rgba(7,7,7,0)_100%)] z-10"
                ></div>
                <div
                    id="TopNavAbsolute"
                    className="absolute top-[60px] flex items-center justify-between w-full px-5 z-10"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="w-12 h-12 flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm"
                    >
                        <img
                            src="/assets/images/icons/arrow-left-transparent.svg"
                            className="w-8 h-8"
                            alt="icon"
                        />
                    </button>
                    <p className="font-semibold text-white">Details</p>
                    <button className="w-12 h-12 flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
                        <img
                            src="/assets/images/icons/like.svg"
                            className="w-[26px] h-[26px]"
                            alt=""
                        />
                    </button>
                </div>
                <div
                    id="Gallery"
                    className="swiper-gallery w-full overflow-x-hidden -mb-[38px]"
                >
                    <Swiper className="swiper-wrapper">

                        {house.photo.map((item, index) => (
                            <SwiperSlide className="swiper-slide !w-fit" key={index}>
                                <div className="flex shrink-0 w-[320px] h-[430px] overflow-hidden">
                                    <img
                                        src={`/assets/images/rooms/${item}`}
                                        className="w-full h-full object-cover"
                                        alt="gallery thumbnails"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
                <main
                    id="Details"
                    className="relative flex flex-col rounded-t-[40px] py-5 pb-[10px] gap-4 bg-white z-10"
                >
                    <div id="Title" className="flex items-center justify-between gap-2 px-5">
                        <h1 className="font-bold text-[22px] leading-[33px]">
                            {house.name}
                        </h1>
                        <div className="flex flex-col items-center text-center shrink-0 rounded-[22px] border border-[#F1F2F6] p-[10px_20px] gap-2 bg-white">
                            <img
                                src="/assets/images/icons/star.svg"
                                className="w-6 h-6"
                                alt="icon"
                            />
                            <p className="font-bold text-sm">4/5</p>
                        </div>
                    </div>
                    <hr className="border-[#F1F2F6] mx-5" />
                    <div id="Features" className="grid grid-cols-2 gap-x-[10px] gap-y-4 px-5">
                        <div className="flex items-center gap-[6px]">
                            <img
                                src="/assets/images/icons/location.svg"
                                className="w-[26px] h-[26px] flex shrink-0"
                                alt="icon"
                            />
                            <p className="text-ngekos-grey">{getCityNameById(house.city_id)} City</p>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <img
                                src="/assets/images/icons/3dcube.svg"
                                className="w-[26px] h-[26px] flex shrink-0"
                                alt="icon"
                            />
                            <p className="text-ngekos-grey">{getCategoryNameById(house.category_id)}</p>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <img
                                src="/assets/images/icons/profile-2user.svg"
                                className="w-[26px] h-[26px] flex shrink-0"
                                alt="icon"
                            />
                            <p className="text-ngekos-grey">4 People</p>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <img
                                src="/assets/images/icons/shield-tick.svg"
                                className="w-[26px] h-[26px] flex shrink-0"
                                alt="icon"
                            />
                            <p className="text-ngekos-grey">Privacy 100%</p>
                        </div>
                    </div>
                    <hr className="border-[#F1F2F6] mx-5" />
                    <div id="About" className="flex flex-col gap-[6px] px-5">
                        <h2 className="font-bold">About</h2>
                        <p className="leading-[30px]">
                            With fast WiFi and comfortable kitchen, with an apartment is ready to be
                            a place good Working From Home, a quick escape reality
                        </p>
                    </div>
                    <div id="Tabs" className="swiper-tab w-full overflow-x-hidden">
                        <Swiper slidesPerView={"auto"} spaceBetween={10} slidesOffsetAfter={20} slidesOffsetBefore={20}>
                            <SwiperSlide className="swiper-slide !w-fit">
                                <button
                                    className="tab-link rounded-full p-[8px_14px] border border-[#F1F2F6] text-sm font-semibold hover:bg-[#070707] hover:text-white transition-all duration-300 !bg-[#070707] !text-white"
                                    data-target-tab="#Bonus-Tab"
                                >
                                    Bonus Kos
                                </button>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide !w-fit">
                                <button
                                    className="tab-link rounded-full p-[8px_14px] border border-[#F1F2F6] text-sm font-semibold hover:bg-[#070707] hover:text-white transition-all duration-300"
                                    data-target-tab="#Testimonials-Tab"
                                >
                                    Testimonials
                                </button>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide !w-fit">
                                <button
                                    className="tab-link rounded-full p-[8px_14px] border border-[#F1F2F6] text-sm font-semibold hover:bg-[#070707] hover:text-white transition-all duration-300"
                                    data-target-tab="#Rules-Tab"
                                >
                                    Rules
                                </button>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide !w-fit">
                                <button
                                    className="tab-link rounded-full p-[8px_14px] border border-[#F1F2F6] text-sm font-semibold hover:bg-[#070707] hover:text-white transition-all duration-300"
                                    data-target-tab="#Contact-Tab"
                                >
                                    Contact
                                </button>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide !w-fit">
                                <button
                                    className="tab-link rounded-full p-[8px_14px] border border-[#F1F2F6] text-sm font-semibold hover:bg-[#070707] hover:text-white transition-all duration-300"
                                    data-target-tab="#Rewards-Tab"
                                >
                                    Rewards
                                </button>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div id="TabsContent" className="px-5">
                        <div id="Bonus-Tab" className="tab-content flex flex-col gap-5">
                            <div className="flex flex-col gap-4">
                                <div className="bonus-card flex items-center rounded-[22px] border border-[#F1F2F6] p-[10px] gap-3 hover:border-[#91BF77] transition-all duration-300">
                                    <div className="flex w-[120px] h-[90px] shrink-0 rounded-[18px] bg-[#D9D9D9] overflow-hidden">
                                        <img
                                            src="/assets/images/thumbnails/bonus-1.png"
                                            className="w-full h-full object-cover"
                                            alt="thumbnails"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Clean Laundry</p>
                                        <p className="text-sm text-ngekos-grey">Super Fast • 4 People</p>
                                    </div>
                                </div>
                                <div className="bonus-card flex items-center rounded-[22px] border border-[#F1F2F6] p-[10px] gap-3 hover:border-[#91BF77] transition-all duration-300">
                                    <div className="flex w-[120px] h-[90px] shrink-0 rounded-[18px] bg-[#D9D9D9] overflow-hidden">
                                        <img
                                            src="/assets/images/thumbnails/bonus-2.png"
                                            className="w-full h-full object-cover"
                                            alt="thumbnails"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Healthy Catering</p>
                                        <p className="text-sm text-ngekos-grey">Animal Base • 4 People</p>
                                    </div>
                                </div>
                                <div className="bonus-card flex items-center rounded-[22px] border border-[#F1F2F6] p-[10px] gap-3 hover:border-[#91BF77] transition-all duration-300">
                                    <div className="flex w-[120px] h-[90px] shrink-0 rounded-[18px] bg-[#D9D9D9] overflow-hidden">
                                        <img
                                            src="/assets/images/thumbnails/bonus-3.png"
                                            className="w-full h-full object-cover"
                                            alt="thumbnails"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Coworking Space</p>
                                        <p className="text-sm text-ngekos-grey">Comfortable • 4 People</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="Testimonials-Tab" className="tab-content flex-col gap-5 hidden">
                            <div className="flex flex-col gap-4">
                                <div className="testi-card flex flex-col rounded-[22px] border border-[#F1F2F6] p-4 gap-3 bg-white hover:border-[#91BF77] transition-all duration-300">
                                    <div className="flex items-center gap-3">
                                        <div className="w-[70px] h-[70px] flex shrink-0 rounded-full border-4 border-white ring-1 ring-[#F1F2F6] overflow-hidden">
                                            <img
                                                src="/assets/images/photos/sami.png"
                                                className="w-full h-full object-cover"
                                                alt="icon"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Samina Ryin</p>
                                            <p className="mt-[2px] text-sm text-ngekos-grey">
                                                9 September 2024
                                            </p>
                                        </div>
                                    </div>
                                    <p className="leading-[26px]">
                                        Enak banget ngekos di sini sampe lupa rumah emak saking nyamannya
                                        lol...
                                    </p>
                                    <div className="flex">
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="testi-card flex flex-col rounded-[22px] border border-[#F1F2F6] p-4 gap-3 bg-white hover:border-[#91BF77] transition-all duration-300">
                                    <div className="flex items-center gap-3">
                                        <div className="w-[70px] h-[70px] flex shrink-0 rounded-full border-4 border-white ring-1 ring-[#F1F2F6] overflow-hidden">
                                            <img
                                                src="/assets/images/photos/sami.png"
                                                className="w-full h-full object-cover"
                                                alt="icon"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Samina Ryin</p>
                                            <p className="mt-[2px] text-sm text-ngekos-grey">
                                                9 September 2024
                                            </p>
                                        </div>
                                    </div>
                                    <p className="leading-[26px]">
                                        Enak banget ngekos di sini sampe lupa rumah emak saking nyamannya
                                        lol...
                                    </p>
                                    <div className="flex">
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="testi-card flex flex-col rounded-[22px] border border-[#F1F2F6] p-4 gap-3 bg-white hover:border-[#91BF77] transition-all duration-300">
                                    <div className="flex items-center gap-3">
                                        <div className="w-[70px] h-[70px] flex shrink-0 rounded-full border-4 border-white ring-1 ring-[#F1F2F6] overflow-hidden">
                                            <img
                                                src="/assets/images/photos/sami.png"
                                                className="w-full h-full object-cover"
                                                alt="icon"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Samina Ryin</p>
                                            <p className="mt-[2px] text-sm text-ngekos-grey">
                                                9 September 2024
                                            </p>
                                        </div>
                                    </div>
                                    <p className="leading-[26px]">
                                        Enak banget ngekos di sini sampe lupa rumah emak saking nyamannya
                                        lol...
                                    </p>
                                    <div className="flex">
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                        <img
                                            src="/assets/images/icons/Star 1.svg"
                                            className="w-[22px] h-[22px] flex shrink-0"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="Rules-Tab" className="tab-content flex-col gap-5 hidden">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, vitae.
                        </div>
                        <div id="Contact-Tab" className="tab-content flex-col gap-5 hidden">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, vitae.
                        </div>
                        <div id="Rewards-Tab" className="tab-content flex-col gap-5 hidden">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, vitae.
                        </div>
                    </div>
                </main>
                <div id="BottomNav" className="relative flex w-full h-[138px] shrink-0">
                    <div className="fixed bottom-5 w-full max-w-[640px] px-5 z-10">
                        <div className="flex items-center justify-between rounded-[40px] py-4 px-6 bg-[#070707]">
                            <p className="font-bold text-xl leading-[30px] text-white">
                                {formatRupiah(house.price)}
                                <br />
                                <span className="text-sm font-normal">/bulan</span>
                            </p>
                            <Link
                                to={`/room-available/${id}`}
                                className="flex shrink-0 rounded-full py-[14px] px-5 bg-[#FF801A] font-bold text-white"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}