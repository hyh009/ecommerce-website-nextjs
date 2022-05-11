import {MdLocationOn,MdPhone,MdEmail} from "react-icons/md";
import {AiFillFacebook,AiFillInstagram,AiFillYoutube} from "react-icons/ai";

export const contact = {
    address:{
        value:"33552桃園市大溪區月湖路128號2F",
        name:"地址",
        Icon:MdLocationOn
    },
    phone:{
        value:"03 388 5688",
        name:"電話",
        Icon:MdPhone
    },
    email:{
        value:"info@pad-pad.com",
        name:"Email",
        Icon:MdEmail
    }
}

export const socialLink = [
    {
        link:"https://www.facebook.com/padpadlife/",
        Icon: AiFillFacebook,
        name: "Facebook",
        color:"#3B5999",
    },
    {
        link:"https://www.instagram.com/padpadlife/",
        Icon: AiFillInstagram,
        name: "Instagram",
        color:"#E4405F",
    },
    {
        link:"https://www.youtube.com/channel/UCOxa4vGiO0bDKqsMxSE0p3g",
        Icon: AiFillYoutube,
        name: "Youtube",
        color:"#c4302b",
    },

]