function initGui() {

  let pyOffset = 7;
  let pxOffset = 300;

  multSlider = createSlider(400, 500, 470, 10);
  multSlider.position(sketchWidth / 2 - 100, sketchHeight + 13);
  multSlider.style('width', '200px');
  multSlider.style('height', '5px');
  multSlider.style('background', 'red');
  multSlider.hide();

detailSlider = createSlider(100, 1500, 100, 50);
  detailSlider.position(sketchWidth / 2 - 100, sketchHeight + 53);
  detailSlider.style('width', '200px');
  detailSlider.style('height', '5px');
  detailSlider.hide();

densitySlider = createSlider(0.5, 5, 0.5, 0.01);
  densitySlider.position(sketchWidth / 2 - 100, sketchHeight + 93);
  densitySlider.style('width', '200px');
  densitySlider.style('height', '5px');
  densitySlider.hide();

thickSlider = createSlider(0.5, 5, 1.5, 0.5);
  thickSlider.position(sketchWidth / 2 - 100, sketchHeight + 133);
  thickSlider.style('width', '200px');
  thickSlider.style('height', '5px');
  thickSlider.hide();

rimSlider = createSlider(-400, 300, 130, 1);
  rimSlider.position(sketchWidth / 2 - 100, sketchHeight + 173);
  rimSlider.style('width', '200px');
  rimSlider.style('height', '5px');
  rimSlider.hide();

effectSlider = createSlider(1, 360, 45, 0.1);
  effectSlider.position(sketchWidth / 2 - 100, sketchHeight + 213);
  effectSlider.style('width', '200px');
  effectSlider.style('height', '5px');
  effectSlider.hide();

threshSlider = createSlider(0.1, 1, 0.6, 0.1);
  threshSlider.position(sketchWidth / 2 - 320, sketchHeight + 48);
  threshSlider.style('width', '75px');
  threshSlider.style('height', '5px');
  threshSlider.hide();


let pTag = createP('jjung_vision // brandenburger str. 68');
  pTag.style('font-size', '10px');
  pTag.position(sketchWidth - 400, sketchHeight + pyOffset);

let pData = createP('@jonathan___jung');
  pData.style('font-size', '10px');
  pData.position(sketchWidth - 150, sketchHeight + pyOffset);

let pMult = createP('RIBBON');
  pMult.style('font-size', '10px');
  pMult.position(sketchWidth / 2 - 175 - pxOffset, sketchHeight);  
  pMult.hide();

let pDetail = createP('DTL');
  pDetail.style('font-size', '12px');
  pDetail.position(sketchWidth / 2 - 450 - pxOffset, sketchHeight + 4);  

let pDensity = createP('DSY');
  pDensity.style('font-size', '12px');
  pDensity.position(sketchWidth / 2 - 600 - pxOffset, sketchHeight + 4);  

let pThick = createP('STR');
  pThick.style('font-size', '12px');
  pThick.position(sketchWidth / 2 - 150 - pxOffset, sketchHeight + 4);  

let pRim = createP('OUTER RIM');
  pRim.style('font-size', '10px');
  pRim.position(sketchWidth / 2 - 175, sketchHeight + 160);  
  pRim.hide();

let pEffect = createP('WDG');
  pEffect.style('font-size', '12px');
  pEffect.position(sketchWidth / 2 - 300 - pxOffset, sketchHeight + 4);  

let pThresh = createP('= THR');
  pThresh.style('font-size', '8px');
  pThresh.position(sketchWidth / 2 - 272, sketchHeight + 62);  
  pThresh.hide();


pDetailVal = createP(detailSlider.value());
  pDetailVal.style('font-size', '12px');
  pDetailVal.position(sketchWidth / 2 - 400 - pxOffset, sketchHeight + 4);  

pDensityVal = createP(densitySlider.value());
  pDensityVal.style('font-size', '12px');
  pDensityVal.position(sketchWidth / 2 - 550 - pxOffset, sketchHeight + 4);  

pThickVal = createP(thickSlider.value());
  pThickVal.style('font-size', '12px');
  pThickVal.position(sketchWidth / 2 - 100 - pxOffset, sketchHeight + 4);  


pEffectVal = createP(rimSlider.value());
  pEffectVal.style('font-size', '12px');
  pEffectVal.position(sketchWidth / 2 - 250 - pxOffset, sketchHeight + 4);  

pTreshVal = createP(threshSlider.value());
  pTreshVal.style('font-size', '9px');
  pTreshVal.position(sketchWidth / 2 - 318, sketchHeight + 59);  
  pTreshVal.hide();

pLevel = createP();
  pLevel.style('font-size', '11px');
  pLevel.position(sketchWidth - 94, sketchHeight - 68); 

  }
  

   