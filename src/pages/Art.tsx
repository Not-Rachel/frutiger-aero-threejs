function Art() {
  const images = import.meta.glob("../assets/portfolio/*.{png,jpg,jpeg}", {
    eager: true,
  });

  return (
    <div className="p-2">
      <h1 className="mb-8">Art over the years</h1>
      <div className="grid grid-cols-3">
        {Object.values(images).map((img, i) => (
          <img className="object-cover h-96 w-96" key={i} src={img.default} />
        ))}
      </div>
    </div>
  );
}

export default Art;
