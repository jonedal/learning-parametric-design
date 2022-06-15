function initGui() {

  multSlider = createSlider(400, 500, 470, 10);
    multSlider.position(sketchWidth / 2 - 100, sketchHeight + 13);
    multSlider.style('width', '200px');
    multSlider.style('height', '5px');
    multSlider.style('background', 'red');

  detailSlider = createSlider(100, 1500, 100, 50);
    detailSlider.position(sketchWidth / 2 - 100, sketchHeight + 53);
    detailSlider.style('width', '200px');
    detailSlider.style('height', '5px');

  densitySlider = createSlider(0.5, 5, 0.5, 0.01);
    densitySlider.position(sketchWidth / 2 - 100, sketchHeight + 93);
    densitySlider.style('width', '200px');
    densitySlider.style('height', '5px');

  thickSlider = createSlider(0.5, 5, 1.5, 0.5);
    thickSlider.position(sketchWidth / 2 - 100, sketchHeight + 133);
    thickSlider.style('width', '200px');
    thickSlider.style('height', '5px');

  rimSlider = createSlider(-400, 300, 130, 1);
    rimSlider.position(sketchWidth / 2 - 100, sketchHeight + 173);
    rimSlider.style('width', '200px');
    rimSlider.style('height', '5px');
  
  effectSlider = createSlider(1, 360, 45, 0.1);
    effectSlider.position(sketchWidth / 2 - 100, sketchHeight + 213);
    effectSlider.style('width', '200px');
    effectSlider.style('height', '5px');
  
  threshSlider = createSlider(0.1, 1, 0.6, 0.1);
    threshSlider.position(sketchWidth / 2 - 320, sketchHeight + 48);
    threshSlider.style('width', '75px');
    threshSlider.style('height', '5px');

  flipButton = createButton('FLIP');
    flipButton.position(sketchWidth / 2 - 320, sketchHeight + 8)
    flipButton.size(80);
    flipButton.mousePressed(flipVisuals);
    flipButton.style('background-color', 'rgba(160, 149, 230, 0.5)')

  
    function flipVisuals() {
      flip *= -1;
    }



  let pTag = createP('jjung_vision_1.3.3');
    pTag.style('font-size', '10px');
    pTag.position(sketchWidth - 140, sketchHeight);
  
  let pData = createP('© JD - FHP (20341)');
    pData.style('font-size', '10px');
    pData.position(sketchWidth - 140, sketchHeight + 40);

  let pMult = createP('RIBBON');
    pMult.style('font-size', '10px');
    pMult.position(sketchWidth / 2 - 175, sketchHeight);  
  
  let pDetail = createP('DETAIL');
    pDetail.style('font-size', '10px');
    pDetail.position(sketchWidth / 2 - 175, sketchHeight + 40);  

  let pDensity = createP('DENSITY');
    pDensity.style('font-size', '10px');
    pDensity.position(sketchWidth / 2 - 175, sketchHeight + 80);  

  let pThick = createP('THICKNESS');
    pThick.style('font-size', '10px');
    pThick.position(sketchWidth / 2 - 175, sketchHeight + 120);  
  
  let pRim = createP('OUTER RIM');
    pRim.style('font-size', '10px');
    pRim.position(sketchWidth / 2 - 175, sketchHeight + 160);  
  
  let pEffect = createP('WINDING');
    pEffect.style('font-size', '10px');
    pEffect.position(sketchWidth / 2 - 175, sketchHeight + 200);  
  
  let pThresh = createP('= THR');
    pThresh.style('font-size', '8px');
    pThresh.position(sketchWidth / 2 - 272, sketchHeight + 62);  

  
  pMultVal = createP(multSlider.value());
    pMultVal.style('font-size', '12px');
    pMultVal.position(sketchWidth / 2 + 150, sketchHeight);  
 
  pDetailVal = createP(detailSlider.value());
    pDetailVal.style('font-size', '12px');
    pDetailVal.position(sketchWidth / 2 + 150, sketchHeight + 38);  
 
  pDensityVal = createP(densitySlider.value());
    pDensityVal.style('font-size', '12px');
    pDensityVal.position(sketchWidth / 2 + 150, sketchHeight + 78);  
 
  pThickVal = createP(thickSlider.value());
    pThickVal.style('font-size', '12px');
    pThickVal.position(sketchWidth / 2 + 150, sketchHeight + 118);  
  
  pRimVal = createP(rimSlider.value());
    pRimVal.style('font-size', '12px');
    pRimVal.position(sketchWidth / 2 + 150, sketchHeight + 158);  
  
  pEffectVal = createP(rimSlider.value());
    pEffectVal.style('font-size', '12px');
    pEffectVal.position(sketchWidth / 2 + 150, sketchHeight + 198);  
  
  pTreshVal = createP(threshSlider.value());
    pTreshVal.style('font-size', '9px');
    pTreshVal.position(sketchWidth / 2 - 318, sketchHeight + 59);  

  pLevel = createP();
    pLevel.style('font-size', '11px');
    pLevel.position(sketchWidth - 94, sketchHeight - 68);  

  }
  

   