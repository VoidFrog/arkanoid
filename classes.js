"use strict";

class Paddle {
    constructor(){
        this.width = 200
        this.x = (window.innerWidth + canvas.width)/2 - this.width/2
        this.height = 20
        this.y = window.innerHeight - this.height - 110
        this.velocity = 0
        this.speed = 10
        this.controls()
    }

    create(){
        this.move()

        ctx.beginPath()
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.closePath()
    }

    controls(){
        let _this = this

        document.addEventListener('keydown', function(e){
            let key = e.code
            //console.log(key, e)

            if(key == 'KeyA'){
                _this.velocity = -_this.speed
            }
            else if(key == 'KeyD'){
                console.log("d")
                _this.velocity = _this.speed
            }

        })
        document.addEventListener('keyup', function(e){
            let key = e.code

            if(key == 'KeyA'){
                if(_this.velocity != 0){
                    _this.velocity += _this.speed
                }
            }
            else if(key == 'KeyD'){
                if(_this.velocity != 0){
                    _this.velocity -= _this.speed
                }
            }
        })
    }

    move(){
        this.velocity = ((this.velocity > this.speed) ? this.velocity = this.speed : this.velocity = this.velocity)
        this.velocity = ((this.velocity < -this.speed) ? this.velocity = -this.speed : this.velocity = this.velocity)
        
        this.x += this.velocity 
    }
}

class Brick {
    constructor(x, y){
        this.width = grid.horizontal_spacing-2
        this.height = grid.vertical_spacing-2 
        this.x = x
        this.y = y
        this.bricks = []
        this.create_brick()

        this.field_x_start;
        this.field_y_start;

        this.field_x_end;
        this.field_y_end;

        this.field_on = null;
    }

    create_brick(){
        let _this = this
        let x_canvas_offset = 250
        let y_canvas_offset = 100


        //adding single brick
        window.addEventListener('click', function(e){     
            //offset is canvas positioning relative to the left corner
            let x = e.clientX - (window.innerWidth - x_canvas_offset - canvas.width)
            let y = e.clientY - y_canvas_offset

            let horizontal_block = Math.floor(x/grid.horizontal_spacing)
            let vertical_block = Math.floor(y/grid.vertical_spacing)

            let coordinates = {
                x: horizontal_block*grid.horizontal_spacing,
                y: vertical_block*grid.vertical_spacing
            }


            let add = true
            for(let coordinate of _this.bricks){
                if(coordinate.x == coordinates.x && coordinate.y == coordinates.y){
                    add = false
                }
            }
            if(add == true){
                _this.bricks.push(coordinates)
            }
        })

        //field selection
        window.addEventListener('mousedown', function(e){
            _this.field_x_start = e.clientX - (window.innerWidth - x_canvas_offset - canvas.width)
            _this.field_y_start = e.clientY - y_canvas_offset

            _this.field_x_end = e.clientX - (window.innerWidth - x_canvas_offset - canvas.width)
            _this.field_y_end = e.clientY - y_canvas_offset

            _this.field_on = true 
        })
        window.addEventListener('mousemove', function(e){
            _this.field_x_end = e.clientX - (window.innerWidth - x_canvas_offset - canvas.width)
            _this.field_y_end = e.clientY - y_canvas_offset

        })
        window.addEventListener('mouseup', function(e){
            _this.field_on = false


            let x = _this.field_x_start
            let y = _this.field_y_start
            x = Math.floor(x/grid.horizontal_spacing)
            y = Math.floor(y/grid.vertical_spacing)
            
            let x_end = _this.field_x_end
            let y_end = _this.field_y_end 

            x_end = Math.floor(x_end/grid.horizontal_spacing)
            y_end = Math.floor(y_end/grid.vertical_spacing)

            if(x > x_end){
                console.log(x, x_end)
                let substitute = x 
                x = x_end
                x_end = substitute
                console.log(x, x_end)
            }
            if(y > y_end){
                console.log(y, y_end)
                let substitute = y 
                y = y_end
                y_end = substitute
                console.log(y, y_end)
            }

            console.log(x, x_end, y, y_end)

            let y_copy = y
            while(x <= x_end){
                let pos_x = x * grid.horizontal_spacing 

                while(y <= y_end){
                    let pos_y = y * grid.vertical_spacing

                    let coordinates = {
                        x: pos_x,
                        y: pos_y
                    }

                    let add = true
                    for(let coordinate of _this.bricks){
                        if(coordinate.x == coordinates.x && coordinate.y == coordinates.y){
                            add = false
                        }
                    }

                    if(add == true){
                        _this.bricks.push(coordinates)
                    }

                    y += 1
                }
                y = y_copy
                x += 1
            }
        
            
        })
    }

    draw_bricks(){
        for(let brick of this.bricks){
            ctx.fillStyle = "rgba(97, 21, 43, 0.38)"
            ctx.fillRect(brick.x, brick.y, this.width, this.height)
        }
    }

    draw_field(){
        let width = this.field_x_end - this.field_x_start 
        let height = this.field_y_end - this.field_y_start

        ctx.fillStyle = "rgba(25,55,155, 0.3)"
        ctx.fillRect(this.field_x_start, this.field_y_start, width, height)
    }
}

class Grid {
    constructor(){
        //pion
        this.vertical_lines = []
        this.vertical_lines_number = 30
        this.vertical_spacing = canvas.height/this.vertical_lines_number
        //poziom
        this.horizontal_lines = []
        this.horizontal_lines_number = 14
        this.horizontal_spacing = canvas.width/this.horizontal_lines_number
    }

    create_grid(){  
        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = 0.01

        for(let i = 0; i < this.horizontal_lines_number+1; i++){
            ctx.moveTo(this.horizontal_spacing*i, 0)
            ctx.lineTo(this.horizontal_spacing*i, canvas.height)
            ctx.stroke()
        }
        
        for(let i = 0; i < this.vertical_lines_number+1; i++){
            ctx.moveTo(0, this.vertical_spacing*i)
            ctx.lineTo(canvas.width, this.vertical_spacing*i)
            ctx.stroke()
        }
        for(let i = 0; i < this.vertical_lines_number+1; i++){
            ctx.moveTo(0, this.vertical_spacing*i)
            ctx.lineTo(canvas.width, this.vertical_spacing*i)
            ctx.stroke()
        }
    }
}

