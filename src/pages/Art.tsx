function Art() {
  const images = import.meta.glob("../assets/portfolio/*.{png,jpg,jpeg}", {
    eager: true,
  });

  return (
    <div className="m-4 ">
      <h1 className="my-8 font-bold text-space tracking-widest  text-shadow-lg/30">
        ART OVER THE YEARS
      </h1>
      <div className="grid grid-cols-3 rounded-lg overflow-hidden shadow-xl shadow-white ring-2">
        {Object.values(images).map((img, i) => (
          <img className="object-cover h-96 w-96" key={i} src={img.default} />
        ))}
      </div>
      <p className="my-16">-----</p>
    </div>
  );
}

export default Art;
