export class Message {
	id?: number;
	client_id: string = '';
	text: string = '' ;
	sender: string = "" ;
	receiver: string = "";
	date: Date = new Date();
  }