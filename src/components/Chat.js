import React, { useEffect, useState } from 'react'
import './../css/Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom'
import  {useStateValue} from './StateProvider'
import db from '../firebase'
import firebase from 'firebase'

function Chat() {

    const [seed, setSeed] = useState('')
    const [input, setInput] = useState("")
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([ ])
    const [{user}, dispatch] = useStateValue()

    useEffect(() =>{
        if(roomId){
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) =>setRoomName
                (snapshot.data().name))
            
            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp','asc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) =>
                    doc.data()))
            )
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) =>{
        e.preventDefault()
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p> Visto última vez{": "} 
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message=>(
                    <p className={`chat__message ${message.name===user.displayName && "chat__reciever"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()
                        ).toUTCString()}
                    </span>
                </p>
                ))}
                
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input 
                        value={input} 
                        onChange={(e) =>setInput(e.target.value)} 
                        type="text" 
                        placeholder="Escribe un mensaje aquí"
                    />
                    <button onClick={sendMessage} type="submit">Enviar un mensaje</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
