function Projects() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-1 bg-blue-50/30 border-white">
        <a href="/offline/">Offline</a>
      </div>
      <div className="border-1 bg-blue-50/30 border-white">
        <a href="/scavenger/">Scavenger</a>
      </div>
      <div className="border-1 bg-blue-50/30 border-white">
        <a href="/dither/">Blue Noise Dithering Shader</a>
      </div>
    </div>
  );
}

export default Projects;
