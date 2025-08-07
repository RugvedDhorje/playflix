import { useRouter } from "next/navigation";
import React from "react";
import Accordion from "./Accordian";

const SignupTop10 = () => {

  const videos = ["https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334540/AAAABace3lfDYdvDP5GhS8n6Djz3jW0sjZtFLOYIGR9fQQS48CE1DC8PQ8-DlTy5qKPDPjeQcfX7AVJzFKz2zW2lsbUq5yiYN0g1NmTRk6F4dajOtAdVKLn_bBW6tGbQr22e74Mx_r9lgop.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334540/AAAABaW57jWqw0Gs9gqgmW816THwyNfPqphIiruQRFy9KXtt9PTPJpB4kzDKriPcpNjPKCj0itu1Yfjl-CR8rGEokBHPKE4O9lZQHXHRRpUHEelwoKk8lOf4gqlws-HnR2iZeSk4_tkwfmc.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334540/AAAABasNXwfCUyzbdbm6exUG_y39-Lz5AH7A-2DEJs1ktmNxAiO-wdEN4yMeVa4H9lyNuBL3YonpfLUpVNcUZ-mtQ2evIf67KskRLS5N18PNx5wQ42ddMZDbL7k9qj42ne3qlXRP_sdba4s.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334540/AAAABcH5_XDKPeXszDIKUeRk9f8gbZf2IIH_vdf4CNwOb7kql21x-tuHFIQn1NVGFCzD79WrtEa2YEWqbSqJAs8AAOymvo6mcwfQlFM_fl6m6g.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334541/AAAABU73BvQjJgydQFEJ-vZZw9QtO8fL6lIxc71x9tOqxgDWh_BHokCWPIbGC5AxJjDk0D_sIH5KhmmYm9HLr3DKUXg8eo6nzF0rtSI_vcxtxf.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334541/AAAABVVzJ7Q5ewWWr7Ju9Vpu5gUq1Guy_hTrvChxJceb-sKqWPiIs1YGHsy_iC2mNT5bKs2BepshCHriwd7IQhYM2HPuqd7MBfqMXFL8nXJshtQEi6-KAKZAcSvG7xE3daK4ABuC_yce4dt.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334541/AAAABfJZxrUMQVK-tj5TP3oOiIW0LlJc7_OC4hXnqnb_vQQw4eyonCwo1l4QO_zAMSSaorVZuyRWqLsLzaIVxbLLBQ4iT4udE0Xavfg_owpyoh.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334543/AAAABYGL4_ns5MGTE5-Yd3ZQVB5apyY9yxQ39lxjT_27ehdoGzrxRwNc4osgXEeifcv9yO_MgMySL-p6hMxtQZnIEkZmyglIJ7wm7ik_kcstf0.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334543/AAAABWtQdcUd4n6VKz6HTm_IbI2cOq0VDU7fDQpomIXBLuCYqtJ4j8hj2pz7j6spnX2osjRgTMJQ9xkMieYZWqC6xC8G4tGlTLJBm3I_yubmup.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334544/AAAABYUCgDPIk4LvnEw_j-dC5ca65oxm4yP2Z7RFKlRcN6WYzCwNA4MhTNqTRrSAK9zND3cSjrYEpbQculmTCXPD09ZbvdCosdbuOjc_loxbgt.webp"
  ]


  const overlayImages = [
    'https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-1_i23eal.webp',
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-2_drblww.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-3_jragux.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-4_lbfpzj.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-5_s5nrcq.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/overlay-6_qmchac.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076546/overlay-7_zcgmlo.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076546/overlay-8_aqlauc.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076546/overlay-9_jlikym.webp",
    "https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076546/overlay-10_w5gyqv.webp"
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-5 py-10">
      <div>
        <h4 className="text-white text-[24px] md:text-[26px] font-semibold">{"Trending Now"}</h4>
      </div>
      <div className="flex gap-x-2 overflow-x-auto py-2 overflow-y-scroll no-scrollbar">
        {videos?.slice(0, 10).map((v, index) => (
          <div
            key={v}
            className="relative w-[180px] h-[240px] bg-white rounded-md shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
          >
            <div className="w-full h-[240px] overflow-hidden rounded-md relative">
              {/* Main video thumbnail */}
              <img
                className="w-full h-full object-cover object-center hover:scale-105 duration-300"
                src={v}
                alt="top 10 videos"
              />

              {/* Dynamic Overlay image */}
              <img
                src={overlayImages[index % overlayImages.length]} // cycles if more videos than overlays
                alt="overlay"
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pt-10 pb-3">
        <h4 className="text-white text-[20px] md:text-[26px] font-semibold">{"Frequently asked questions"}</h4>
      </div>
      <Accordion title="what is Playflix ?" children="Playflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.
You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!"/>
<Accordion title="How much does Playflix cost?" children="Watch Playflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts."/>
<Accordion title="Where can I watch?" children="Watch anywhere, anytime. Sign in with your Playflix account to watch instantly on the web at Playflix.com from your personal computer or on any internet-connected device that offers the Playflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
You can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Playflix with you anywhere."/>
<Accordion title="How do I cancel?" children="Playflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."/>
<Accordion title="What can I watch on Playflix?" children="Playflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Playflix originals, and more. Watch as much as you want, anytime you want."/>
<Accordion title="Is Playflix good for kids?" children="
The Playflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.
Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see."/>
    </div>
  );
};

export default SignupTop10;
