
import axios from 'axios';
import React, { useState, useRef } from 'react';
import './Scss/ChatWidget.scss';

const predefinedQuestions = [
    {
        question: 'Thông tin về sản phẩm A?',
        answer: 'Sản phẩm A là một sản phẩm chất lượng cao với các tính năng ưu việt như...',
    },
    {
        question: 'Thông tin về sản phẩm A?',
        answer: 'Sản phẩm A là một sản phẩm chất lượng cao với các tính năng ưu việt như...',
    },
    {
        question: 'Thông tin về sản phẩm A?',
        answer: 'Sản phẩm A là một sản phẩm chất lượng cao với các tính năng ưu việt như...',
    },
    {
        question: 'Thông tin về sản phẩm A?',
        answer: 'Sản phẩm A là một sản phẩm chất lượng cao với các tính năng ưu việt như...',
    },
    {
        question: 'Thông tin về sản phẩm A?',
        answer: 'Sản phẩm A là một sản phẩm chất lượng cao với các tính năng ưu việt như...',
    },
    {
        question: 'Thông tin về sản phẩm A?',
        answer: 'Sản phẩm A là một sản phẩm chất lượng cao với các tính năng ưu việt như...',
    },
    {
        question: 'Thông tin về sản phẩm A?',
        answer: 'Sản phẩm A là một sản phẩm chất lượng cao với các tính năng ưu việt như...',
    },
   
];


const ChatWidget = () => {
        const [messages, setMessages] = useState([{ text: 'Xin chào, tôi có thể giúp gì cho bạn?', sender: 'bot' }]);
    const [input, setInput] = useState('');
    const [isExpanded, setExpanded] = useState(false);
    const chatRef = useRef(null);
    const [isDragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 20 });

    const handlePredefinedQuestion = (question) => {
        const answer = predefinedQuestions.find((item) => item.question === question);
        if (answer) {
            setMessages([...messages, { text: question, sender: 'user' }, { text: answer.answer, sender: 'bot' }]);
        }
    };

   
    const handleSend = async () => {
        if (input.trim() === '') return;
        const newMessages = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages);
        try {
            const response = await axios.get('http://localhost:8080/cageshop/api/chat', {
                params: {
                    prompt: input,
                },
            });
            console.log('API Response:', response.data); // Log the API response
            const result = response.data;
            console.log('Bot Response:', result); // Log the bot response
            setMessages([...newMessages, { text: result, sender: 'bot' }]);
        } catch (error) {
            console.error('Error fetching response: ', error);
        }
        setInput(''); // Clear the input after sending the message
    };
    

    const handleChatClick = () => {
        if (!isDragging) {
            if (!isExpanded) {
                setExpanded(true);
            }
        }
    };
    

    const handleMouseDown = (e) => {
        if (chatRef.current && e.target === chatRef.current) {
            setDragging(true);
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = position.x + e.movementX;
            const newY = position.y + e.movementY;
            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setDragging(false);
        }
    };
    
     const handleClose = () => {
        setExpanded(false);
    };


    return (
        <div
            className={`chat-widget ${isExpanded ? 'expanded' : ''}`}

            onClick={handleChatClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={chatRef}
            style={{ bottom: `${position.y}px`, right: `${position.x}px` }}
        >
            <div className="close-button" onClick={handleClose}> x</div>
            <div className="chat-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="predefined-questions">
                {predefinedQuestions.map((item, index) => (
                    <div key={index} className="predefined-question" onClick={() => handlePredefinedQuestion(item.question)}>
                        {item.question}
                    </div>
                ))}
            </div>
          
            <div className="input-container" style={{ display: isExpanded ? 'flex' : 'none' }}>
                <input
                    className="input-box"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button className="send-button" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWidget;