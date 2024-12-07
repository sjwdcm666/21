// 照片轮播功能
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.carousel-image');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function showImage(index) {
        // 先找到当前显示的图片
        const currentImage = document.querySelector('.carousel-image.active');
        
        // 移除当前图片的active类
        if (currentImage) {
            currentImage.classList.remove('active');
        }
        
        // 添加新图片的active类
        images[index].classList.add('active');
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    // 自动轮播
    setInterval(nextImage, 8000);

    // 按钮点击事件
    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);

    // 滚动效果
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease-out';
        observer.observe(section);
    });
});

// 聊天功能
document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.querySelector('.messages-container');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-btn');
    const resetButton = document.querySelector('.reset-btn');

    // 自动调整输入框高度
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    // 发送消息
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        // 检查是否是第一次对话
        const isFirstMessage = !messagesContainer.querySelector('.message.user');

        try {
            // 添加用户消息
            addMessage(message, 'user');
            messageInput.value = '';
            messageInput.style.height = 'auto';

            // 添加 AI 回复
            let aiResponse;
            if (isFirstMessage) {
                aiResponse = "我困了，你干脆直接去问ChatGPT吧。";
                addMessage(aiResponse, 'ai');
                // 延迟1秒后跳转到ChatGPT
                setTimeout(() => {
                    window.open('https://chatgpt.com/', '_blank');
                }, 1000);
            } else {
                aiResponse = "你怎么又来了，不是去问ChatGPT了吗？赶紧走开！我要睡觉了！";
                addMessage(aiResponse, 'ai');
                // 延迟1秒后关闭聊天窗口
                setTimeout(() => {
                    const chatContainer = document.querySelector('.chat-container');
                    chatContainer.classList.add('closing');
                    setTimeout(() => {
                        chatContainer.style.display = 'none';
                    }, 800);
                }, 1000);
            }

        } catch (error) {
            console.error('API 调用错误:', error);
            console.error('错误详情:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            messagesContainer.removeChild(messagesContainer.lastChild);
            addMessage('抱歉，我现在有点困了，请稍后再试...\n错误信息: ' + error.message, 'ai');
        }
    }

    // 添加消息到界面
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        
        // 将文本中的换行符转换为 <br> 标签
        const formattedText = text.replace(/\n/g, '<br>');
        messageDiv.innerHTML = formattedText;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // 发送按钮点击事件
    sendButton.addEventListener('click', sendMessage);

    // 回车发送息
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 重置对话
    resetButton.addEventListener('click', function() {
        messagesContainer.innerHTML = '';
        addMessage('你好！我是睡觉哇，让我们一起探讨如何获得更好的睡眠体验吧！\n有什么想问我的吗？', 'ai');
    });

    // 修改初始消息
    addMessage('你好！我是睡觉哇，让我们一起探讨如何获得更好的睡眠体验吧！\n有什么想问我的吗？', 'ai');
}); 