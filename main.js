"use strict";

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

canvas.width = window.innerWidth/2
canvas.height = window.innerHeight/1.2
let paddle = new Paddle()
let grid = new Grid()
let bricks = new Brick()

let render = setInterval(draw, 5)