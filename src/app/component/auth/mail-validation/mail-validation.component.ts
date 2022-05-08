import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-validation',
  templateUrl: './mail-validation.component.html',
  styleUrls: ['./mail-validation.component.scss']
})
export class MailValidationComponent implements OnInit {
  val: any
  submited=false
  isLoading=false
  constructor() { }

  ngOnInit(): void {
  }
  submit(){

  }
}
