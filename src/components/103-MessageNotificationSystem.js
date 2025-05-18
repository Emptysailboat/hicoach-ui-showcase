import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, Calendar, Paperclip, Send, CreditCard, User, Check, CheckCheck, X, Image, Plus } from 'lucide-react';
import PageHeader from './common/PageHeader';

// Modular Component: Tab Switcher
const TabSwitcher = ({ activeTab, onTabChange, unreadCounts }) => {
  return (
    <div className="flex border-b border-gray-200 bg-white">
      <button 
        className={`flex-1 py-3 text-sm font-medium relative ${activeTab === 'chat' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'}`}
        onClick={() => onTabChange('chat')}
      >
        Chats
        {unreadCounts.chats > 0 && (
          <span className="absolute top-2 right-1/4 bg-primary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCounts.chats}
          </span>
        )}
      </button>
      <button 
        className={`flex-1 py-3 text-sm font-medium relative ${activeTab === 'notification' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'}`}
        onClick={() => onTabChange('notification')}
      >
        Notifications
        {unreadCounts.notifications > 0 && (
          <span className="absolute top-2 right-1/4 bg-primary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCounts.notifications}
          </span>
        )}
      </button>
    </div>
  );
};

// "Mark all as read" Button
const MarkAllAsReadButton = ({ onClick, show }) => {
  if (!show) return null;
  
  return (
    <div className="bg-white px-4 py-3 border-b border-gray-200">
      <button 
        className="w-full py-2 rounded-md bg-primary-600 text-white text-sm font-medium active:bg-primary-700 active:scale-99 transition-transform"
        onClick={onClick}
      >
        Mark all as read
      </button>
    </div>
  );
};

// Modular Component: Chat List Item
const ChatListItem = ({ chat, onSelect, key }) => {
  return (
    <div 
      className="flex items-center p-3 active:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(chat)}
    >
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium flex-shrink-0">
        {chat.avatar}
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <span className="font-medium text-gray-800">{chat.name}</span>
          <span className="text-xs text-gray-500">{chat.time}</span>
        </div>
        <div className="flex items-center">
          {chat.isMessageSent && (
            <span className="mr-1">
              {chat.isMessageRead ? (
                <CheckCheck className="w-3 h-3 text-green-600" />
              ) : (
                <Check className="w-3 h-3 text-gray-400" />
              )}
            </span>
          )}
          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
        </div>
      </div>
      {chat.unread > 0 && (
        <div className="ml-2 bg-green-500 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
          {chat.unread}
        </div>
      )}
    </div>
  );
};

// Modular Component: Notification Item
const NotificationItem = ({ notification, onClick, key }) => {
  return (
    <div 
      className={`p-3 active:bg-gray-100 cursor-pointer ${!notification.read ? 'bg-green-50' : ''}`}
      onClick={() => onClick(notification.id)}
    >
      <div className="flex justify-between">
        <span className={`font-medium ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
          {notification.title}
        </span>
        <span className="text-xs text-gray-500">{notification.time}</span>
      </div>
      <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-600'}`}>
        {notification.message}
      </p>
      {!notification.read && (
        <div className="mt-1.5">
          <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            New
          </span>
        </div>
      )}
    </div>
  );
};

// Modular Component: Search Bar
const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="px-4 py-2 border-b border-gray-200">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {value && (
          <button 
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 active:text-gray-600"
            onClick={() => onChange('')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Modular Component: Chat Bubble
const ChatBubble = ({ message, isUser, time, status }) => {
  return (
    <div className={`max-w-[75%] ${isUser ? 'bg-white ml-auto' : 'bg-green-50'} rounded-lg p-3 mb-3 shadow-sm`}>
      <p className="text-sm">{message}</p>
      <div className="flex items-center justify-end mt-1">
        <span className="text-xs text-gray-500 mr-1">{time}</span>
        {isUser && status && (
          <span>
            {status === 'read' ? (
              <CheckCheck className="w-3 h-3 text-green-600" />
            ) : (
              <Check className="w-3 h-3 text-gray-400" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

// Modular Component: Lesson Detail Card
const LessonDetailCard = ({ lesson }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden border border-gray-200">
      <div className="p-2 border-l-4 border-green-500">
        <div className="flex justify-between items-start">
          <span className="font-medium text-xs text-gray-800">{lesson.title}</span>
          <span className="inline-block px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
            {lesson.status}
          </span>
        </div>
        <div className="flex items-center mt-1.5 text-xs">
          <Calendar className="w-3 h-3 text-gray-500 flex-shrink-0" />
          <span className="ml-1 text-gray-700">{lesson.schedule}</span>
        </div>
      </div>
    </div>
  );
};

// Add Attachment Menu Component
const AttachmentMenu = ({ onAttach, onClose, onAddLesson }) => {
  return (
    <div className="absolute bottom-16 left-4 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="py-1">
        <button 
          className="flex items-center w-full px-4 py-2 text-sm text-left active:bg-gray-100"
          onClick={() => {
            onAttach('image');
            onClose();
          }}
        >
          <Image className="w-5 h-5 mr-3 text-green-600" />
          <span>Add Photo</span>
        </button>
        <button 
          className="flex items-center w-full px-4 py-2 text-sm text-left active:bg-gray-100"
          onClick={() => {
            onAttach('file');
            onClose();
          }}
        >
          <Paperclip className="w-5 h-5 mr-3 text-green-600" />
          <span>Add File</span>
        </button>
        <button 
          className="flex items-center w-full px-4 py-2 text-sm text-left active:bg-gray-100"
          onClick={() => {
            onAddLesson();
            onClose();
          }}
        >
          <CreditCard className="w-5 h-5 mr-3 text-green-600" />
          <span>Add Lesson Card</span>
        </button>
      </div>
    </div>
  );
};

// Modular Component: Message Input with improved attachment experience
const MessageInput = ({ onSend, onAttach, onAddLesson }) => {
  const [message, setMessage] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const attachmentMenuRef = useRef(null);
  const attachButtonRef = useRef(null);
  
  // Close the attachment menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showAttachmentMenu &&
        attachmentMenuRef.current && 
        !attachmentMenuRef.current.contains(event.target) &&
        attachButtonRef.current &&
        !attachButtonRef.current.contains(event.target)
      ) {
        setShowAttachmentMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAttachmentMenu]);
  
  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleAttachment = (type) => {
    onAttach(type);
  };
  
  return (
    <div className="p-3 border-t border-gray-200 bg-white relative">
      {showAttachmentMenu && (
        <div ref={attachmentMenuRef}>
          <AttachmentMenu 
            onAttach={handleAttachment}
            onClose={() => setShowAttachmentMenu(false)}
            onAddLesson={onAddLesson}
          />
        </div>
      )}
      
      <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
        <button 
          ref={attachButtonRef}
          className="p-1.5 text-gray-500 active:text-gray-700 focus:outline-none rounded-full active:bg-gray-200 mr-2"
          onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
          aria-label="Add attachments"
        >
          <Plus className="w-5 h-5" />
        </button>
        
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..." 
          className="flex-1 bg-transparent border-none focus:outline-none text-sm"
        />
        
        <button 
          className={`ml-2 ${message.trim() ? 'bg-green-600 active:bg-green-700' : 'bg-gray-300 cursor-not-allowed'} text-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm`}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Modular Component: Chat Interface
const ChatInterface = ({ chat, messages, onBack, onSendMessage, onMarkAsRead }) => {
  const messagesEndRef = useRef(null);
  
  // Mark chat as read when opened
  useEffect(() => {
    if (chat.unread > 0) {
      onMarkAsRead(chat.id);
    }
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, messages, onMarkAsRead]);
  
  const handleAttachment = (type) => {
    console.log(`Attaching ${type}`);
    // In a real app, this would open a file picker or similar
  };
  
  const handleAddLesson = () => {
    console.log('Adding lesson card');
    // In a real app, this would open a lesson selector
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="p-1 mr-2 rounded-full active:bg-gray-100"
            aria-label="Go back to messages"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium flex-shrink-0">
            {chat.avatar}
          </div>
          <div className="ml-2">
            <span className="font-medium text-gray-800 block">{chat.name}</span>
            <span className="text-xs text-gray-500">
              {chat.isOnline ? 'Online' : 'Last seen today'}
            </span>
          </div>
        </div>
        <button 
          className="p-1 rounded-full active:bg-gray-100" 
          aria-label="View profile"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {/* Chat Content */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        <div className="text-center mb-4">
          <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">
            Today
          </span>
        </div>
        
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            {msg.type === 'message' ? (
              <ChatBubble 
                message={msg.content} 
                isUser={msg.sender === 'user'} 
                time={msg.time}
                status={msg.status}
              />
            ) : msg.type === 'lessonCard' ? (
              <div className="max-w-[85%] bg-green-50 rounded-lg p-3 mb-3 shadow-sm">
                <p className="text-sm mb-2">{msg.pretext}</p>
                <LessonDetailCard lesson={msg.lesson} />
                <span className="text-xs text-gray-500 mt-1 block">{msg.time}</span>
              </div>
            ) : null}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input Area */}
      <MessageInput 
        onSend={onSendMessage} 
        onAttach={handleAttachment}
        onAddLesson={handleAddLesson}
      />
    </div>
  );
};

// Empty State Component
const EmptyState = ({ title, description, icon, actionText, onAction }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-4">{description}</p>
      {actionText && onAction && (
        <button 
          onClick={onAction}
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium active:bg-green-700"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

// Helper Icon Components
const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

// Main Message System Component
const MessageNotificationSystem103 = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('chat');
  const [currentChat, setCurrentChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Chat State - Simplified
  const [chatList, setChatList] = useState([
    { 
      id: 1, 
      name: 'Alice (Coach)', 
      avatar: 'A', 
      lastMessage: "I've scheduled your lesson. Here are the details", 
      time: '10:35 AM', 
      unread: 2,
      isMessageSent: false,
      isMessageRead: false,
      isOnline: true
    },
    { 
      id: 2, 
      name: 'Bob (Coach)', 
      avatar: 'B', 
      lastMessage: 'Great progress today!', 
      time: 'Yesterday', 
      unread: 0,
      isMessageSent: true,
      isMessageRead: true,
      isOnline: false
    },
    { 
      id: 3, 
      name: 'Charlie (Coach)', 
      avatar: 'C', 
      lastMessage: 'We need to reschedule our lesson next week', 
      time: 'Mar 20', 
      unread: 1,
      isMessageSent: false,
      isMessageRead: false,
      isOnline: false
    }
  ]);
  
  // Notification State - Simplified
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Lesson Confirmed', message: 'Your lesson with Alice has been confirmed', time: '1 hour ago', read: false },
    { id: 2, title: 'Payment Reminder', message: 'Please complete payment for your lesson with Charlie', time: '3 hours ago', read: false },
    { id: 3, title: 'New Coach Available', message: 'David is now available for Tennis lessons in your area', time: 'Yesterday', read: true }
  ]);
  
  // Chat Messages - Simplified
  const [chatMessages, setChatMessages] = useState({
    1: [
      { type: 'message', content: "Hi, I'd like to book a tennis lesson for next Saturday. Are you available?", sender: 'user', time: '10:25 AM', status: 'read' },
      { type: 'message', content: "Hello! I have two slots available next Saturday: 14:00-15:00 or 16:00-17:00. Which time works better for you?", sender: 'other', time: '10:28 AM' },
      { type: 'message', content: "I'd like to book the 14:00-15:00 lesson.", sender: 'user', time: '10:30 AM', status: 'read' },
      { type: 'lessonCard', pretext: "I've scheduled your lesson. Here are the details:", lesson: { title: "Tennis Lesson", status: "Confirmed", schedule: "Sat, Mar 15 • 14:00-15:00" }, time: '10:35 AM' }
    ],
    2: [
      { type: 'message', content: "Great job today! You're making excellent progress with your backhand.", sender: 'other', time: '5:15 PM' },
      { type: 'message', content: "Thanks Bob! I've been practicing a lot.", sender: 'user', time: '5:20 PM', status: 'read' },
      { type: 'message', content: "Great progress today!", sender: 'other', time: '5:30 PM' }
    ],
    3: [
      { type: 'message', content: "Hi Charlie, I just wanted to confirm our lesson for tomorrow at 3pm.", sender: 'user', time: '9:00 AM', status: 'read' },
      { type: 'message', content: "We need to reschedule our lesson next week", sender: 'other', time: '9:15 AM' }
    ]
  });
  
  // Get unread counts
  const getUnreadCounts = () => {
    return {
      chats: chatList.reduce((count, chat) => count + chat.unread, 0),
      notifications: notifications.filter(n => !n.read).length
    };
  };
  
  // Handler for going back to home screen
  const handleGoHome = () => {
    // In a real app, this would navigate to the home screen
    alert("Navigating to home screen");
    // For demo purposes, just go back to message list
    setCurrentChat(null);
  };
  
  // Filtered chat list based on search
  const filteredChatList = searchTerm 
    ? chatList.filter(chat => 
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : chatList;
  
  // Handle Chat Selection
  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
  };
  
  // Return to Chat List
  const handleBackToChats = () => {
    setCurrentChat(null);
  };
  
  // Mark a chat as read
  const handleMarkChatAsRead = (chatId) => {
    setChatList(chatList.map(chat => 
      chat.id === chatId ? { ...chat, unread: 0 } : chat
    ));
  };
  
  // Handle sending a new message
  const handleSendMessage = (text) => {
    if (currentChat) {
      const newMessage = {
        type: 'message',
        content: text,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      
      // Add message to chat
      setChatMessages({
        ...chatMessages,
        [currentChat.id]: [...(chatMessages[currentChat.id] || []), newMessage]
      });
      
      // Update last message in chat list
      setChatList(chatList.map(chat => 
        chat.id === currentChat.id ? { 
          ...chat, 
          lastMessage: text,
          time: 'Just now',
          isMessageSent: true,
          isMessageRead: false
        } : chat
      ));
    }
  };
  
  // Handle Notification Click - Mark as read
  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // Mark all notifications as read
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Mark all chats as read
  const handleMarkAllChatsAsRead = () => {
    setChatList(chatList.map(chat => ({ ...chat, unread: 0 })));
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {currentChat ? (
        // Chat Detail Interface
        <ChatInterface 
          chat={currentChat}
          messages={chatMessages[currentChat.id] || []}
          onBack={handleBackToChats}
          onSendMessage={handleSendMessage}
          onMarkAsRead={handleMarkChatAsRead}
        />
      ) : (
        // Message List and Notification Interface
        <>
          {/* Header with Back Button */}
          <PageHeader 
            title="Messages and Notifications"
            onBack={handleGoHome}
          />
          
          {/* Tab Switcher */}
          <TabSwitcher 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            unreadCounts={getUnreadCounts()}
          />

          {/* Mark All as Read Button */}
          <MarkAllAsReadButton 
            onClick={activeTab === 'chat' ? handleMarkAllChatsAsRead : handleMarkAllNotificationsAsRead}
            show={(activeTab === 'notification' && notifications.some(n => !n.read)) || 
                 (activeTab === 'chat' && chatList.some(chat => chat.unread > 0))}
          />
          
          {/* Search Bar - Only in Chat Tab */}
          {activeTab === 'chat' && (
            <SearchBar 
              placeholder="Search chats" 
              value={searchTerm}
              onChange={setSearchTerm}
            />
          )}
          
          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'chat' && (
              filteredChatList.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredChatList.map(chat => (
                    <ChatListItem 
                      key={chat.id}
                      chat={chat}
                      onSelect={handleChatSelect}
                    />
                  ))}
                </div>
              ) : searchTerm ? (
                <EmptyState 
                  title="No matches found"
                  description={`No chats matching "${searchTerm}"`}
                  icon={<MessageIcon />}
                  actionText="Clear Search"
                  onAction={() => setSearchTerm('')}
                />
              ) : (
                <EmptyState 
                  title="No chats yet"
                  description="Your chat list is empty. Start chatting with coaches to arrange your tennis lessons."
                  icon={<MessageIcon />}
                />
              )
            )}
            
            {activeTab === 'notification' && (
              notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map(notification => (
                    <NotificationItem 
                      key={notification.id}
                      notification={notification}
                      onClick={handleNotificationClick}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  title="No notifications"
                  description="You don't have any notifications at the moment. We'll notify you of important updates."
                  icon={<BellIcon />}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MessageNotificationSystem103; 