// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Game");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("sky", "./public/assets/fondo.png");
    this.load.image("pelota", "./public/assets/panal.png");
    this.load.image("hoja", "./public/assets/particles/hoja.png");
    this.load.image("pala", "./public/assets/barra.png");
    this.load.image("bamboo", "./public/assets/bamboo.png");
  }

  create() {
    // create game objects
    this.add.image(400, 300, "sky");

 // emmit particles from logo
    const emitter = this.add.particles(0, 0, "hoja", {
      speed: 50,
      scale: { start: 0.3, end: 0 },
      //blendMode: "ADD",
    });

    //crea la pelota
    this.pelota = this.physics.add.image(400, 100, "pelota");
    this.pelota.setVelocity(100, 200);
    this.pelota.setBounce(1, 1);
    this.pelota.setCollideWorldBounds(true);
    emitter.startFollow(this.pelota);
  
// crear la pala
  this.pala = this.physics.add.image(400, 550, "pala");
  this.pala.setImmovable(true);   /// para que al colisionar  no se mueva de su lugar
  this.pala.body.setAllowGravity(false); /// desactivar la gravedad
  
  /// crear el obstaculo
  this.bamboo = this.physics.add.image( 200, 350, "bamboo");
  this.bamboo.body.setAllowGravity(false);
  this.bamboo.setImmovable(true);


  this.physics.add.collider(this.pelota, this.pala);  ///establece colision entre la pala y la pelota
  this.physics.add.collider(this.pelota, this.bamboo, this.romperbamboo); /// establece colicion entre la peloto y el obstaculo
 
    

}

  update() {
    // update game objects
 ////movimiento de la pala con el mouse
    this.pala.x = this.input.activePointer.x;
  } 

  romperbamboo (pelota,bamboo) {
    bamboo.destroy();
  }
}


