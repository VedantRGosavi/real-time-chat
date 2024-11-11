
export type UserId = string;

export interface Chat{
    id: string;
    userId: UserId; 
    name: string;
    message: string;
    upvotes: UserId[]; // who had upvoted what chat

}


export abstract class Store { //for now in memory store
    constructor() {

    } // functions here are :
    
    initRoom(roomID: string){

    }
    getChats(room : string, limit: number, offset:number){

    }

    addChat(userId: UserId, name: string, room: string, message:string){

    }

    upvote(userId: UserId, room:string, chatID:string) {

    }
}