window.addEventListener("load", function () {
  p = console.log
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  const CANVAS_WIDTH = canvas.width = innerWidth
  const CANVAS_HEIGHT = canvas.height = 300
  let gameFrame = 0
  let travel_distance = 0
  let SCORE = 0

  const COIN_PATTERN =[
    [
["*","*","*","","*","","*","","","","*","","","","","*","","",""],


["*","","*","","*","","*","","","","*","","","","*","","*","",""],


["*","*","*","","*","","*","","","","*","","","*","","","","*",""],


["*","","","","*","","*","","*","","*","","","*","*","*","*","*",""],


["*","","","","*","","*","","*","","*","","","*","","","","*",""],


["*","","","","*","*","*","","*","*","*","","","*","","","","*",""]
],

[["*","*","*","*","*","*"]],
[
  ["*","*","*","*","*","*"],
  ["*","*","*","*","*","*"]
  
],

[
  ["*","","*","","*"]
  ],
  
  [
    ["*","*","*"]
    ]

]

function showText (text,x,y,fontSize){
  ctx.fillStyle = "white"
  ctx.font = `${fontSize}px Bangers`
  ctx.fillText(text,x,y)
}
const IMAGES = {
    PLAYER_RUNNING_IMG: document.getElementById('running-image'),
    PLAYER_FLYING_IMG: document.getElementById('flying-image'),
    OBSTACLE : document.getElementById('obstacle'),
    BULLET : document.getElementById('fire-bullet'),
    COIN_IMG: [],
    BACKGROUND_IMG: [],
    MACHINE_IMG: [],
    ROBO_RUN_RIGHT_IMG : [],
    ROBO_DEAD_LEFT_IMG : [],
    ROBO_DEAD_RIGHT_IMG : [],
    ROBO_RUN_LEFT_IMG : [],
    SKELETON : [],
    SAW : [],
    BAT : [document.getElementById('bat1'),
    document.getElementById('bat2')
    ],
    INIT() {
      for (let i = 0; i < 18; ++i) {
        if (i <= 3) {
          this.BACKGROUND_IMG.push(document.getElementById(`layer${i+1}`))
        }
        
        if (i<=5){
          this.SAW.push(document.getElementById(`saw${i+1}`))
        }
       
       if (i<=7){
         this.ROBO_DEAD_LEFT_IMG.push(document.getElementById(`dl${i+1}`))
         this.ROBO_DEAD_RIGHT_IMG.push(document.getElementById(`dr${i+1}`))
       }
       if (i <= 9) {
          this.COIN_IMG.push(document.getElementById(`coin${i+1}`))
        }
        
        if (i<=14){
          this.SKELETON.push(document.getElementById(`skeleton${i}`))
        }
      this.ROBO_RUN_RIGHT_IMG.push(document.getElementById(`right${i+1}`))
      this.ROBO_RUN_LEFT_IMG.push(document.getElementById(`left${i+1}`))
      }
      
    }
  }
  
  
  class Saw {
    constructor (game){
      this.game = game 
      this.width = 30 
      this.height = 30 
      this.x = (Math.random()*game.canvas_width) + game.canvas_width
      this.y = game.player.groundY+this.width
      this.velX = -2
      this.imgW = 274 / 8
      this.imgH = 144 / 8
      this.indx = 0 
      this.maxIndx = 4 
      this.staggerFrame = 5
      this.markForDeletion = false 
    }
    
    draw (context) {
      context.fillStyle = 'rgba(0,0,0,0)'
      context.fillRect(this.x,this.y,this.width,this.height)
      this.saw_animation(context)
      this.update()
    }
    
    update () {
      if (this.x < -this.imgW){
        this.markForDeletion = true
      }
      this.x += this.velX
    }
    
    saw_animation (context) {
      context.drawImage(IMAGES.SAW[this.indx],this.x,this.y,this.imgW,this.imgH)
      if (!(gameFrame%this.staggerFrame)){
       (this.indx>this.maxIndx)?this.indx=0
       : this.indx++
      }
    }
  }
  
/*  class Bee {
    constructor (game){
      this.game = game 
      this.width = 5
      this.height = 5
      this.x = -this.width 
      this.y = Math.random()*(game.canvas_height*0.8)
      this.velX = 1.5
      this.velY = (Math.random()>0.5) ? -1:1
      this.indx = 0 
      this.maxIndx = 13
      this.staggerFrame = 1
      this.imgW = 266/12
      this.imgH = 207/12
      this.markForDeletion = false
    }
    
    draw (context)  {
      context.fillStyle = "yellow"
      context.fillRect(this.x,this.y,this.width,this.height)
      this.animation (context)
      this.update()
    }
    
     update () {
      if (this.x > this.game.canvas_width+this.width){
        this.markForDeletion = true
      }
      this.x += this.velX
      this.y += this.velY
      this.velY =(Math.random()>0.5)?-0.5:0.5
    }
    
    animation (context) {
      context.drawImage(IMAGES.SKELETON[this.indx],this.x,this.y,this.imgW,this.imgH)
      if (!(gameFrame%this.staggerFrame))
        (this.indx>this.maxIndx) ? this.indx=0:this.indx++
      
    }
    
  }*/
  
  
  class Bat {
    constructor (game) {
      this.game = game 
      this.width = 30
      this.height = 30
      this.x = game.canvas_width+this.width
      this.y = Math.random()*(game.canvas_height*0.8)
      this.indx = 0 
      this.maxIndx = 0 
      this.staggerFrame = 10
      this.velX = -2.5
      this.velY = (Math.random()>0.5)?-0.1:0.1
      this.imgW = 492/13
      this.imgH = 409/13
      this.requestAnimationFrame = false
    }
    
    draw (context)  {
      context.fillStyle = "rgba(0,0,0,0)"
      context.fillRect(this.x,this.y,this.width,this.height)
      this.animation (context)
      this.update()
    }
    
    update () {
      if (this.x < -this.width){
        this.markForDeletion = true
      }
      this.x += this.velX
      this.y += this.velY 
      this.velY = (Math.random()>0.5)?-0.3:0.3
    }
    
    animation (context) {
      context.drawImage(IMAGES.BAT[this.indx],this.x,this.y,this.imgW,this.imgH)
      if (!(gameFrame%this.staggerFrame)){
        (this.indx>this.maxIndx) ? this.indx=0:this.indx++
      }
    }
  }
  


// class for bots 

  class Bot {
    constructor (game){
      this.game = game 
      this.width = 25
      this.height = 40
      this.x = game.canvas_width+this.width
      this.y = game.player.groundY 
      this.left_boundary = -this.width 
      this.right_boundary = game.canvas_width+ 50
      this.velX = Math.random()* (-3)
      this.IMG = (Math.random()>0.5) ? IMAGES.ROBO_RUN_LEFT_IMG : IMAGES.ROBO_RUN_RIGHT_IMG
      this.indx = 0 
      this.maxIndx = 16
      this.staggerFrame = 5
      this.ox = 22
      this.oy = 12
      this.imgW = 796/9
      this.imgH = 719/9
      let flee = Math.random()
      this.flee = (flee>0.5) ? flee : 0.75
      this.markForDeletion = false 
      this.bullet_impact = false
    }
    
    draw (context) {
      context.fillStyle = "rgba(0,0,0,0)"
      context.fillRect(this.x,this.y,this.width,this.height)
      this.animation(context)
      this.update()
    }
    
    update () {
      if (this.x < this.left_boundary || this.x > this.right_boundary){
        this.markForDeletion = true
      }
      if (this.x<(game.canvas_width*this.flee) && game.mouseEvent && this.IMG == IMAGES.ROBO_RUN_LEFT_IMG) {
        this.velX = Math.random()*1.2
        this.IMG = IMAGES.ROBO_RUN_RIGHT_IMG
        this.indx = 0
      }
      this.x += this.velX
    }
    
    animation (context) {
      context.drawImage(this.IMG[this.indx],this.x-this.ox,this.y-this.oy,this.imgW,this.imgH)
      if (this.maxIndx == 6){
      if (!(gameFrame%this.staggerFrame)){
      (this.indx>this.maxIndx)?context.drawImage(this.IMG[this.IMG.length-1],this.x-this.ox,this.y-this.oy,this.imgW,this.imgH):this.indx++
      }
      
      }else {
      if (!(gameFrame%this.staggerFrame)){
      (this.indx>this.maxIndx)?this.indx=0
      : this.indx++
      }
     }
    }
    
    dead_animation() {
       if (this.IMG == IMAGES.ROBO_RUN_RIGHT_IMG)
        this.IMG = IMAGES.ROBO_DEAD_RIGHT_IMG
        if (this.IMG == IMAGES.ROBO_RUN_LEFT_IMG)
        this.IMG = IMAGES.ROBO_DEAD_LEFT_IMG
        this.indx = 0
        this.maxIndx = 6
      
    }
    
  }


  class Coin {

    constructor(game, x, y, offsetY) {
      this.game = game
      this.x = x + game.canvas_width
      this.y = y + offsetY
      this.width = 30
      this.height = 30
      this.velX = -1
      this.velY = 0
      this.markForDeletion = false
      this.indx = 0
      this.maxIndx = 8
      this.staggerFrame = 5
      this.coinSize = 20
    }

    draw(context) {
      context.fillStyle = "rgba(0,0,0,0)"
      context.fillRect(this.x, this.y, this.width, this.height)
      context.drawImage (IMAGES.COIN_IMG[this.indx], this.x, this.y, this.coinSize,this.coinSize)
      if (!(gameFrame%this.staggerFrame))
        (this.indx > this.maxIndx) ? this.indx = 0: this.indx++
      this.update()
    }

    update() {
      if (this.x < -this.width || this.y < -this.height) {
        this.markForDeletion = true
      }

      this.x += this.velX
      this.y += this.velY

    }
  }
  // Game related images

  
  IMAGES.INIT()

  // control class

  class Control {
    constructor (game) {
      this.game = game
      window.addEventListener ('touchstart', event=> this.game.mouseEvent = true)
      window.addEventListener ('touchend', event=> this.game.mouseEvent = false)
    }
  }

// class flying obstacle

/*class Obstacle {
  constructor (game){
    this.game = game 
    this.width = 15
    let height = (Math.floor(Math.random()*game.canvas_height)) - 80
    this.height = (height > 50 ) ? height : 80
    this.x = (Math.random()*game.canvas_width)+game.canvas_width
    let y = Math.random()*(game.canvas_height)
    this.y = (y>game.canvas_height*0.79) ? game.canvas_height/2 : y 
    this.velX = -1
    this.markForDeletion = false
  }
  
  draw (context) {
    context.fillStyle = "green" 
    context.fillRect(this.x,this.y,this.width,this.height)
    context.drawImage(IMAGES.OBSTACLE,this.x,this.y,this.width,this.height)
    this.update()
  }
  
  update () {
    if (this.x < -this.width)
      this.markForDeletion = true 
    
    this.x += this.velX
  }
}*/

  // player class

  class Player {
    constructor(game, x, y) {
      this.game = game
      this.x = x
      this.y = y
      this.groundY = y
      this.width = 30
      this.height = 50
      this.velY = 0
      this.velX = 0.5
      this.stop_position = 90
    }

    draw(context) {
      context.fillStyle = "rgba(0,0,0,0)"
      context.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
      if (this.x > this.stop_position) {
        this.velX = 0
        this.game.scrolling_speed = 2
        this.game.can_add_object = true
      }
      if (this.y+this.width >= this.groundY-this.velY) {
        this.velY = 0
      }
      (this.game.mouseEvent && this.y+this.y >= 0) ? this.velY = -4: this.velY = 0
      if (!this.game.mouseEvent && this.y < this.groundY)this.velY = 3

      this.y += this.velY
      this.x += this.velX
    }
  }

  class Layer {
    static width = 1768/1.5
    static height = 500/1.5
    constructor (game, image, speedModifier) {
      this.game = game
      this.image = image
      this.speedModifier = speedModifier
      this.x = 0
      this.y = 0
      this.width = 1768
      this.height = 500
    }

    update () {
      if (this.x <= -this.width)this.x = 0
      this.x -= this.game.scrolling_speed*this.speedModifier
    }

    draw (context) {
      context.drawImage(this.image, this.x, this.y, Layer.width, Layer.height)
      context.drawImage(this.image, this.x+Layer.width, this.y, Layer.width, Layer.height)
      this.update()
    }
  }

  class Background {
    constructor (game) {
      this.game = game
      this.layers = [
        new Layer (this.game, IMAGES.BACKGROUND_IMG[0], 0.2),
        new Layer (this.game, IMAGES.BACKGROUND_IMG[1], 0.4),
        new Layer (this.game, IMAGES.BACKGROUND_IMG[2], 1),
        new Layer (this.game, IMAGES.BACKGROUND_IMG[3], 1.3)
      ]
    }
    update(context) {
      this.layers.forEach(layer => layer.draw(context))
    }

  }

  /* ALL GAME RELATED ANIMATION'S IS CONTROLLED BY THIS ANIMATION CLASS */

  class ANIMATION {

    constructor (game) {
      this.game = game
      this.playerImgInfo = {
        w: 692,
        h: 599,
        rfx: 0,
        rfy: 0,
        rmfx: 3,
        rmfy: 1,
        ffx: 0,
        ffy: 0,
        fmfx: 3,
        imgW: 69.2,
        imgH: 59.9,
        ox: 25,
        staggerFrame: 5
      }

    }

    PLAYER_ANIMATION () {
      const pf = this.playerImgInfo
      const p = this.game.player
      if (p.y < p.groundY) {
        this.game.ctx.drawImage(IMAGES.PLAYER_FLYING_IMG, pf.w*pf.ffx, pf.h*pf.ffy, pf.w, pf.h, p.x-pf.ox, p.y, pf.imgW, pf.imgH)
        if (!(gameFrame%pf.staggerFrame)) {
          (pf.ffx > pf.fmfx) ? pf.ffx = 0: pf.ffx++
        }
      } else if (p.velY == 0) {
        this.game.ctx.drawImage(IMAGES.PLAYER_RUNNING_IMG, pf.w*pf.rfx, pf.h*pf.rfy, pf.w, pf.h, p.x-pf.ox, p.y, pf.imgW, pf.imgH)
        if (!(gameFrame%pf.staggerFrame)) {
          (pf.rfx > pf.rmfx) ? pf.rfx = 0: pf.rfx++
        }
      }
    }


  }

  // Project tile class


  class Bullet {
    constructor (game, x, y) {
      this.game = game
      this.x = x+(Math.random()*(game.player.width*0.5))
      this.y = y + game.player.height
      this.width = 5
      this.height = 5
      this.markForDeletion = false
      this.velY = 10
      this.imgSize = 3264/60
      this.ox = 16 
      this.oy = 4
      
    }

    draw (context) {
      context.fillStyle = "rgba(0,0,0,0)"
      context.fillRect(this.x, this.y, this.width, this.height)
      context.drawImage (IMAGES.BULLET,this.x-this.ox,this.y-this.oy,this.imgSize,this.imgSize)
      this.update()
    }

    update () {
      if (this.y > this.game.player.groundY)
        this.markForDeletion = true
      this.y += this.velY
    }
  }

  /* Everything of this game is controlled by this class.*/
  class Game {
    constructor (ctx, canvas_width, canvas_height) {
      this.ctx = ctx
      this.canvas_width = canvas_width
      this.canvas_height = canvas_height
      this.player = new Player(this, -40, canvas_height*0.79)
      this.scrolling_speed = 0
      this.mouseEvent = false 
      this.can_add_object = false
      this.background = new Background(this)
      this.control = new Control(this)
      this.animation = new ANIMATION(this)
      this.bullets = []
      this.bullet_staggerFrame = 5
      this.coins = []
     // this.obstacles = []
     // this.obstacle_staggerFrame = 200
      this.bots = []
      this.bot_staggerFrame = 200
      
      this.bats = []
      this.bat_staggerFrame = 100 
      this.saws = []
      this.saw_staggerFrame = 260
    //  this.skeletons = []
     // this.skeleton_staggerFrame = 160

    }
    
    canAddObj () {
     return (this.can_add_object) ? true : false
    }
    
    addSaw() {
      if (!(gameFrame%this.saw_staggerFrame))
      this.saws.push(new Saw(this))
    }
    
    renderSaw() {
      if (this.canAddObj())
      this.addSaw() 
      this.saws.forEach(saw=>saw.draw(this.ctx))
      this.saws = this.saws.filter(saw=>!saw.markForDeletion)
    }
    
     checkForImpact() {
     this.bullets.forEach(bullet=>{
       this.bots.forEach(bot=>{
         if (this.checkForCollision(bullet,bot)){
         bullet.markForDeletion = true 
         if (!bot.bullet_impact){
         if (bot.velX>0)
            bot.velX = - bot.velX
         bot.dead_animation()
         bot.bullet_impact = true
         }
         }
       })
     })
    }
    
/*  addBee() {
      if (!(gameFrame%this.skeleton_staggerFrame))
      this.skeletons.push(new Bee(this))
    }
  renderBee() {
      this.addBee()
      this.skeletons.forEach(skeleton=>skeleton.draw(this.ctx))
      this.skeletons = this.skeletons.filter(skeleton=>!skeleton.markForDeletion)
    }*/
    
    addBats () {
     if (!(gameFrame%this.bat_staggerFrame))
        this.bats.push(new Bat(this))
    }
    
    renderBats () {
      if (this.canAddObj())
      this.addBats()
      this.bats.forEach(bat=>bat.draw(this.ctx))
      this.bats = this.bats.filter(bat=>!bat.markForDeletion)
    }
    
    addBots () {
      if (!(gameFrame%this.bot_staggerFrame))
        this.bots.push(new Bot(this))
    }
    
    renderBots () {
      if (this.canAddObj())
      this.addBots()
      this.bots.forEach(bot=>bot.draw(this.ctx))
      this.checkForImpact()
      this.bots = this.bots.filter(bot=>!bot.markForDeletion)
    }
    
/*    addObstacle () {
      if (!(gameFrame%this.obstacle_staggerFrame))
      this.obstacles.push(new Obstacle (this))
    }
    
    renderObstacle() {
      this.addObstacle()
      this.obstacles.forEach(obstacle=>obstacle.draw(this.ctx))
      this.obstacles = this.obstacles.filter(obstacle=>!obstacle.markForDeletion)
    }*/
    
    checkForCollision (obj1,obj2) {
      return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y)
    }


    renderPlayer() {
      this.player.draw(this.ctx)
      this.animation.PLAYER_ANIMATION()
      this.player.update()
    }

    renderBackground() {
      this.background.update(this.ctx)
    }

    renderBullets() {
      this.addBullets()
      this.bullets.forEach(bullet => {
        bullet.draw(this.ctx)
      })
      this.removeBullets()
    }

    addBullets() {
      if (!(gameFrame%this.bullet_staggerFrame) && this.mouseEvent)
        this.bullets.push (new Bullet (this, this.player.x, this.player.y))
    }

    removeBullets() {
      this.bullets = this.bullets.filter(bullet=>!bullet.markForDeletion)
    }
    renderCoins (coin_pattern) {
      if (!this.coins.length)
      if (this.canAddObj())
        this.addCoins(coin_pattern)
      this.coins.forEach(coin => {
        coin.draw(this.ctx)
      })
      this.updateCoin()
      this.removeCoins()
    }
    
    updateCoin () {
      this.coins.forEach (coin => {
        if (this.checkForCollision(coin,this.player))
        coin.velY = -5
        
      })
    }

    addCoins(coin_pattern) {
      let offsetY = 30
      coin_pattern.forEach((row, i)=> {
        row.forEach((symbol, j)=> {
          switch (symbol) {
            case '*':
              this.coins.push(new Coin(this, j*30, i*30,offsetY))
              break
          }
        })
      })
      offsetY = Math.random()*50
    }

    removeCoins () {
      this.coins = this.coins.filter(coin=>!coin.markForDeletion)
    }
  }


  const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)


  function animate() {
    game.renderBackground()
    game.renderSaw()
    game.renderCoins(COIN_PATTERN[Math.floor(Math.random()*COIN_PATTERN.length)])
    game.renderBots()
  //  game.renderObstacle()
    game.renderPlayer()
    game.renderBullets()
    game.renderBats()
   // game.renderBee()
   showText("SCORE : "+SCORE,20,15,20)

    gameFrame++
    requestAnimationFrame(animate)
  }
  
 // setTimeout(animate,5000)
 animate()

})