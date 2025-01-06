const containers = document.querySelectorAll('#konva-container');

containers.forEach(container => {
  const imagePath = container.getAttribute('data-image-path'); // Get image path

  const stage = new Konva.Stage({
    container: container,
    width: container.offsetWidth,
    height: 300, // Temp height, dynamically updated
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  const imageObj = new Image();
  imageObj.onload = function () {
    const stageHeight = (imageObj.height / imageObj.width) * stage.width();
    stage.height(stageHeight);

    const gap = 10; // Gap size
    const numPanels = 5;

    const panelWidth = imageObj.width / numPanels;
    const adjustedWidth = (stage.width() - gap * (numPanels - 1)) / numPanels;

    const heightProportions = [0.80, 0.90, 1, 0.90, 0.80]; //Height proportions

    for (let i = 0; i < numPanels; i++) {
      const panelHeight = stageHeight * heightProportions[i]; // Calculate panel height
      const verticalOffset = (stageHeight - panelHeight) / 2; // Center vertically

      const cropY = (imageObj.height - (imageObj.height * heightProportions[i])) / 2;

      const image = new Konva.Image({
        x: i * (adjustedWidth + gap),
        y: verticalOffset, // Center vertically
        width: adjustedWidth,
        height: panelHeight,
        cornerRadius: 10, // Edge rounding
        image: imageObj,
        crop: {
          x: i * panelWidth,
          y: cropY, // Crop vertically
          width: panelWidth,
          height: imageObj.height * heightProportions[i],
        },
      });
      layer.add(image);
    }

    layer.draw();
  };

  imageObj.src = imagePath; // Image Path
});
