import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';
import { Contact } from 'src/app/contact.model';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public loadedContact:Contact;
  public myphoneId:string;
  public selectedRoom:string;
  public user: string;
  public msgList:any[]=[];
  public msg:string;
  constructor(private activatedRoute: ActivatedRoute,private socket:SocketService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const phoneId = paramMap.get('phoneId');
      this.loadedContact = this.socket.getContact(phoneId);
      this.selectRoom();
    });
    this.socket.serverJoinRoom().subscribe((res)=>{
        console.log(res)
    },(err)=>{
      console.log('The Error is',err)
    });

    this.socket.serverNewMesssage().subscribe((res)=>{
      this.msgList.push(res)
  },(err)=>{
    console.log('The Error is',err)
  });
  }
  selectRoom(){
    if (this.myphoneId>this.loadedContact.phoneId) {
      this.selectedRoom=this.myphoneId+this.loadedContact.phoneId;      
    } else {
      this.selectedRoom=this.loadedContact.phoneId+this.myphoneId;
    }
    this.socket.joinRoom(this.user,this.selectedRoom);
  }
  sendMessage(){
    this.msgList.push({msg:this.msg,user:this.user})
    this.socket.sendMessageClient(this.user,this.msg,this.selectedRoom);
  }

}
