import { Link, useParams } from "react-router";

export default function Categories({ boardingHouse, categories, formatRupiah }) {

    const { id } = useParams();

    const categoryName = categories.find((category) => category.id === id);
    const filteredBoardingHouse = boardingHouse.filter((house) => house.category_id === id);

    return (
        <>
            <div
                id="Content-Container"
                className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-white overflow-x-hidden"
            >
                <div
                    id="Background"
                    className="absolute top-0 w-full h-[570px] rounded-b-[75px] bg-[linear-gradient(180deg,#F2F9E6_0%,#D2EDE4_100%)]"
                ></div>
                <div
                    id="TopNav"
                    className="relative flex items-center justify-between px-5 mt-[60px]"
                >
                    <Link
                        to={"/"}
                        className="w-12 h-12 flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white"
                    >
                        <img
                            src="/assets/images/icons/arrow-left.svg"
                            className="w-[28px] h-[28px]"
                            alt="icon"
                        />
                    </Link>
                    <p className="font-semibold">Browse Koskos</p>
                    <div className="dummy-btn w-12" />
                </div>
                <div
                    id="Header"
                    className="relative flex items-center justify-between gap-2 px-5 mt-[18px]"
                >
                    <div className="flex flex-col gap-[6px]">
                        <h1 className="font-bold text-[32px] leading-[48px]">Browse in {categoryName.name}</h1>
                        <p className="text-ngekos-grey">Tersedia {filteredBoardingHouse.length} Kos</p>
                    </div>
                    <button className="flex flex-col items-center text-center shrink-0 rounded-[22px] p-[10px_20px] gap-2 bg-white">
                        <img src="/assets/images/icons/star.svg" className="w-6 h-6" alt="icon" />
                        <p className="font-bold text-sm">4/5</p>
                    </button>
                </div>
                <section id="Result" className=" relative flex flex-col gap-4 px-5 mt-5 mb-9">

                    {filteredBoardingHouse.map((house) => (
                        <Link to={`/details/${house.id}`} className="card" key={house.id}>
                            <div className="flex rounded-[30px] border border-[#F1F2F6] p-4 gap-4 bg-white hover:border-[#91BF77] transition-all duration-300">
                                <div className="flex w-[120px] h-[183px] shrink-0 rounded-[30px] bg-[#D9D9D9] overflow-hidden">
                                    <img
                                        src={`/assets/images/boarding_house/${house.thumbnail}`}
                                        className="w-full h-full object-cover"
                                        alt="icon"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 w-full">
                                    <h3 className="font-semibold text-lg leading-[27px] line-clamp-2 min-h-[54px]">
                                        {house.name}
                                    </h3>
                                    <hr className="border-[#F1F2F6]" />
                                    <div className="flex items-center gap-[6px]">
                                        <img
                                            src="/assets/images/icons/location.svg"
                                            className="w-5 h-5 flex shrink-0"
                                            alt="icon"
                                        />
                                        <p className="text-sm text-ngekos-grey">{house.name}</p>
                                    </div>
                                    <div className="flex items-center gap-[6px]">
                                        <img
                                            src="/assets/images/icons/profile-2user.svg"
                                            className="w-5 h-5 flex shrink-0"
                                            alt="icon"
                                        />
                                        <p className="text-sm text-ngekos-grey">4 People</p>
                                    </div>
                                    <hr className="border-[#F1F2F6]" />
                                    <p className="font-semibold text-lg text-ngekos-orange">
                                        {formatRupiah(house.price)}
                                        <span className="text-sm text-ngekos-grey font-normal">/bulan</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}

                </section>
            </div>

        </>
    );
}