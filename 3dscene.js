const canv = document.getElementById('html_canvas');
canv.width = window.innerWidth;
canv.height = window.innerHeight;

const engine = new BABYLON.Engine(canv, true);

const createScene = function() {
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 4, Math.PI / 4, 800, new BABYLON.Vector3(0, 1, 0), scene);
  const cameraController = new BABYLON.MeshBuilder.CreateSphere("invisible", scene);
  cameraController.isVisible = false;
  camera.parent = cameraController;
  //const camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(0, Math.sin(Math.PI / 4)*400, 0), scene);
  //camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canv, true);
  camera.mode = camera.ORTHOGRAPHIC_CAMERA;

  camera.inputs.removeByType('ArcRotateCameraPointersInput')
    camera.inputs.removeByType('ArcRotateCameraKeyboardMoveInput');
    camera.inputs.removeByType('ArcRotateCameraMouseInput');
  let cameraTarget = 0;


  var nodeMaterial = new BABYLON.NodeMaterial("node");
  //////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////
  //node material/////////////////////
  // InputBlock
  var position = new BABYLON.InputBlock("position");
  position.visibleInInspector = false;
  position.visibleOnFrame = false;
  position.target = 1;
  position.setAsAttribute("position");

  // TransformBlock
  var WorldPos = new BABYLON.TransformBlock("WorldPos");
  WorldPos.visibleInInspector = false;
  WorldPos.visibleOnFrame = false;
  WorldPos.target = 1;
  WorldPos.complementZ = 0;
  WorldPos.complementW = 1;

  // InputBlock
  var World = new BABYLON.InputBlock("World");
  World.visibleInInspector = false;
  World.visibleOnFrame = false;
  World.target = 1;
  World.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);

  // TransformBlock
  var Worldnormal = new BABYLON.TransformBlock("World normal");
  Worldnormal.visibleInInspector = false;
  Worldnormal.visibleOnFrame = false;
  Worldnormal.target = 1;
  Worldnormal.complementZ = 0;
  Worldnormal.complementW = 0;

  // InputBlock
  var normal = new BABYLON.InputBlock("normal");
  normal.visibleInInspector = false;
  normal.visibleOnFrame = false;
  normal.target = 1;
  normal.setAsAttribute("normal");

  // VectorSplitterBlock
  var N = new BABYLON.VectorSplitterBlock("N");
  N.visibleInInspector = false;
  N.visibleOnFrame = false;
  N.target = 4;

  // NormalizeBlock
  var Normalize = new BABYLON.NormalizeBlock("Normalize");
  Normalize.visibleInInspector = false;
  Normalize.visibleOnFrame = false;
  Normalize.target = 4;

  // DotBlock
  var NdotL = new BABYLON.DotBlock("N dot L");
  NdotL.visibleInInspector = false;
  NdotL.visibleOnFrame = false;
  NdotL.target = 4;

  // NormalizeBlock
  var L = new BABYLON.NormalizeBlock("L");
  L.visibleInInspector = false;
  L.visibleOnFrame = false;
  L.target = 4;

  // LightInformationBlock
  // light
  var Lightinformation = new BABYLON.LightInformationBlock("Light information");
  Lightinformation.visibleInInspector = false;
  Lightinformation.visibleOnFrame = false;
  Lightinformation.target = 1;

  // AddBlock
  var H = new BABYLON.AddBlock("H");
  H.visibleInInspector = false;
  H.visibleOnFrame = false;
  H.target = 4;

  // NormalizeBlock
  var Vnormalized = new BABYLON.NormalizeBlock("V(normalized)");
  Vnormalized.visibleInInspector = false;
  Vnormalized.visibleOnFrame = false;
  Vnormalized.target = 4;

  // ViewDirectionBlock
  var Viewdirection = new BABYLON.ViewDirectionBlock("View direction");
  Viewdirection.visibleInInspector = false;
  Viewdirection.visibleOnFrame = false;
  Viewdirection.target = 4;

  // InputBlock
  var Cameraposition = new BABYLON.InputBlock("Camera position");
  Cameraposition.visibleInInspector = false;
  Cameraposition.visibleOnFrame = false;
  Cameraposition.target = 1;
  Cameraposition.setAsSystemValue(BABYLON.NodeMaterialSystemValues.CameraPosition);

  // DotBlock
  var NDotV = new BABYLON.DotBlock("N Dot V");
  NDotV.visibleInInspector = false;
  NDotV.visibleOnFrame = false;
  NDotV.target = 4;

  // OneMinusBlock
  var NdotV = new BABYLON.OneMinusBlock("1- NdotV");
  NdotV.visibleInInspector = false;
  NdotV.visibleOnFrame = false;
  NdotV.target = 4;

  // MultiplyBlock
  var rimintensity = new BABYLON.MultiplyBlock("rim intensity");
  rimintensity.visibleInInspector = false;
  rimintensity.visibleOnFrame = false;
  rimintensity.target = 4;

  // PowBlock
  var RimFactor = new BABYLON.PowBlock("Rim Factor");
  RimFactor.visibleInInspector = false;
  RimFactor.visibleOnFrame = false;
  RimFactor.target = 4;

  // InputBlock
  var Float = new BABYLON.InputBlock("Float");
  Float.visibleInInspector = false;
  Float.visibleOnFrame = false;
  Float.target = 1;
  Float.value = 0.7;
  Float.min = 0;
  Float.max = 0;
  Float.isBoolean = false;
  Float.matrixMode = 0;
  Float.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float.isConstant = false;

  // StepBlock
  var quantizedRimIntensity = new BABYLON.StepBlock("quantizedRimIntensity");
  quantizedRimIntensity.visibleInInspector = false;
  quantizedRimIntensity.visibleOnFrame = false;
  quantizedRimIntensity.target = 4;

  // InputBlock
  var Float1 = new BABYLON.InputBlock("Float");
  Float1.visibleInInspector = false;
  Float1.visibleOnFrame = false;
  Float1.target = 1;
  Float1.value = 0.6;
  Float1.min = 0;
  Float1.max = 0;
  Float1.isBoolean = false;
  Float1.matrixMode = 0;
  Float1.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float1.isConstant = false;

  // ScaleBlock
  var Scale = new BABYLON.ScaleBlock("Scale");
  Scale.visibleInInspector = false;
  Scale.visibleOnFrame = false;
  Scale.target = 4;

  // InputBlock
  var Color = new BABYLON.InputBlock("Color3");
  Color.visibleInInspector = false;
  Color.visibleOnFrame = false;
  Color.target = 1;
  Color.value = new BABYLON.Color3(1, 1, 1);
  Color.isConstant = false;

  // AddBlock
  var Addrimspecdiff = new BABYLON.AddBlock("Add rim spec diff");
  Addrimspecdiff.visibleInInspector = false;
  Addrimspecdiff.visibleOnFrame = false;
  Addrimspecdiff.target = 4;

  // AddBlock
  var AddSpeculartodiffuse = new BABYLON.AddBlock("AddSpecular to diffuse");
  AddSpeculartodiffuse.visibleInInspector = false;
  AddSpeculartodiffuse.visibleOnFrame = false;
  AddSpeculartodiffuse.target = 4;

  // AddBlock
  var Add = new BABYLON.AddBlock("Add");
  Add.visibleInInspector = false;
  Add.visibleOnFrame = false;
  Add.target = 4;

  // InputBlock
  var AmbientLight = new BABYLON.InputBlock("Ambient Light");
  AmbientLight.visibleInInspector = false;
  AmbientLight.visibleOnFrame = false;
  AmbientLight.target = 1;
  AmbientLight.value = new BABYLON.Color3(0.43137254901960786, 0.43137254901960786, 0.43137254901960786);
  AmbientLight.isConstant = false;

  // ScaleBlock
  var Scale1 = new BABYLON.ScaleBlock("Scale");
  Scale1.visibleInInspector = false;
  Scale1.visibleOnFrame = false;
  Scale1.target = 4;

  // InputBlock
  var Color1 = new BABYLON.InputBlock("Color3");
  Color1.visibleInInspector = false;
  Color1.visibleOnFrame = false;
  Color1.target = 1;
  Color1.value = new BABYLON.Color3(0.7372549019607844, 0.7372549019607844, 0.7372549019607844);
  Color1.isConstant = false;

  // StepBlock
  var QUANTIZEDDIFFUSELIGHTINGINTENSITY = new BABYLON.StepBlock("QUANTIZED DIFFUSE LIGHTING INTENSITY");
  QUANTIZEDDIFFUSELIGHTINGINTENSITY.visibleInInspector = false;
  QUANTIZEDDIFFUSELIGHTINGINTENSITY.visibleOnFrame = false;
  QUANTIZEDDIFFUSELIGHTINGINTENSITY.target = 4;

  // InputBlock
  var diffuseCutoff = new BABYLON.InputBlock("diffuseCutoff");
  diffuseCutoff.visibleInInspector = false;
  diffuseCutoff.visibleOnFrame = false;
  diffuseCutoff.target = 1;
  diffuseCutoff.value = -0.5;
  diffuseCutoff.min = 0;
  diffuseCutoff.max = 0;
  diffuseCutoff.isBoolean = false;
  diffuseCutoff.matrixMode = 0;
  diffuseCutoff.animationType = BABYLON.AnimatedInputBlockTypes.None;
  diffuseCutoff.isConstant = false;

  // MultiplyBlock
  var SpecularFactor = new BABYLON.MultiplyBlock("Specular Factor");
  SpecularFactor.visibleInInspector = false;
  SpecularFactor.visibleOnFrame = false;
  SpecularFactor.target = 4;

  // DotBlock
  var NdotH = new BABYLON.DotBlock("N dot H");
  NdotH.visibleInInspector = false;
  NdotH.visibleOnFrame = false;
  NdotH.target = 4;

  // NormalizeBlock
  var HNormalized = new BABYLON.NormalizeBlock("H(Normalized)");
  HNormalized.visibleInInspector = false;
  HNormalized.visibleOnFrame = false;
  HNormalized.target = 4;

  // PowBlock
  var SpecularIntensity = new BABYLON.PowBlock("SpecularIntensity");
  SpecularIntensity.visibleInInspector = false;
  SpecularIntensity.visibleOnFrame = false;
  SpecularIntensity.target = 4;

  // MultiplyBlock
  var Glossiness = new BABYLON.MultiplyBlock("Glossiness^2");
  Glossiness.visibleInInspector = false;
  Glossiness.visibleOnFrame = false;
  Glossiness.target = 4;

  // InputBlock
  var Float2 = new BABYLON.InputBlock("Float");
  Float2.visibleInInspector = false;
  Float2.visibleOnFrame = false;
  Float2.target = 1;
  Float2.value = 0.76;
  Float2.min = 0;
  Float2.max = 0;
  Float2.isBoolean = false;
  Float2.matrixMode = 0;
  Float2.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float2.isConstant = false;

  // StepBlock
  var Step = new BABYLON.StepBlock("Step");
  Step.visibleInInspector = false;
  Step.visibleOnFrame = false;
  Step.target = 4;

  // InputBlock
  var SpecularCutoff = new BABYLON.InputBlock("Specular Cutoff");
  SpecularCutoff.visibleInInspector = false;
  SpecularCutoff.visibleOnFrame = false;
  SpecularCutoff.target = 1;
  SpecularCutoff.value = 0.9;
  SpecularCutoff.min = 0;
  SpecularCutoff.max = 0;
  SpecularCutoff.isBoolean = false;
  SpecularCutoff.matrixMode = 0;
  SpecularCutoff.animationType = BABYLON.AnimatedInputBlockTypes.None;
  SpecularCutoff.isConstant = false;

  // ScaleBlock
  var specularlightingcalculation = new BABYLON.ScaleBlock("specular lighting calculation");
  specularlightingcalculation.visibleInInspector = false;
  specularlightingcalculation.visibleOnFrame = false;
  specularlightingcalculation.target = 4;

  // InputBlock
  var Color2 = new BABYLON.InputBlock("Color3");
  Color2.visibleInInspector = false;
  Color2.visibleOnFrame = false;
  Color2.target = 1;
  Color2.value = new BABYLON.Color3(1, 1, 1);
  Color2.isConstant = false;

  // MultiplyBlock
  var Multiplylightbysurfacecolor = new BABYLON.MultiplyBlock("Multiply light by surface color");
  Multiplylightbysurfacecolor.visibleInInspector = false;
  Multiplylightbysurfacecolor.visibleOnFrame = false;
  Multiplylightbysurfacecolor.target = 4;

  // InputBlock
  var Color3 = new BABYLON.InputBlock("Color3");
  Color3.visibleInInspector = false;
  Color3.visibleOnFrame = false;
  Color3.target = 1;
  Color3.value = new BABYLON.Color3(0.4117647058823529, 0.5686274509803921, 0.36470588235294116);
  Color3.isConstant = false;

  // FragmentOutputBlock
  var FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
  FragmentOutput.visibleInInspector = false;
  FragmentOutput.visibleOnFrame = false;
  FragmentOutput.target = 2;
  FragmentOutput.convertToGammaSpace = false;
  FragmentOutput.convertToLinearSpace = false;
  FragmentOutput.useLogarithmicDepth = false;

  // TransformBlock
  var WorldPosViewProjectionTransform = new BABYLON.TransformBlock("WorldPos * ViewProjectionTransform");
  WorldPosViewProjectionTransform.visibleInInspector = false;
  WorldPosViewProjectionTransform.visibleOnFrame = false;
  WorldPosViewProjectionTransform.target = 1;
  WorldPosViewProjectionTransform.complementZ = 0;
  WorldPosViewProjectionTransform.complementW = 1;

  // InputBlock
  var ViewProjection = new BABYLON.InputBlock("ViewProjection");
  ViewProjection.visibleInInspector = false;
  ViewProjection.visibleOnFrame = false;
  ViewProjection.target = 1;
  ViewProjection.setAsSystemValue(BABYLON.NodeMaterialSystemValues.ViewProjection);

  // VertexOutputBlock
  var VertexOutput = new BABYLON.VertexOutputBlock("VertexOutput");
  VertexOutput.visibleInInspector = false;
  VertexOutput.visibleOnFrame = false;
  VertexOutput.target = 1;

  // AddBlock
  var Add1 = new BABYLON.AddBlock("Add");
  Add1.visibleInInspector = false;
  Add1.visibleOnFrame = false;
  Add1.target = 4;

  // InputBlock
  var Vector = new BABYLON.InputBlock("Vector3");
  Vector.visibleInInspector = false;
  Vector.visibleOnFrame = false;
  Vector.target = 1;
  Vector.value = new BABYLON.Vector3(100, 100, 100);
  Vector.isConstant = false;

  // Connections
  position.output.connectTo(WorldPos.vector);
  World.output.connectTo(WorldPos.transform);
  WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
  ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
  WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
  AmbientLight.output.connectTo(Add.left);
  Color1.output.connectTo(Scale1.input);
  normal.output.connectTo(Worldnormal.vector);
  World.output.connectTo(Worldnormal.transform);
  Worldnormal.output.connectTo(N.xyzw);
  N.xyzOut.connectTo(Normalize.input);
  Normalize.output.connectTo(NdotL.left);
  WorldPos.output.connectTo(Lightinformation.worldPosition);
  Lightinformation.direction.connectTo(L.input);
  L.output.connectTo(NdotL.right);
  NdotL.output.connectTo(QUANTIZEDDIFFUSELIGHTINGINTENSITY.value);
  diffuseCutoff.output.connectTo(QUANTIZEDDIFFUSELIGHTINGINTENSITY.edge);
  QUANTIZEDDIFFUSELIGHTINGINTENSITY.output.connectTo(Scale1.factor);
  Scale1.output.connectTo(Add.right);
  Add.output.connectTo(AddSpeculartodiffuse.left);
  Color2.output.connectTo(specularlightingcalculation.input);
  Normalize.output.connectTo(NdotH.left);
  L.output.connectTo(H.left);
  WorldPos.output.connectTo(Viewdirection.worldPosition);
  Cameraposition.output.connectTo(Viewdirection.cameraPosition);
  Viewdirection.output.connectTo(Vnormalized.input);
  Vnormalized.output.connectTo(H.right);
  H.output.connectTo(HNormalized.input);
  HNormalized.output.connectTo(NdotH.right);
  NdotH.output.connectTo(SpecularFactor.left);
  QUANTIZEDDIFFUSELIGHTINGINTENSITY.output.connectTo(SpecularFactor.right);
  SpecularFactor.output.connectTo(SpecularIntensity.value);
  Float2.output.connectTo(Glossiness.left);
  Float2.output.connectTo(Glossiness.right);
  Glossiness.output.connectTo(SpecularIntensity.power);
  SpecularIntensity.output.connectTo(Step.value);
  SpecularCutoff.output.connectTo(Step.edge);
  Step.output.connectTo(specularlightingcalculation.factor);
  specularlightingcalculation.output.connectTo(AddSpeculartodiffuse.right);
  AddSpeculartodiffuse.output.connectTo(Addrimspecdiff.left);
  Color.output.connectTo(Scale.input);
  Normalize.output.connectTo(NDotV.left);
  Vnormalized.output.connectTo(NDotV.right);
  NDotV.output.connectTo(NdotV.input);
  NdotV.output.connectTo(rimintensity.left);
  NdotL.output.connectTo(RimFactor.value);
  Float.output.connectTo(RimFactor.power);
  RimFactor.output.connectTo(rimintensity.right);
  rimintensity.output.connectTo(quantizedRimIntensity.value);
  Float1.output.connectTo(quantizedRimIntensity.edge);
  quantizedRimIntensity.output.connectTo(Scale.factor);
  Scale.output.connectTo(Addrimspecdiff.right);
  Addrimspecdiff.output.connectTo(Multiplylightbysurfacecolor.left);
  Color3.output.connectTo(Multiplylightbysurfacecolor.right);
  Multiplylightbysurfacecolor.output.connectTo(FragmentOutput.rgb);

  // Output nodes
  nodeMaterial.addOutputNode(VertexOutput);
  nodeMaterial.addOutputNode(FragmentOutput);
  nodeMaterial.build();



  ///////////////////nodeMaterial1 for frame//////////////
  var nodeMaterial1 = new BABYLON.NodeMaterial("node");

  // InputBlock
  var position = new BABYLON.InputBlock("position");
  position.visibleInInspector = false;
  position.visibleOnFrame = false;
  position.target = 1;
  position.setAsAttribute("position");

  // TransformBlock
  var WorldPos = new BABYLON.TransformBlock("WorldPos");
  WorldPos.visibleInInspector = false;
  WorldPos.visibleOnFrame = false;
  WorldPos.target = 1;
  WorldPos.complementZ = 0;
  WorldPos.complementW = 1;

  // InputBlock
  var World = new BABYLON.InputBlock("World");
  World.visibleInInspector = false;
  World.visibleOnFrame = false;
  World.target = 1;
  World.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);

  // TransformBlock
  var WorldPosViewProjectionTransform = new BABYLON.TransformBlock("WorldPos * ViewProjectionTransform");
  WorldPosViewProjectionTransform.visibleInInspector = false;
  WorldPosViewProjectionTransform.visibleOnFrame = false;
  WorldPosViewProjectionTransform.target = 1;
  WorldPosViewProjectionTransform.complementZ = 0;
  WorldPosViewProjectionTransform.complementW = 1;

  // InputBlock
  var ViewProjection = new BABYLON.InputBlock("ViewProjection");
  ViewProjection.visibleInInspector = false;
  ViewProjection.visibleOnFrame = false;
  ViewProjection.target = 1;
  ViewProjection.setAsSystemValue(BABYLON.NodeMaterialSystemValues.ViewProjection);

  // VertexOutputBlock
  var VertexOutput = new BABYLON.VertexOutputBlock("VertexOutput");
  VertexOutput.visibleInInspector = false;
  VertexOutput.visibleOnFrame = false;
  VertexOutput.target = 1;

  // InputBlock
  var color = new BABYLON.InputBlock("color");
  color.visibleInInspector = false;
  color.visibleOnFrame = false;
  color.target = 1;
  color.value = new BABYLON.Color4(0, 0, 0, 1);
  color.isConstant = false;

  // FragmentOutputBlock
  var FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
  FragmentOutput.visibleInInspector = false;
  FragmentOutput.visibleOnFrame = false;
  FragmentOutput.target = 2;
  FragmentOutput.convertToGammaSpace = false;
  FragmentOutput.convertToLinearSpace = false;
  FragmentOutput.useLogarithmicDepth = false;

  // Connections
  position.output.connectTo(WorldPos.vector);
  World.output.connectTo(WorldPos.transform);
  WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
  ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
  WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
  color.output.connectTo(FragmentOutput.rgba);

  // Output nodes
  nodeMaterial1.addOutputNode(VertexOutput);
  nodeMaterial1.addOutputNode(FragmentOutput);
  nodeMaterial1.build();
  /////////////////////nodeMaterial1 end////////////////
  /////////////////////////////////////////////////////
  //////////////////////////////////////////

//set of sizes and arrays
  const h = window.innerHeight;
  const w = window.innerWidth;

    let roomNumber = 4; //the total number of rooms
    let offset = 1000; //offset between rooms
  const roomL = 0.25 * w; //long of wall and floor
  const roomD = 0.05 * h; //depth of wall and floor
  const offsetX = 0.15 * h;
  const offsetZ = -offsetX;
  const columnL = roomD
  const columnD = roomL / 2;
  //const light = new BABYLON.SpotLight("lampLight", new BABYLON.Vector3(offsetX, roomL, offsetZ), new BABYLON.Vector3(0, -1, 0), Math.PI, 1, scene);
  const light = new BABYLON.DirectionalLight("hemi", new BABYLON.Vector3(-1, -0.5, 0));
  light.intensity = 0.7

  let rooms = []; //an of all the rooms
  let colors = [];
  let color0 = new BABYLON.Color3(241 / 255, 221 / 255, 191 / 255);
  scene.clearColor = color0;
  colors.push(color0);
  let color1 = new BABYLON.Color3(248/255, 203/255, 46/255);
  colors.push(color1);
  let color2 = new BABYLON.Color3(146/255,180/255,236/255);
  colors.push(color2);


  let plate = BABYLON.MeshBuilder.CreateBox("plate1", {
    width: roomL,
    depth: roomL,
    height: roomD
  }, scene);
  plate.position.x = offsetX;
  plate.position.z = offsetZ; //offset of floor

  let wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {
    width: roomL + 0.01,
    depth: roomL,
    height: roomD
  }, scene);
  wall1.rotation = new BABYLON.Vector3(0, 0, Math.PI / 2);
  wall1.position.x = offsetX - roomL / 2 + roomD / 2;
  wall1.position.y = roomL / 2 - roomD / 2;
  wall1.position.z = offsetZ;

  let wall2 = BABYLON.MeshBuilder.CreateBox("wall2", {
    width: roomL,
    depth: roomL,
    height: roomD
  }, scene);
  wall2.rotation = new BABYLON.Vector3(0, Math.PI / 2, Math.PI / 2);
  wall2.position.x = offsetX;
  wall2.position.z = offsetZ + roomL / 2 - roomD / 2;
  wall2.position.y = roomL / 2 - roomD / 2;

  let column = BABYLON.MeshBuilder.CreateBox("column", {
    width: columnL,
    depth: columnL,
    height: columnD
  }, scene);
  column.position.x = offsetX + roomD / 2;
  column.position.z = offsetZ - roomD / 2;
  column.position.y = columnD / 2 + roomD;
//create the firt room as the prototype

  //import first model
  BABYLON.SceneLoader.ImportMesh("", '', 'blackHorse.obj', scene, function(blackHorse) {
    console.log(`logging all mesh data ${blackHorse}` );
    blackHorse[1].scaling = new BABYLON.Vector3(w / 200, w / 200, w / 200);
    blackHorse[1].position.x = offsetX + roomD / 2;
    blackHorse[1].position.z = offsetZ - roomD / 2;
    blackHorse[1].position.y = columnD + roomD;
    blackHorse[1].rotation.y = Math.PI / 2;
    scene.onBeforeRenderObservable.add(function() { //update
      blackHorse[1].rotation.y += 0.005;
    });
    blackHorse[1].material = nodeMaterial;
  });
//import second model
  BABYLON.SceneLoader.ImportMesh("", 'walkman2/', 'scene.gltf', scene, function(newMesh) {
    console.log(`logging all mesh data ${newMesh}` );
  //  for (var i = 1; i < newMesh; i++) {
   //console.log(`logging this mesh data ${newMesh[i]}` );
   newMesh[0].scaling = new BABYLON.Vector3(w / 30000, w / 30000, w /30000);
   newMesh[0].position.x = offsetX + roomD / 2 + offset;
   newMesh[0].position.z = offsetZ - roomD / 2+ offset;
   newMesh[0].position.y = columnD + roomD;
   newMesh[0].rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
   //for (var i = 0; i < newMesh; i++) {
   scene.onBeforeRenderObservable.add(function() { //update
     //newMesh[0].rotation.y += 0.01;
});
  });
  //////////////////particle system for walkman/////////////////
  const particleSystem1 = new BABYLON.ParticleSystem("particles", 2000);
particleSystem1.particleTexture = new BABYLON.Texture("music.png");
particleSystem1.emitter = new BABYLON.Vector3(offsetX + roomD  + offset,columnD + roomD,offsetZ - roomD / 2+ offset+10);
//particleSystem1.emitter = ground;
particleSystem1.updateSpeed = 0.5;
//particleSystem1.gravity =
particleSystem1.minSize = 15;
particleSystem1.maxSize = 20;
particleSystem1.preWarmStepOffset = 10;
particleSystem1.preWarmCycles = 100;
particleSystem1.addVelocityGradient(0, 0); //applied power at start of particle lifetime
particleSystem1.addVelocityGradient(1, 3); //applied power at end of particle lifetime
particleSystem1.direction1 = new BABYLON.Vector3(0.2,1,0);
particleSystem1.direction2 = new BABYLON.Vector3(0,1,0.2);
particleSystem1.minAngularSpeed = -0.001;
particleSystem1.maxAngularSpeed = 0.001;

//set size and life time change
particleSystem1.addSizeGradient(0,5);
particleSystem1.addSizeGradient(1,20);
particleSystem1.minLifeTime = 500;
particleSystem1.maxLifeTime = 2000;
//set emit Speed
particleSystem1.emitRate = 0.05;
particleSystem1.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLY;
particleSystem1.start();

const particleSystem2 = new BABYLON.ParticleSystem("particles", 2000);
particleSystem2.particleTexture = new BABYLON.Texture("music2.png");
particleSystem2.emitter = new BABYLON.Vector3(offsetX + roomD  + offset,columnD + roomD,offsetZ - roomD / 2+ offset+10);
//particleSystem2.emitter = ground;
particleSystem2.updateSpeed = 0.5;
//particleSystem2.gravity =
particleSystem2.minSize = 15;
particleSystem2.maxSize = 20;
particleSystem2.preWarmStepOffset = 10;
particleSystem2.preWarmCycles = 100;
particleSystem2.addVelocityGradient(0, 0); //applied power at start of particle lifetime
particleSystem2.addVelocityGradient(1, 3); //applied power at end of particle lifetime
particleSystem2.direction1 = new BABYLON.Vector3(0.2,1,0);
particleSystem2.direction2 = new BABYLON.Vector3(0,1,0.2);
particleSystem2.minAngularSpeed = -0.001;
particleSystem2.maxAngularSpeed = 0.001;

//set size and life time change
particleSystem2.addSizeGradient(0,5);
particleSystem2.addSizeGradient(1,20);
particleSystem2.minLifeTime = 500;
particleSystem2.maxLifeTime = 2000;
//set emit Speed
particleSystem2.emitRate = 0.05;
particleSystem2.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLY;
particleSystem2.start();
  ///////////////////////particle system end//////////////
  BABYLON.SceneLoader.ImportMesh("", 'damaged_hands/', 'scene.gltf', scene, function(newMesh) {
    console.log(`logging all mesh data hands ${newMesh}` );
  //  for (var i = 1; i < newMesh; i++) {
   //console.log(`logging this mesh data ${newMesh[i]}` );
   newMesh[0].scaling = new BABYLON.Vector3(w / 5, w / 5, w /5);
   newMesh[0].position.x = offsetX + roomD*3  + 2*offset;
   newMesh[0].position.z = offsetZ - roomD*3  + 2*offset;
   newMesh[0].position.y = columnD*0.7 ;
   newMesh[0].rotation = new BABYLON.Vector3(-Math.PI/3, Math.PI*0.75, 0);
   //for (var i = 0; i < newMesh; i++) {
   scene.onBeforeRenderObservable.add(function() { //update
     //newMesh[0].rotation.y += 0.01;
});
  });
  const particleSystem3 = new BABYLON.ParticleSystem("particles", 2000);
  particleSystem3.particleTexture = new BABYLON.Texture("flare.png");
  var emitter3 = new BABYLON.SphereParticleEmitter();
  emitter3.radius = 1000;
  emitter3.radiusRange = 100;
  //particleSystem3.emitter = ground;
  particleSystem3.updateSpeed = 0.5;
  particleSystem3.emitter = new BABYLON.Vector3(offsetX + roomD / 2 + 2*offset,columnD + roomD,offsetZ - roomD / 2+ 2*offset);
  //particleSystem3.gravity =
  particleSystem3.minSize = 15;
  particleSystem3.maxSize = 20;
  particleSystem3.addColorGradient(0, new BABYLON.Color4(0.1, 0.9, 0.1, 1));
  particleSystem3.addColorGradient(1, new BABYLON.Color4(0.1, 0.9, 0.1, 0.5));
  particleSystem3.preWarmStepOffset = 10;
  particleSystem3.preWarmCycles = 100;
  particleSystem3.addVelocityGradient(0, 0); //applied power at start of particle lifetime
  particleSystem3.addVelocityGradient(1, 3); //applied power at end of particle lifetim
  particleSystem3.minAngularSpeed = -0.001;
  particleSystem3.maxAngularSpeed = 0.001;
  particleSystem3.direction1 = new BABYLON.Vector3(0,0,0);
  particleSystem3.direction1 = new BABYLON.Vector3(1,1,1);
  //set size and life time change
  particleSystem3.addSizeGradient(0,5);
  particleSystem3.addSizeGradient(1,20);
  particleSystem3.minLifeTime = 500;
  particleSystem3.maxLifeTime = 2000;
  //set emit Speed
  particleSystem3.emitRate = 0.05;
  particleSystem3.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
  particleSystem3.start();//////////////////particle system for scene3
  //import tree
  BABYLON.SceneLoader.ImportMesh("", 'tree_stump_stylized/', 'scene.gltf', scene, function(newMesh) {
    console.log(`logging all mesh data hands ${newMesh}` );
  //  for (var i = 1; i < newMesh; i++) {
   //console.log(`logging this mesh data ${newMesh[i]}` );
   newMesh[0].scaling = new BABYLON.Vector3(w / 200, w / 200, w /200);
   newMesh[0].position.x = offsetX + roomD / 2 + 2*offset;
   newMesh[0].position.z = offsetZ - roomD / 2+ 2*offset;
   newMesh[0].position.y = columnD + roomD*1.3;
   newMesh[0].rotation = new BABYLON.Vector3(0, 0, 0);
   //for (var i = 0; i < newMesh; i++) {
   scene.onBeforeRenderObservable.add(function() { //update
     //newMesh[0].rotation.y += 0.01;
});
  });

  //import gun
  BABYLON.SceneLoader.ImportMesh("", 'pistol_gun/', 'scene.gltf', scene, function(newMesh) {
    console.log(`logging all mesh data hands ${newMesh}` );
  //  for (var i = 1; i < newMesh; i++) {
   //console.log(`logging this mesh data ${newMesh[i]}` );
   newMesh[0].scaling = new BABYLON.Vector3(w / 800, w / 800, w /800);
   newMesh[0].position.x = offsetX + roomD / 2.3 + 3*offset;
   newMesh[0].position.z = offsetZ - roomD / 2+ 3*offset;
   newMesh[0].position.y = columnD + roomD;
   newMesh[0].rotation = new BABYLON.Vector3(0, Math.PI/2, Math.PI/2);
   //for (var i = 0; i < newMesh; i++) {
   scene.onBeforeRenderObservable.add(function() { //update
     //newMesh[0].rotation.y += 0.01;
});
  });
  //import the blood
  BABYLON.SceneLoader.ImportMesh("", 'blood_puddle/', 'scene.gltf', scene, function(newMesh) {
    console.log(`logging all mesh data hands ${newMesh}` );
  //  for (var i = 1; i < newMesh; i++) {
   //console.log(`logging this mesh data ${newMesh[i]}` );
   newMesh[0].scaling = new BABYLON.Vector3(w*2 , w*2 , 2*w );
   newMesh[0].position.x = offsetX + roomD / 2 + 3*offset+columnL;
   newMesh[0].position.z = offsetZ - roomD / 2+ 3*offset;
   newMesh[0].position.y =  roomD;
   newMesh[0].rotation = new BABYLON.Vector3(0, 0, 0);
   //for (var i = 0; i < newMesh; i++) {
   scene.onBeforeRenderObservable.add(function() { //update
     //newMesh[0].rotation.y += 0.01;
});
  });


  var plane = BABYLON.MeshBuilder.CreatePlane("plane", {
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
  }, scene);
  plane.scaling = new BABYLON.Vector3(192 / 800 * h, 108 / 800 * h, 0);
  plane.rotation.y = -Math.PI / 2;
  plane.position.x = offsetX - roomL / 2 + roomD + 1;
  plane.position.y = columnD;
  plane.position.z = offsetZ - roomD / 2;
  var videoMat1 = new BABYLON.StandardMaterial("video1", scene);
  var vid = new BABYLON.VideoTexture("vidT1", "videoTexture1.mp4", scene);
  videoMat1.diffuseTexture = vid;
  videoMat1.roughness = 1;
  videoMat1.emissiveColor = new BABYLON.Color3.White();
//set different video to different tvs


  let room1Array = [wall1, wall2, plate, column];
  let room1 = BABYLON.Mesh.MergeMeshes(room1Array);
  rooms.push(room1);


  let tvs = [];
  tvs.push(plane);

  for (let i = 1; i < roomNumber; i++) {
    let cloneRoom = room1.clone("room" + (i + 1));
    cloneRoom.position.x = room1.position.x + i * offset;
    cloneRoom.position.z = room1.position.z + i * offset;
    rooms.push(cloneRoom);
    console.log(cloneRoom.position.x);

    let cloneTV = plane.clone("tv"+(i+1));
    cloneTV.position.x = plane.position.x+ i*offset;
    cloneTV.position.z = plane.position.z+ i*offset;
    tvs.push(cloneTV);
//generate rooms and tvs
    console.log(cloneTV.position.x);
  }
  var videoMat2 = new BABYLON.StandardMaterial("video2", scene);
  var vid2 = new BABYLON.VideoTexture("vidT2", "videoTexture2.mp4", scene);
  videoMat2.diffuseTexture = vid2;
  videoMat2.roughness = 1;
  videoMat2.emissiveColor = new BABYLON.Color3.White();
  tvs[1].material = videoMat2;

  var videoMat3 = new BABYLON.StandardMaterial("video3", scene);
  var vid3 = new BABYLON.VideoTexture("vidT3", "video3.mp4", scene);
  videoMat3.diffuseTexture = vid3;
  videoMat3.roughness = 1;
  videoMat3.emissiveColor = new BABYLON.Color3.White();
  tvs[2].material = videoMat3;

  var videoMat4 = new BABYLON.StandardMaterial("video4", scene);
  var vid4 = new BABYLON.VideoTexture("vidT4", "video4.mp4", scene);
  videoMat4.diffuseTexture = vid4;
  videoMat4.roughness = 1;
  videoMat4.emissiveColor = new BABYLON.Color3.White();
  tvs[3].material = videoMat4;
//set different video to different tvs

  let mats = [];

  /*for (let i = 0; i < rooms.length; i++) {
    let wallMat[i] = new BABYLON.StandardMaterial("wall"+i,scene);
    wallMatp.roughness = 1;
    wallMati.emissiveColor = matsColors[i];
    mats.push(wallMati);*/


  let wallMat1 = new BABYLON.StandardMaterial("wall1", scene);
  wallMat1.roughness = 1;
  wallMat1.emissiveColor = new BABYLON.Color3(82 / 255, 94 / 255, 117 / 255);
  mats.push(wallMat1);
  let wallMat2 = new BABYLON.StandardMaterial("wall2", scene);
  wallMat2.roughness = 1;
  wallMat2.emissiveColor = new BABYLON.Color3(238/255, 80/255, 7/255);
  mats.push(wallMat2);
  let wallMat3 = new BABYLON.StandardMaterial("wall3", scene);
  wallMat3.roughness = 1;
  wallMat3.emissiveColor = new BABYLON.Color3(230/255, 189/255, 50/255);
  mats.push(wallMat3);
  //set diffrent color material for each room

  for (let i = 0; i < rooms.length; i++) {
    rooms[i].material = mats[i];
  }//assign materials to rooms
  //column.material = videoMat1;

  //  room1.material = wallMat1;
  plane.material = videoMat1;


  //////////////////////add a mask layer to simulate frame///////////////
  function addFrame(scene) {
    if (scene.activeCameras.length === 0) {
      scene.activeCameras.push(scene.activeCamera);
    }

    var secondCamera = new BABYLON.FreeCamera("FrameCamera", new BABYLON.Vector3(0, 0, -500), scene);
    secondCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    secondCamera.layerMask = 0x20000000;
    scene.activeCameras.push(secondCamera);

    var meshes = [];

    /*var y = BABYLON.Mesh.CreateBox("y", h * 0.2, scene);
    y.scaling = new BABYLON.Vector3(2, 2, 1);
    y.position = new BABYLON.Vector3(0, 0, -300);
    meshes.push(y);*/

    let frameArray1 = [
      new BABYLON.Vector3(0, 0, 0),
      //new BABYLON.Vector3(0,frameR,0),
    ]
    let frameR = 0.15 * h;
    for (i = 1; i <= 100; i++) {
      frameArray1.push(new BABYLON.Vector3(i / 100 * frameR, Math.sqrt(2 * frameR * i / 100 * frameR - (i / 100 * frameR) * (i / 100 * frameR)), 0));
    }
    let leftTop = BABYLON.Mesh.CreateLathe("lathe", frameArray1, 1, 64, scene);
    leftTop.scaling = new BABYLON.Vector3(1, 1, 1);
    meshes.push(leftTop);
    leftTop.position = new BABYLON.Vector3(-0.3 * w, h / 2 - frameR, -100);

    let rightTop = BABYLON.Mesh.CreateLathe("lathe", frameArray1, 1, 64, scene);
    rightTop.scaling = new BABYLON.Vector3(1, 1, 1);
    meshes.push(rightTop);
    rightTop.position = new BABYLON.Vector3(0.3 * w, h / 2 - frameR, -100);

    let rightDown = BABYLON.Mesh.CreateLathe("lathe", frameArray1, 1, 64, scene);
    rightDown.scaling = new BABYLON.Vector3(1, 1, 1);
    meshes.push(rightDown);
    rightDown.rotation.x = Math.PI;
    rightDown.position = new BABYLON.Vector3(0.3 * w, -h / 2 + frameR, -100);
    rightDown.rotation.x = Math.PI;

    let leftDown = BABYLON.Mesh.CreateLathe("lathe", frameArray1, 1, 64, scene);
    leftDown.scaling = new BABYLON.Vector3(1, 1, 1);
    meshes.push(leftDown);
    leftDown.rotation.x = Math.PI;
    leftDown.position = new BABYLON.Vector3(-0.3 * w, -h / 2 + frameR, -100);
    leftDown.rotation.x = Math.PI;

    let left = BABYLON.Mesh.CreateBox("left", h * 0.5, scene);
    meshes.push(left);
    left.scaling = new BABYLON.Vector3(1, 2, 1.1);
    left.position = new BABYLON.Vector3(-0.3 * w - 0.25 * h, 0, -100);

    let right = BABYLON.Mesh.CreateBox("right", h * 0.5, scene);
    meshes.push(right);
    right.scaling = new BABYLON.Vector3(1, 2, 1.1);
    right.position = new BABYLON.Vector3(0.3 * w + 0.25 * h, 0, -100);

    var frame = BABYLON.Mesh.MergeMeshes(meshes);
    frame.name = "Frame";
    frame.layerMask = 0x20000000;
    frame.freezeWorldMatrix();

    var mat = new BABYLON.StandardMaterial("emissive mat", scene);
    mat.checkReadyOnlyOnce = true;
    mat.emissiveColor = new BABYLON.Color3(1, 0, 0);
    frame.material = nodeMaterial1;
    //frame.material = mat;
    //need to be before return scene
  }

  addFrame(scene);
  //////////////////frameend////////////////

////////////////music/////////////
let bgMusics = [];

let bgMusic1 = new Audio();/////backgroundMusic
  bgMusic1.src = "bgmusic1.m4a";
  bgMusic1.loop = true;
  bgMusic1.volume = 0.3;
  bgMusics.push(bgMusic1);
  bgMusics[0].play();
let bgMusic2 = new Audio();/////backgroundMusic
  bgMusic2.src = "bgMusic2.m4a";
  bgMusic2.loop = true;
  bgMusic2.volume = 0.3;
  bgMusics.push(bgMusic2);
  let bgMusic3 = new Audio();/////backgroundMusic
    bgMusic3.src = "bgMusic3.m4a";
    bgMusic3.loop = true;
    bgMusic3.volume = 0.3;
    bgMusics.push(bgMusic3);
    let bgMusic4 = new Audio();/////backgroundMusic
      bgMusic4.src = "bgMusic4.m4a";
      bgMusic4.loop = true;
      bgMusic4.volume = 0.3;
      bgMusics.push(bgMusic4);

///////////////music end///////////////////

  //////////GUI/////////
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", ">");
  button1.width = 0.03;
  button1.height = 0.07;
  button1.color = "white";
  button1.cornerRadius = 20;
  button1.background = "black";
  //button1.top = 0.45 * h;
  button1.left = 0.25 * w;
  button1.thickness = 0;
  button1.fontSize = 50;
  button1.alpha = 0.6;
  button1.fontFamily = "pixel";
  button1.onPointerUpObservable.add(function() {
    if (cameraTarget < rooms.length - 1) {
      bgMusics[cameraTarget].pause();
      bgMusics[cameraTarget+1].play();
      cameraTarget++;
      cameraController.position.x += offset;
      cameraController.position.z += offset;
      scene.clearColor = colors[cameraTarget];
    }else{
      alert("It's already the last one");
    }
  });
  advancedTexture.addControl(button1);
  var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "<");
  button2.width = 0.03;
  button2.fontFamily = "pixel";
  button2.height = 0.07;
  button2.color = "white";
  button2.cornerRadius = 20;
  button2.background = "black";
  //button2.top = 0.45 * h;
  button2.left = -0.25 * w;
  button2.thickness = 0;
  button2.fontSize = 50;
  button2.alpha = 0.6;
  button2.onPointerUpObservable.add(function() {
    if (cameraTarget > 0) {
      bgMusics[cameraTarget].pause();
      bgMusics[cameraTarget-1].play();
      cameraTarget--;
      cameraController.position.x -= offset;
      cameraController.position.z -= offset;
      scene.clearColor = colors[cameraTarget];
    }else{
      alert('It\'s already the first one ');
    }
  });
  advancedTexture.addControl(button2);
  ///////////GUI END////////


  return scene; //return scene
}

const scene = createScene(); //actually call the function

engine.runRenderLoop(function() { //run rendering loop
  scene.render();
});

window.addEventListener("resize", function() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
  engine.resize();
});
