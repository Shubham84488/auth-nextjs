"use client"
import Image from "next/image"
import { SERVICES } from "@/constants"
import { useState } from "react"

type serviceItems={
    image: string,
    title: string,
    price: number,
    starNo: number,
    reviews: number,
    subDescription: string
}
const ServiceCol = ({image,title,price,starNo,reviews,subDescription}: serviceItems) => {
  return (
        <div className=" border shadow-lg shadow-gray-400 rounded-xl w-4/5">
            <div className="flex flex-row gap-[10px]">
                <div className="w-full">
                    <Image src={image} alt="hi" width={350} height={150} className="rounded-xl h-[250px] w-[300px]"/>
                </div>
                
                <div className="flex flex-col items-center space-y-2 mt-4 w-full">
                    <h3 className="text-xl text-center">{title}</h3>
                    <br />
                    <div>
                        <p className="font-bold text-2xl">Price : ₹{price}</p>
                        <p className="from-neutral-500 text-center">Fully Refundable</p>
                    </div>
                    <div className="p-2 text-2xl text-center bg-yellow-400 w-[250px] rounded-5xl cursor-pointer">View Deal</div>
                </div>
                <div className="flex flex-col items-center m-6 mt-12 space-y-2 max-w-[300px] w-full"> 
                    <div className="flex flex-row">
                        {Array(starNo).fill(1).map((_,index)=>(
                        <Image src="/star.svg" key={index} alt="star" width={24} height={24}/>
                        ))}
                        <p>{reviews} reviews</p>
                    </div>
                    <br />
                    <div className="text-center">
                        <div>
                            <h3>Camping/Caravan site</h3>
                            <p>{subDescription}</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
const servicePage=()=>{
    const [visibleCount, setVisibleCount] = useState(4); 

    const loadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 4, SERVICES.length));
    };
    return(
        <div className="max-container padding-container flex flex-col gap-2 items-center mb-[50px]">
            <br />
            <h1 className="text-4xl self-center font-bold">Camps and Hotels in India</h1>
            <br />
            {SERVICES.slice(0, visibleCount).map((service,index)=>(
                <ServiceCol key={index} image={service.image} title={service.title} price={service.price} starNo={service.starNo} reviews={service.reviews} subDescription={service.subDescription}/>
            ))}

            {visibleCount < SERVICES.length && (
                    <button
                    onClick={loadMore}
                    className="border-[3px] font-semibold p-3 rounded-lg mt-6 "
                    >
                    Load More
                    </button>
                )}
        </div>
    )
}
export default servicePage
