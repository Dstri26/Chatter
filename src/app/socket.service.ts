import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket=io("http://localhost:3000");
  public contacts=[
    {
      phoneId:"1626239283",
      name:"Trideep Barik",
      imgUrl:"https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3"
    },
    {
      phoneId:"1234567890",
      name:"Ankit Acharya",
      imgUrl:"https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3" 
    },
    {
      phoneId:"9192830123",
      name:"Debadutta Pattanayak",
      imgUrl:"https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3"
    }
  ]

  constructor() { }

  getAllContacts() {
    return [...this.contacts];
  }

  getContact(phoneId: string) {
    return {
      ...this.contacts.find(contact => {
        return contact.phoneId === phoneId;
      })
    };
  }
  joinRoom(user,room){
    console.log('Inside the service')
    this.socket.emit('new_member',{
      name : user,
      room: room

    });
  }
  sendMessageClient(user,msg,room){
    this.socket.emit('new_msg',{
      msg:msg,
      name:user,
      room:room
    });
  }
  serverJoinRoom(){
    return new Observable((observer)=>{
      this.socket.on('server_new_member',(data)=>{
        observer.next(data);
      });
    });

  }
  serverNewMesssage(){
    return new Observable((observer)=>{
      this.socket.on('server_new_msg',(data)=>{
        observer.next(data);
      });
    });
  }
}
