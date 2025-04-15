const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'eu9-free.falixserver.net', // IP сервера Minecraft
    port: 18958,       // Порт (обычно 25565)
    username: 'MineSwaga', // Ник бота (можно любой)
    version: '1.21.4', // Версия клиента
  });

  bot.on('spawn', () => {
    console.log('✅ Бот зашел на сервер!');

    // Прыгаем каждые 10 сек, чтобы не кикало за AFK
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('end', () => {
    console.log('❌ Бот отключён. Переподключение...');
    setTimeout(createBot, 5000); // Переподключаемся
  });

  bot.on('error', (err) => {
    console.log('⚠️ Ошибка:', err.message);
  });
}

createBot();
