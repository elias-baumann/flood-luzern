let img;

let cellsize = 11;
let xsteps;
let ysteps;

let waterlevel = 434;

let slider;

let fontRegular;

//font Changa
let changaReg;
let changaLgt;
let changaExlgt;
let changaMed;
let changaSem;
let changaExbld;
let changaBld;

let shareReg;
let shareBld;
let shareBldItc;
let shareItc;

let strassen;

function preload() {
  img = loadImage("luzern-neu.png");
  strassen = loadImage("strassen.png");

  fontRegular = loadFont("font/VCR_OSD_MONO_1.001.ttf");

  changaReg = loadFont("font/Changa-Regular.ttf");
  changaLgt = loadFont("font/Changa-Light.ttf");
  changaExlgt = loadFont("font/Changa-ExtraLight.ttf");
  changaMed = loadFont("font/Changa-Medium.ttf");
  changaSem = loadFont("font/Changa-SemiBold.ttf");
  changaExbld = loadFont("font/Changa-ExtraBold.ttf");
  changeBld = loadFont("font/Changa-Bold.ttf");

  shareReg = loadFont("font/Share-Regular.ttf");
  shareBld = loadFont("font/Share-Bold.ttf");
  shareBldItc = loadFont("font/Share-BoldItalic.ttf");
  shareItc = loadFont("font/Share-Italic.ttf");

  // img = loadImage("test1.png");
}

function setup() {
  // createCanvas(1100, 1100 / ratio);
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(410, 470, waterlevel, 1);
  slider.position(70, 0.7 * windowHeight);
  slider.input(updateWaterLevel);

  xsteps = width / cellsize;
  ysteps = height / cellsize;

  noLoop();
}

function draw() {
  //profil 0
  // background("#F6F2F1");
  //profil 1
  // background("#E0C88E");
  //profil 2
  background(225, 223, 240);
  image(strassen, 0, 0, windowWidth, windowHeight);
  //strassen.resize(windowWidth, windowHeight);

  //img(strassenHintergrund,width,height)
  for (let i = 0; i < xsteps; i++) {
    for (let j = 0; j < ysteps; j++) {
      let x = i * cellsize;
      let y = j * cellsize;

      let lookupX = map(x, 0, width, 0, img.width);
      let lookupY = map(y, 0, height, 0, img.height);

      let col = img.get(lookupX, lookupY);
      let r = red(col);

      let m = map(r, 0, 255, 416, 795);

      if (m <= waterlevel) {
        fill("#42519A");
        noStroke();
        ellipse(x, y, 0.88 * cellsize, 0.88 * cellsize);
        // rect(x, y, 0.9 * cellsize, 0.9 * cellsize);
      }
      if (m >= waterlevel && m < waterlevel + 2) {
        fill(113, 161, 215, 70);
        noStroke();
        ellipse(x, y, 0.9 * cellsize, 0.9 * cellsize);
        // rect(x, y, 0.9 * cellsize, 0.9 * cellsize);
      }
      // if (m >= waterlevel + 100 && m < waterlevel + 200) {
      //   fill("darkseagreen");
      //   noStroke();
      //   ellipse(x, y, 0.9 * cellsize, 0.9 * cellsize);
      // }
    }
  }

  //profil 1
  let top = 130;
  fill("#694845");
  textSize(30);
  textFont(shareBld);
  //load data von wasserstand Vierwaldstättersee
  text("Wasserstand heute:", 0.7 * width, top + 30);
  textSize(25);

  textFont(shareReg);

  text("Vierwaldstättersee: 434 m", 0.7 * width, top + 80);
  text("Rotsee: 421 m", 0.7 * width, top + 110);
  textSize(25);

  text(
    "Wasserstand visualisiert: " + waterlevel + "m",
    70,
    0.75 * windowHeight
  );
}

function updateWaterLevel() {
  waterlevel = slider.value();
  console.log("updateWaterLevel", waterlevel);
  redraw();
}
