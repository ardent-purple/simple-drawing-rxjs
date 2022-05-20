interface CanvasProps {
  width: number
  height: number
  clearColor?: CanvasFillStrokeStyles['fillStyle']
  lineColor?: CanvasFillStrokeStyles['strokeStyle']
  lineWidth?: number
}

export default class Canvas {
  public width: number
  public height: number
  public clearColor: CanvasFillStrokeStyles['fillStyle']
  public lineColor: CanvasFillStrokeStyles['strokeStyle']
  public lineWidth: number

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor({
    width,
    height,
    clearColor = 'black',
    lineColor = 'white',
    lineWidth = 5,
  }: CanvasProps) {
    this.lineColor = lineColor
    this.clearColor = clearColor
    this.width = width
    this.height = height
    this.lineWidth = lineWidth

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!

    this.ctx.fillStyle = this.clearColor
    this.ctx.strokeStyle = this.lineColor
    this.ctx.lineWidth = 3
    this.ctx.lineCap = 'round'

    this.resize()
    this.clearCanvas()
  }

  get element() {
    return this.canvas
  }

  resize() {
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  clearCanvas() {
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = this.lineColor
    this.ctx.lineWidth = this.lineWidth
    this.ctx.lineCap = 'round'
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }
}
