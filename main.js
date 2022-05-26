"use strict";


let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let block_display = document.getElementById('block_display')
let display_ctx = block_display.getContext('2d')
block_display.width = 500
block_display.height = window.innerHeight

let spritesheet = document.getElementById('spritesheet')

canvas.width = window.innerWidth/2
canvas.height = window.innerHeight/1.2
let paddle = new Paddle()
let grid = new Grid()
let bricks = new Brick()
let sprite_loader = new SpriteLoader()

let render = setInterval(draw, 25)
zoom_detection()
