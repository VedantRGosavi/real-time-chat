import { Store, Chat, UserId } from "./store/Store";

let  globalChatId = 0;

export interface Room {
    roomId: string;
    chats: Chat[];
}

export class InMemoryStore implements Store { //for now in memory store
    private store: Map<string,Room>;
    
    constructor() {
        this.store = new Map<string,Room>()
    } // functions here are :
    
    initRoom(roomId: string){
        this.store.set(roomId, {
            roomId,
            chats:[]
        });

    }
    //If last 50 chats => limit = 50, offset = 0
    // next 50 chats =>> limit = 50, offset = 50
    getChats(roomId : string, limit: number, offset:number){
        const room = this.store.get(roomId);
        if(!room){
            return [];
        }
        return room.chats.reverse().slice(0, offset).slice(-1 * limit) //returning last limit(=>50) chats
    }

    addChat(userId: UserId, name : string, roomId: string, message: string){
        const room = this.store.get(roomId);
        if(!room){
            return [];
        }
        room.chats.push({
            id: (globalChatId++).toString(),
            userId,
            name,
            message,
            upvotes: []
        })
    }

    upvote(userId: UserId, roomId:string, chatId:string) {
        const room = this.store.get(roomId);
        if(!room){
            return [];
        }
        // To do make this faster
        const chat = room.chats.find(({id})=> id === chatId);
        if(chat){
            //if chat is found
            chat.upvotes.push(userId);
        }    
    
    }
}