import React from "react";

interface PageProps {
  item: itemProps;
}
interface itemProps {
  key: number;
  image: any;
  name: string;
  text: string;
  model: string;
}
function Page({ item }: PageProps) {
  const pageImg = "scavenger/assets/old-paper-2.png";

  return (
    <div className="relative font-bold font-[revolution] text-xl justify-center text-left flex ">
      <div className="absolute p-8 flex flex-row gap-8">
        <img src={item.image} className="w-1/2 aspect-square rounded-2xl"></img>
        <div>
          <p className="font-[Kashare] text-4xl">{item.name}</p>
          <p className="font-[Revolution] text-lg">{item.text}</p>
        </div>
      </div>
      <img src={pageImg} alt="" />
    </div>
  );
}

export default Page;

//rfce
