import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() public message : String
  @Input() public isShow : Boolean

  constructor(
    private router : Router,
    ) { }

  ngOnInit(): void { }

  isShowBtn() {
    this.isShow=false
  }
}
