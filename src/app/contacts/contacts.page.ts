import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts=[];
  constructor(private socket:SocketService) { }

  ngOnInit() {
    this.contacts = this.socket.getAllContacts();
  }

}
