import FadeContent from "../components/FadeContent";
import TopNav from "../components/ScavNav";

function AboutUs() {
  return (
    <>
      <FadeContent
        blur={true}
        duration={300}
        easing="ease-out"
        initialOpacity={0}
      >
        <section className="flex h-[100vh] bg-[url('assets/deer2.jpg')] bg-cover [box-shadow:inset_0_0_1000px_rgba(0,0,0,0.7)]">
          <div className="w-full mt-8 mx-auto flex flex-col items-center text-center text-white [text-shadow:0_0_20px_black]">
            <p className="font-bold text-[24px] max-w-[550px] my-[15px] tracking-[4px] [text-shadow:0_0_5px_black]">
              Just two friends with a crazy idea...
            </p>
          </div>
        </section>
      </FadeContent>
    </>
  );
}

export default AboutUs;
