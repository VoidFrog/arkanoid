let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let paddle = new Paddle()
let grid = new Grid()
let bricks = new Brick()

let render = setInterval(draw, 5)