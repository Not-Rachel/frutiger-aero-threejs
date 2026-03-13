// const select = document.querySelector("#mode-select");
// const canvas = document.querySelector(".webgl");
// const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

// let currentScene = null;
// let currentCleanup = null;

select.addEventListener("change", async (e) => {
  const mode = e.target.value;
  const module = await import(`./scripts/${mode}.js`);
  module.init();
});
