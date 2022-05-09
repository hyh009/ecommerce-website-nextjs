export type InputTypes = 
    "button" | "checkbox"| "color"| "date"| "datetime-local"| "email"| "file"| "hidden"|
    "image"| "month"|  "number"| "password"| "radio"| "range"| "reset"| "search"| "submit"|
    "tel"| "text"| "time"| "url"| "week"


export interface ForwardRefProps {
        href?:string;
        onClick?:React.MouseEventHandler<HTMLAnchorElement>
      }

export interface Message {
  message:string;
}