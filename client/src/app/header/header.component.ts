import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form #loginForm="ngForm">
    {{diagnostic}}
    <div class="form-group">
      <label for="name">User name</label>
      <input type="text" class="form-control" id="username"
             required
             (ngModel)="model.username" name="username">
    </div>
    <button type="submit" class="btn btn-success" (click)="sendusername()">Submit</button>
  </form>
  
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }
  open() {
    this.modalService.open(NgbdModalContent);

  }
}
