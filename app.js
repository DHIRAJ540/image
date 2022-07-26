var canvas = new fabric.Canvas("canvas");

document.getElementById("img").addEventListener("change", (e) => {
  console.log("hiii");
  var reader = new FileReader();
  reader.onload = function (event) {
    var imgObj = new Image();
    imgObj.src = event.target.result;

    imgObj.onload = function () {
      canvas.setHeight(this.height);
      canvas.setWidth(this.width);
      var image = new fabric.Image(imgObj);
      image.set({
        angle: 0,
        padding: 10,
        cornersize: 10,
      });
      canvas.centerObject(image);
      canvas.add(image);
      canvas.renderAll();
    };
  };
  reader.readAsDataURL(e.target.files[0]);
});

canvas.on("mouse:wheel", function (opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 1.01) zoom = 1;
  if (zoom == 1) {
    console.log(this.viewportTransform);
    this.viewportTransform = [1, 0, 0, 1, 0, 0];
  }
  console.log(opt);
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
});
