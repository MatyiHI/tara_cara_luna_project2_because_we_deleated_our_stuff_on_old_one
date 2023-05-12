namespace SpriteKind {
    export const enemyprojectile = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    scene.setBackgroundImage(assets.image`Winter_Tree_Background_Day`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    mySprite.sayText("Please restart game after music stops to reduce game breaks")
    for (let index = 0; index < 9999; index++) {
        sprites.destroyAllSpritesOfKind(SpriteKind.enemyprojectile)
        pause(5000)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`What_5`, mySprite, 100, 27)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(mySprite2)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemyprojectile)
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
    game.setGameOverMessage(true, "you WIN")
    pause(5000)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    sprites.destroy(mySprite)
    game.gameOver(false)
    game.setGameOverMessage(false, "game over")
})
sprites.onOverlap(SpriteKind.enemyprojectile, SpriteKind.Player, function (sprite, otherSprite) {
    statusbar.value += -3
    sprites.destroy(enemy_projectile, effects.trail, 1000)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    Statusbar2.value += -3
    sprites.destroy(projectile, effects.trail, 1000)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar.value = 500
    statusbar.setColor(7, 2, 3)
    statusbar.attachToSprite(mySprite)
    Statusbar2 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Statusbar2.value = 1000
    Statusbar2.attachToSprite(mySprite2)
    Statusbar2.setColor(7, 2, 3)
    mySprite.setPosition(70, 15)
    mySprite2.setPosition(66, 82)
    scene.setBackgroundImage(assets.image`Road`)
    for (let index = 0; index < 9999; index++) {
        enemy_projectile = sprites.createProjectileFromSprite(assets.image`What_4`, mySprite2, 100, 18)
        enemy_projectile.setKind(SpriteKind.enemyprojectile)
        enemy_projectile.follow(mySprite)
        pause(600)
    }
})
let Statusbar2: StatusBarSprite = null
let enemy_projectile: Sprite = null
let statusbar: StatusBarSprite = null
let projectile: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`What_3`, SpriteKind.Player)
effects.starField.startScreenEffect()
scene.setBackgroundImage(assets.image`Stage`)
game.setDialogTextColor(15)
game.showLongText("Press A to start", DialogLayout.Center)
scene.setBackgroundImage(assets.image`Winter_Tree_Background_Night`)
game.setDialogTextColor(15)
mySprite2 = sprites.create(assets.image`finalBoss`, SpriteKind.Enemy)
controller.moveSprite(mySprite, 100, 100)
mySprite.setPosition(123, 88)
mySprite.setBounceOnWall(true)
mySprite2.follow(mySprite, 50)
forever(function () {
    music.play(music.createSong(assets.song`FinalSong`), music.PlaybackMode.UntilDone)
})
