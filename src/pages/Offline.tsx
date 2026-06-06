import { FaPowerOff } from "react-icons/fa6";
function Offline() {
  const img2 = "/assets/offline_imgs/image2.gif";
  const img3 = "/assets/offline_imgs/image3.gif";
  const img4 = "/assets/offline_imgs/image4.gif";
  const img5 = "/assets/offline_imgs/image5.gif";
  const img6 = "/assets/offline_imgs/image6.gif";
  const img7 = "/assets/offline_imgs/image7.gif";
  const img8 = "/assets/offline_imgs/image8.gif";
  return (
    <div className="flex flex-col gap-8 p-8 pt-16 overflow-x-hidden overflow-y-scroll w-full bg-black/20">
      <p className="text-red-400">!!Page is not quite finished!!</p>
      <div className="text-5xl font-bold tracking-widest flex items-center">
        <FaPowerOff />
        ffline
      </div>

      <p>An anti-social media for the chronically offline </p>
      <div className="h-128 flex gap-4 ">
        <p className="text-2xl">
          Need a break from the scroll? Check out our app made specically to get
          you off your phone!{" "}
        </p>
        <div className="flex flex-row  gap-8   justify-end ">
          <img src={img2} alt="" />
          <img src={img3} alt="" />
          <img src={img4} alt="" />
        </div>
      </div>
      <div className="flex gap-4 h-128">
        <div className="flex flex-row gap-16 ">
          <img src={img5} alt="" />
          <img src={img8} alt="" />
          <img src={img6} alt="" />
        </div>
        <p className="text-2xl">
          Amazing mapping interface to help connect with your local community!
        </p>
      </div>
      <div className="h-128 flex gap-4">
        <img src={img7} className="" alt="" />
      </div>
    </div>
  );
}

export default Offline;
