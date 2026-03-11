function CV() {
  return (
    <div className="flex items-center gap-2 flex-col w-full ">
      <div className="flex items-center flex-col rounded-xl bg-cyan-300/30 w-full px-4">
        <h1 className="font-bold text-2xl">Rachel Brinkman</h1>
        <div className="flex text-lg justify-between w-full">
          <p>(949) 680-7817</p>
          <p>rachelmbrinkman@gmail.com</p>
        </div>
        <div className="flex text-lg justify-between w-full">
          <p>Rancho Santa Margarita, CA</p>
          <p>https://github.com/Not-Rachel</p>
        </div>
      </div>
      <div className="flex flex-col w-full rounded-xl bg-amber-200/30 px-4">
        <h1>FULLSTACK DEVELOPER</h1>
        <p className="text-lg">
          Computer Science Graduate focused on building visually interactive web
          apps utilizing graphics, animation, and full-stack architecture.
        </p>

        <h2>PROJECTS</h2>
      </div>
    </div>
  );
}

export default CV;
