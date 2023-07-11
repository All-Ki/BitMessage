import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public messages : any = [];
  goToDiscussionList(){
    console.log('goToDiscussionList');
    this.navCtrl.navigateForward('/home');
  }
  constructor(public navCtrl: NavController) {
  this.messages = [
    {
      id: 1,
      text : 'Hello',
      date : '2019-01-01',
    },
    {
      id: 2,
      text : 'Hi',
      date : '2019-01-01',
    },
    {
      id: 3,
      text : 'How are you?',
      date : '2019-01-01',
    },
    {
      id: 4,
      text : 'I am fine',
      date : '2019-01-01',
    },
    {
      id: 5,
      text : 'What about you?',
      date : '2019-01-01',
    },
    {
      id: 6,
      text : 'I am fine too',
      date : '2019-01-01',
    },
    {
      id: 7,
      text : 'What are you doing?',
      date : '2019-01-01',
    },
    {
      id: 8,
      text : 'I am learning Ionic',
      date : '2019-01-01',
    },
    {
      id: 9,
      text : 'What about you?',
      date : '2019-01-01',
    },
    {
      id: 10,
      text : 'I am learning Ionic too',
      date : '2019-01-01',
    },
    {
      id: 11,
      text : 'What is Ionic?',
      date : '2019-01-01',
    },
    {
      id: 12,
      text : 'Ionic is a framework for building mobile apps',
      date : '2019-01-01',
    },
    {
      id: 13,
      text : 'What is a framework?',
      date : '2019-01-01',
    },
    {
      id: 14,
      text : 'A framework is a set of tools that help you build apps',
      date : '2019-01-01',
    },
    {
      id: 15,
      text : 'What are the tools?',
      date : '2019-01-01',
    },
    {
      id: 16,
      text : 'Ionic uses HTML, CSS, and JavaScript',
      date : '2019-01-01',
    },
    {
      id: 17,
      text : 'What is HTML?',
      date : '2019-01-01',
    },
    {
      id: 18,
      text : 'HTML is a markup language',
      date : '2019-01-01',
    },
    {
      id: 19,
      text : 'What is a markup language?',
      date : '2019-01-01',
    },
    {
      id: 20,
      text : 'A markup language is a way to add structure to text',
      date : '2019-01-01',
    },
    {
      id: 21,
      text : 'What is CSS?',
      date : '2019-01-01',
    },

  ];

  }


  ngOnInit() {
  }

}
