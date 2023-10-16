import React, {} from 'react';
import { MdChatBubbleOutline } from 'react-icons/md';


interface Text {

    text: string;

}


function ListComponent(props: Text ): JSX.Element {

    const [isHovered, setIsHovered] = React.useState(false);

    const formattedText = props.text.length > 20 ? props.text.substring(0,20) + "..." : props.text;

    const hovered = isHovered ?  <div className="hovered"> <i> <li>{props.text}</li> </i> </div> :  <div><MdChatBubbleOutline/>  {formattedText} </div> ;


    return <> 
    
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      
    >
       { hovered} </div>  </>;

}


export default ListComponent;