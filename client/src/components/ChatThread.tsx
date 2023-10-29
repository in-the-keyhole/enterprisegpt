import React from "react";
import {  MdArrowDownward, MdArrowUpward  } from "react-icons/md";


interface ThreadProps {
  upVisible: boolean;
  downVisible: boolean;
  up: any;
  down: any;
}



export const ChatThread: React.FC<ThreadProps> = ({ upVisible, downVisible,up, down }) => {
 
    const u = upVisible ?  <MdArrowUpward onClick={ ()=>up() } /> : <span>{' '}</span>; 
    const d = downVisible ?  <MdArrowDownward onClick={ ()=>down() }  /> : <span>{' ' }</span>;


return <>  {d} {u}  </> ;
}


export default ChatThread;