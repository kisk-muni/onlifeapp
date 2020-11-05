/** @jsx jsx */
import { jsx, Avatar } from 'theme-ui'

const Message = ({avatar, message, name}: {avatar: string, message: string, name: string}) => {
  return (
    <div className="message-container">
      <div className="message-content">
        <div className="message-bubble">{message}</div>
        <div className="message-name">{name}</div>
      </div>
      <div className="message-avatar"><span className="message-avatar-avatar"><Avatar src={avatar} size={64} sx={{width: 50, height: 50}} /></span></div>
    <style jsx>{`
    .message-container {
      display: flex;
      width: 100%;
      align-items: flex-end;
      margin-bottom: 16px;
      justify-content: flex-start;
    }
    .message-content {
      letter-spacing: -.02em;
      line-height: 1.4;
      margin-right: 16px;
    }
    .message-bubble {
      position: relative;
      border-radius: 1rem;
      font-size: 18px;
      padding: 12px 16px;
      background: #0070f3;
      color: #fff;
      margin-bottom: 8px;
    }
    .message-bubble:before {
      content: "";
      position: absolute;
      z-index: 0;
      bottom: 0;
      right: -8px;
      height: 20px;
      width: 20px;
      background: inherit;
      border-bottom-left-radius: 15px;
    }
    .message-bubble:after {
      content: "";
      position: absolute;
      z-index: 1;
      bottom: 0;
      right: -10px;
      width: 10px;
      height: 21px;
      background: #fff;
      border-bottom-left-radius: 10px;
    }
    .message-name {
      text-align: right;
      font-size: 16px;
      color: #666;
    }
    .message-avatar {
      margin-bottom: 1.65rem;
    }
    .message-avatar-avatar {
      flex-basis: 64px;
      width: 64px;
      border-radius: 100%;
      display: inline-block;
      overflow: hidden;
      line-height: 0;
      vertical-align: top;
      -webkit-mask-image: -webkit-radial-gradient(circle,#fff,#000);
      background: #fff;
      transition: border .2s ease,background .2s ease;
      box-sizing: border-box;
    }
    .message-avatar-avatar img {
      width: 100%;
      height: 100%;
    }
    `}</style>
    </div>
    )
  }
  
  export default Message