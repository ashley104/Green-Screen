var fgImage = null;
var bgImage = null;
var fgCan;
var bgCan;

function loadForegroundImage() {
  var file = document.getElementById("fgfile");
  fgImage = new SimpleImage(file);
  
  fgCan = document.getElementById("fgcan");
  fgImage.drawTo(fgCan);
}

function loadBackgroundImage() {
  var file = document.getElementById("bgfile");
  bgImage = new SimpleImage(file);
  
  bgCan = document.getElementById("bgcan");
  bgImage.drawTo(bgCan);
}

function doGreenScreen() {
  if (fgImage == null || !fgImage.complete()) {
    alert("Foreground image not loaded");
  }
  
  if (bgImage == null || !bgImage.complete()) {
    alert("Background image not loaded");
  }
  
  clearCanvas();
  
  var output = greenScreenAlg();
  output.drawTo(fgCan);
}

function greenScreenAlg() {
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  var greenThreshold = 240;
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > greenThreshold) {
      var bgPix = bgImage.getPixel(x, y);
      output.setPixel(x, y, bgPix);
    }
    else {
      output.setPixel(x, y, pixel);
    }
  }
  return output;
}

function clearCanvas() {
  doClear(fgCan);
  doClear(bgCan);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width, canvas.height);
}
