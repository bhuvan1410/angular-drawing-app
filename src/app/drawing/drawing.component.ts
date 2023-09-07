import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef;
  context!: CanvasRenderingContext2D;
  drawing = false;
  color = '#000000'; // Default color (black)
  lineWidth = 2;

  constructor() {}

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  onMouseDown(event: MouseEvent) {
    this.drawing = true;
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.lineWidth;
    this.context.beginPath();
    this.context.moveTo(event.clientX - this.canvas.nativeElement.offsetLeft, event.clientY - this.canvas.nativeElement.offsetTop);
  }

  onMouseMove(event: MouseEvent) {
    if (this.drawing) {
      this.context.lineTo(event.clientX - this.canvas.nativeElement.offsetLeft, event.clientY - this.canvas.nativeElement.offsetTop);
      this.context.stroke();
    }
  }

  onMouseUp() {
    this.drawing = false;
  }

  changeColor(newColor: string) {
    this.color = newColor;
  }

  erase() {
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }
}
