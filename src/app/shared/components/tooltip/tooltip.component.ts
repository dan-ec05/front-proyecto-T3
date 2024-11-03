import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  standalone: true,
  imports: [
    NgClass
  ]
})
export class tooltipComponent implements OnInit {
  @Input() tooltipPosition: "top" | "bottom" | "left" | "right" = "top";
  @Input() tooltipText: string = "";

  constructor() {}

  ngOnInit(): void {}
}