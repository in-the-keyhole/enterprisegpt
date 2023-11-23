export enum StoreStatus {
    IDLE = 'IDLE',
    ERROR = 'ERROR',
    LOADING = 'LOADING',
    COMPLETE = 'COMPLETE'
}

export interface ChatSession {
    id: string;
    messages: ChatSessionMessage[];
    bookmarked: boolean;
    createdDate: Date;
}

export interface ChatSessionMessage {
    id: string;
    text: string;
    response?: string;
    createdDate: Date;
}
