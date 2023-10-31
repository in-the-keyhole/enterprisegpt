import React from "react";
import {  MdArrowDownward, MdArrowUpward, MdList } from "react-icons/md";


interface ThreadProps {
  upVisible: boolean;
  downVisible: boolean;
  up: any;
  down: any;
  prompts: any;
}



export const ChatThread: React.FC<ThreadProps> = ({ upVisible, downVisible,up, down, prompts }) => {
 
    const u = upVisible ?  <MdArrowUpward onClick={ ()=>up() } /> : <span>{"  "}</span>; 
    const d = downVisible ?  <MdArrowDownward onClick={ ()=>down() }  /> : <span>{" "}</span>;


return <> <MdList onClick = { ()=>prompts() }  /> {d} {u}  </> ;
}


export default ChatThread;