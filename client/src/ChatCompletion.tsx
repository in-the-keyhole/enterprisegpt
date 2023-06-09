interface ChatCompletionProps {
  message: string;
  isUserMessage: boolean;
}

function ChatCompletion({ message, isUserMessage }: ChatCompletionProps): JSX.Element {
  const messageClass = isUserMessage ? 'user-message' : '';

  return <p className={messageClass}>{message}</p>;
}

export default ChatCompletion;
