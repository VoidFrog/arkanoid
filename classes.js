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
        this.selected_bricks_now = []
        this.real_time_selection_start = false

        this.field_on = null;

        this.sprites = []

        this.delete_bricks = false
        this.brick_deletion()
    }

    real_time_field_selection_highlight(){
        let _this = this
        window.addEventListener('mousedown', function(e){
            _this.selected_bricks_now = []
            _this.real_time_selection_start = true
        })

        window.addEventListener('mousemove', function(e){
            if(_this.real_time_selection_start == true){

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

                _this.selected_bricks_now = []
                while(x <= x_end){
                    let pos_x = x * grid.horizontal_spacing 

                    while(y <= y_end){
                        let pos_y = y * grid.vertical_spacing

                        let coordinates = {
                            x: pos_x,
                            y: pos_y
                        }
 
                        _this.selected_bricks_now.push(coordinates)
                        y += 1
                    }
                    y = y_copy
                    x += 1
                }

            }
        
            
        })

        window.addEventListener('mouseup', function(e){
            _this.selected_bricks_now = []
            _this.real_time_selection_start = false 
        })
    }

    brick_deletion(){
        let _this = this
        
        window.addEventListener('keydown', function(e){
            let key = e.code
            console.log(key)

            if(key == 'Delete'){
                _this.delete_bricks = true
            }
        })

        window.addEventListener('keyup', function(e){
            _this.delete_bricks = false
        })
    }

    create_brick(){
        let _this = this
        let x_canvas_offset = 700
        let y_canvas_offset = 40


        //adding single brick
        window.addEventListener('click', function(e){     
            //offset is canvas positioning relative to the left corner
            let x = e.pageX - x_canvas_offset
            let y = e.pageY - y_canvas_offset

            console.log(x,y, 'asdasd', e.pageX, e.pageY)

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

            if(_this.delete_bricks == true){
                for(let i in _this.bricks){
                    if(_this.bricks[i].x == coordinates.x && _this.bricks[i].y == coordinates.y){
                        _this.bricks.splice(i, 1)
                    }
                }
                for(let j in _this.sprites){
                    if(_this.sprites[j].dx == coordinates.x && _this.sprites[j].dy == coordinates.y){
                        _this.sprites.splice(j, 1)
                    }
                }
            }
            
        })

        //field real time selection highlighting
        this.real_time_field_selection_highlight(x_canvas_offset, y_canvas_offset)

        //field selection
        window.addEventListener('mousedown', function(e){
            _this.field_x_start = e.pageX - x_canvas_offset
            _this.field_y_start = e.pageY - y_canvas_offset

            _this.field_x_end = e.pageX - x_canvas_offset
            _this.field_y_end = e.pageY - y_canvas_offset

            _this.field_on = true 
        })
        window.addEventListener('mousemove', function(e){
            _this.field_x_end = e.pageX - x_canvas_offset
            _this.field_y_end = e.pageY - y_canvas_offset

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

                    if(_this.delete_bricks == true){
                        for(let i in _this.bricks){
                            if(_this.bricks[i].x == coordinates.x && _this.bricks[i].y == coordinates.y){
                                _this.bricks.splice(i, 1)
                            }
                        }
                        for(let j in _this.sprites){
                            if(_this.sprites[j].dx == coordinates.x && _this.sprites[j].dy == coordinates.y){
                                _this.sprites.splice(j, 1)
                            }
                        }
                    }

                    y += 1
                }
                y = y_copy
                x += 1
            }
        
            
        })

    }

    draw_selected_bricks(){
        for(let brick of this.bricks){
            ctx.fillStyle = "rgba(97, 21, 143, 0.38)"
            ctx.fillRect(brick.x, brick.y, this.width, this.height)
        }

        for(let brick of this.selected_bricks_now){
            ctx.fillStyle = "rgba(155, 33, 183, 0.4)"
            ctx.fillRect(brick.x, brick.y, this.width, this.height)
        }
    }

    create_sprites(){
        let current_sprite = sprite_loader.selected_sprite


        for(let index in this.bricks){
            let sprite = this.bricks[index]

            sprite.img = current_sprite.img
            sprite.dx = sprite.x
            sprite.dy = sprite.y
            
            sprite.x = current_sprite.x
            sprite.y = current_sprite.y
            sprite.width = current_sprite.width
            sprite.height = current_sprite.height
            sprite.dWidth = this.width
            sprite.dHeight = this.height

            this.sprites.push(sprite)
        }

        this.bricks = []
    }

    draw_sprites(){
        for(let sprite of this.sprites){
            ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height, sprite.dx, sprite.dy, sprite.dWidth, sprite.dHeight)
        }
    }

    draw_field(){
        let width = this.field_x_end - this.field_x_start 
        let height = this.field_y_end - this.field_y_start

        console.log(this.field_x_start, this.field_y_start, width, height, "jebanie")
        ctx.fillStyle = "rgba(249,215,28, 0.3)"
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

class SpriteLoader {
    constructor(){
        this.sprites = []
        this.map_creator_sprites()
        this.enable_sprite_selection()
        
        this.selected_sprite_number = null
        this.selected_sprite = null
    }

    //adds sprite to sprite list
    //img, coordinates on spritesheet, width and height on spritesheet
    //dx, dy are destination coordinates on canvas, same with dWidth and dHeight
    add_sprite(image, x, y, width, height, dx, dy, dWidth, dHeight){
        let sprite = {
            img: image,
            x: x,
            y: y,
            width: width,
            height: height,
            dx: dx,
            dy: dy,
            dWidth: dWidth,
            dHeight: dHeight
        }

        this.sprites.push(sprite)
    }

    map_creator_sprites(){
        //before adding sprite add offset to position relative to div

        //all blocks from spritesheet
        let width = 100
        let height = 50
        
        let horizontal_step = 10
        let vertical_step = 5


        for(let j = 0; j < 3; j++){
            let y_pos = 216 + vertical_step*j

            for(let i = 0; i < 5; i++){
                let x_pos = 5 + horizontal_step * i
    
                this.add_sprite(spritesheet, x_pos, y_pos, 8, 4, width*i + 2, height*j + 25, width, height)
            }
        }
        
    }

    render_sprites(){
        for(let sprite of this.sprites){
            display_ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height, sprite.dx, sprite.dy, sprite.dWidth, sprite.dHeight)
        }
    }

    enable_sprite_selection(){
        let _this = this

        block_display.addEventListener('click', function(e){
            let x = e.pageX
            let y = e.pageY;

            _this.sprite_selection(x, y)
        })

        window.addEventListener('mousemove', function(e){
            if(e.pageX > block_display.width){
                _this.selected_sprite_number = null
            }
        })
    }

    sprite_selection(client_x, client_y){
        let num = 0 
        for(let sprite of this.sprites){           
            if(sprite.dx <= client_x && sprite.dx + sprite.dWidth >= client_x && sprite.dy <= client_y && sprite.dy + sprite.dHeight >= client_y){
                console.log('sprite clicked', num)

                this.selected_sprite_number = num
            }
            num += 1
        }

        this.selected_sprite = this.sprites[this.selected_sprite_number]
        
        if(this.selected_sprite != null){
            bricks.create_sprites()
        }
    }

    highlight_selected_block(){
        if(this.selected_sprite_number != null){
            let selected_sprite = this.sprites[this.selected_sprite_number]

            let border_x = selected_sprite.dx - 3
            let border_y = selected_sprite.dy
            let border_width = selected_sprite.dWidth 
            let border_height = selected_sprite.dHeight
            
            display_ctx.beginPath()
            display_ctx.strokeStyle = "rgba(255, 97, 129, 1)"
            display_ctx.lineWidth = 5
            display_ctx.rect(border_x, border_y, border_width, border_height)
            display_ctx.stroke()
        }
    }

}

