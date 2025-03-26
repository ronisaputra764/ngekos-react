import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Index({ boardingHouses, formatRupiah, categoriesWithCount, citiesWithCount, getCategoryNameById, getCityNameById }) {

    return (
        <>
            <div
                id="Content-Container"
                className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-white overflow-x-hidden"
            >
                <div
                    id="Background"
                    className="absolute top-0 w-full h-[280px] rounded-bl-[75px] bg-[linear-gradient(180deg,#F2F9E6_0%,#D2EDE4_100%)]"
                ></div>
                <div
                    id="TopNav"
                    className="relative flex items-center justify-between px-5 mt-[60px]"
                >
                    <div className="flex flex-col gap-1">
                        <p>Good day,</p>
                        <h1 className="font-bold text-xl leading-[30px]">Explore Cozy Home</h1>
                    </div>
                    <a
                        href="#"
                        className="w-12 h-12 flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white"
                    >
                        <img
                            src="assets/images/icons/notification.svg"
                            className="w-[28px] h-[28px]"
                            alt="icon"
                        />
                    </a>
                </div>
                <Swiper slidesPerView={'auto'} spaceBetween={20} slidesOffsetAfter={20} slidesOffsetBefore={20} id="Categories" className="swiper w-full overflow-x-hidden mt-[30px]">
                    <div className="swiper-wrapper">

                        {categoriesWithCount.map((category) => (
                            <SwiperSlide className="swiper-slide !w-fit pb-[30px]" key={category.id}>
                                <Link to={`/categories/${category.id}`} className="card">
                                    <div className="flex flex-col items-center w-[120px] shrink-0 rounded-[40px] p-4 pb-5 gap-3 bg-white shadow-[0px_12px_30px_0px_#0000000D] text-center">
                                        <div className="w-[70px] h-[70px] rounded-full flex shrink-0 overflow-hidden">
                                            <img
                                                src={`assets/images/cities/${category.image}`}
                                                className="w-full h-full object-cover"
                                                alt="thumbnail"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-[2px]">
                                            <h3 className="font-semibold">{category.name}</h3>
                                            <p className="text-sm text-ngekos-grey">{category.count} Kos</p>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}

                    </div>
                </Swiper>
                <section id="Popular" className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-5">
                        <h2 className="font-bold">Popular Kos</h2>
                        <a href="#">
                            <div className="flex items-center gap-2">
                                <span>See all</span>
                                <img
                                    src="assets/images/icons/arrow-right.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                            </div>
                        </a>
                    </div>
                    <Swiper slidesPerView={'auto'} spaceBetween={20} slidesOffsetAfter={20} slidesOffsetBefore={20} className="w-full overflow-x-hidden">
                        <div className="swiper-wrapper">

                            {boardingHouses.map((item) => (
                                <SwiperSlide className="swiper-slide !w-fit" key={item.id}>
                                    <Link to={`/details/${item.id}`} className="card">
                                        <div className="flex flex-col w-[250px] shrink-0 rounded-[30px] border border-[#F1F2F6] p-4 pb-5 gap-[10px] hover:border-[#91BF77] transition-all duration-300">
                                            <div className="flex w-full h-[150px] shrink-0 rounded-[30px] bg-[#D9D9D9] overflow-hidden">
                                                <img
                                                    src={`assets/images/boarding_house/${item.thumbnail}`}
                                                    className="w-full h-full object-cover"
                                                    alt="thumbnail"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <h3 className="font-semibold text-lg leading-[27px] line-clamp-2 min-h-[54px]">
                                                    {item.name}
                                                </h3>
                                                <hr className="border-[#F1F2F6]" />
                                                <div className="flex items-center gap-[6px]">
                                                    <img
                                                        src="assets/images/icons/location.svg"
                                                        className="w-5 h-5 flex shrink-0"
                                                        alt="icon"
                                                    />
                                                    <p className="text-sm text-ngekos-grey">{getCityNameById(item.city_id)} City</p>
                                                </div>
                                                <div className="flex items-center gap-[6px]">
                                                    <img
                                                        src="assets/images/icons/3dcube.svg"
                                                        className="w-5 h-5 flex shrink-0"
                                                        alt="icon"
                                                    />
                                                    <p className="text-sm text-ngekos-grey">In {getCategoryNameById(item.category_id)}</p>
                                                </div>
                                                <div className="flex items-center gap-[6px]">
                                                    <img
                                                        src="assets/images/icons/profile-2user.svg"
                                                        className="w-5 h-5 flex shrink-0"
                                                        alt="icon"
                                                    />
                                                    <p className="text-sm text-ngekos-grey">4 People</p>
                                                </div>
                                                <hr className="border-[#F1F2F6]" />
                                                <p className="font-semibold text-lg text-ngekos-orange">
                                                    {formatRupiah(item.price)}
                                                    <span className="text-sm text-ngekos-grey font-normal">
                                                        /bulan
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}

                        </div>
                    </Swiper>
                </section>
                <section
                    id="Cities"
                    className="flex flex-col p-5 gap-4 bg-[#F5F6F8] mt-[30px]"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold">Browse Cities</h2>
                        <a href="#">
                            <div className="flex items-center gap-2">
                                <span>See all</span>
                                <img
                                    src="assets/images/icons/arrow-right.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                            </div>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4">

                        {citiesWithCount.map((city) => (
                            <Link to={`/cities/${city.id}`} className="card" key={city.id}>
                                <div className="flex items-center rounded-[22px] p-[10px] gap-3 bg-white border border-white overflow-hidden hover:border-[#91BF77] transition-all duration-300">
                                    <div className="w-[55px] h-[55px] flex shrink-0 rounded-full border-4 border-white ring-1 ring-[#F1F2F6] overflow-hidden">
                                        <img
                                            src={`assets/images/cities/${city.image}`}
                                            className="w-full h-full object-cover"
                                            alt="icon"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <h3 className="font-semibold">{city.name}</h3>
                                        <p className="text-sm text-ngekos-grey">{city.count} Kos</p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </section>
                <section id="Best" className="flex flex-col gap-4 px-5 mt-[30px]">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold">All Great Koskos</h2>
                        <a href="#">
                            <div className="flex items-center gap-2">
                                <span>See all</span>
                                <img
                                    src="assets/images/icons/arrow-right.svg"
                                    className="w-6 h-6 flex shrink-0"
                                    alt="icon"
                                />
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col gap-4">

                        {boardingHouses.map((item) => (
                            <Link to={`/details/${item.id}`} className="card" key={item.id}>
                                <div className="flex rounded-[30px] border border-[#F1F2F6] p-4 gap-4 bg-white hover:border-[#91BF77] transition-all duration-300">
                                    <div className="flex w-[120px] h-[183px] shrink-0 rounded-[30px] bg-[#D9D9D9] overflow-hidden">
                                        <img
                                            src={`assets/images/boarding_house/${item.thumbnail}`}
                                            className="w-full h-full object-cover"
                                            alt="icon"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 w-full">
                                        <h3 className="font-semibold text-lg leading-[27px] line-clamp-2 min-h-[54px]">
                                            {item.name}
                                        </h3>
                                        <hr className="border-[#F1F2F6]" />
                                        <div className="flex items-center gap-[6px]">
                                            <img
                                                src="assets/images/icons/location.svg"
                                                className="w-5 h-5 flex shrink-0"
                                                alt="icon"
                                            />
                                            <p className="text-sm text-ngekos-grey">{getCityNameById(item.city_id)} City</p>
                                        </div>
                                        <div className="flex items-center gap-[6px]">
                                            <img
                                                src="assets/images/icons/profile-2user.svg"
                                                className="w-5 h-5 flex shrink-0"
                                                alt="icon"
                                            />
                                            <p className="text-sm text-ngekos-grey">4 People</p>
                                        </div>
                                        <hr className="border-[#F1F2F6]" />
                                        <p className="font-semibold text-lg text-ngekos-orange">
                                            {formatRupiah(item.price)}
                                            <span className="text-sm text-ngekos-grey font-normal">
                                                /bulan
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </section>
                <div id="BottomNav" className="relative flex w-full h-[138px] shrink-0">
                    <nav className="fixed bottom-5 w-full max-w-[640px] px-5 z-10">
                        <div className="grid grid-cols-4 h-fit rounded-[40px] justify-between py-4 px-5 bg-[#070707]">
                            <Link
                                to={"/"}
                                className="flex flex-col items-center text-center gap-2"
                            >
                                <img
                                    src="assets/images/icons/global-green.svg"
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
                                    src="assets/images/icons/note-favorite.svg"
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