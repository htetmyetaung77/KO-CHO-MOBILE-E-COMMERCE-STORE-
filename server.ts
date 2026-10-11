import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8941636635:AAHCoVfpr6ntZTdJGKoIVlnYn05Wn2kBlOI';
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || '8927464164';
const APP_URL = 'https://ais-pre-42vli3o2fo4ljttzd5mbfi-527165626124.asia-southeast1.run.app';
const STORE_URL = `${APP_URL}?mode=storefront`;

app.use(express.json());

interface StoredTelegramMessage {
  id: string;
  updateId: number;
  chatId: number;
  senderName: string;
  senderHandle: string;
  text: string;
  date: number;
  time: string;
  isFromAdmin: boolean;
  replySent?: string;
}

const telegramChatHistory: StoredTelegramMessage[] = [
  {
    id: 'msg-init-1',
    updateId: 0,
    chatId: Number(ADMIN_CHAT_ID),
    senderName: 'Admin (player_00h)',
    senderHandle: '@player_00h',
    text: '/start',
    date: Date.now() - 3600000,
    time: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isFromAdmin: true,
    replySent: 'Welcome to KO CHO MOBILE E-commerce Store!'
  }
];

let botInfo: any = null;
let isPolling = false;
let lastUpdateId = 0;

// Helper to call Telegram Bot API
async function callTelegram(method: string, payload: any) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error(`Telegram API Error on ${method}:`, err);
    return { ok: false, error: err };
  }
}

// Telegram reply generator with strict rule: COD is NOT available yet!
function getAutoReply(text: string, userName: string): { replyText: string; inlineKeyboard?: any } {
  const lower = (text || '').toLowerCase().trim();

  // /start command
  if (lower.startsWith('/start')) {
    return {
      replyText:
        `မင်္ဂလာပါ ${userName || 'လူကြီးမင်း'} ရှင့်/ခင်ဗျာ! 🙏\n\n` +
        `📱 *KO CHO MOBILE E-commerce Store* မှ နွေးထွေးစွာ ကြိုဆိုပါသည်။\n\n` +
        `စတိုးဆိုင်အတွင်းရှိ iPhone နှင့် အရည်အသွေးမြင့် မိုဘိုင်းဖုန်းများ၊ အီလက်ထရောနစ်ပစ္စည်းများကို အောက်ပါ *Open Store* ခလုတ်ကိုနှိပ်၍ တိုက်ရိုက် ကြည့်ရှုမှာယူနိုင်ပါသည်။\n\n` +
        `⚠️ *အထူးသတိပြုရန်:*\n` +
        `လောလောဆယ် *အိမ်ရောက်ငွေချေ (Cash on Delivery / COD) မရသေးပါ*။ KBZPay နှင့် WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်ခင်ဗျာ။\n\n` +
        `📞 ဆက်သွယ်ရန် Hotline: \`09 779 944 100\`\n` +
        `✈️ Admin: @player_00h`,
      inlineKeyboard: [
        [
          {
            text: '🛍️ Open Store (စတိုးဆိုင်ဖွင့်ရန်)',
            web_app: { url: STORE_URL }
          }
        ],
        [
          {
            text: '🌐 Browser ဖြင့် တိုက်ရိုက်ဖွင့်ရန်',
            url: STORE_URL
          }
        ],
        [
          { text: '📱 ဖုန်းများကြည့်ရန်', callback_data: 'cmd_products' },
          { text: '💳 ငွေလွှဲအကောင့်များ (COD မရပါ)', callback_data: 'cmd_payment' }
        ],
        [
          { text: '📦 Order စစ်ဆေးရန်', callback_data: 'cmd_track' },
          { text: '📞 ဆိုင်ရှင်ထံ ဆက်သွယ်ရန်', callback_data: 'cmd_contact' }
        ]
      ]
    };
  }

  // COD query or payment query
  if (
    lower.includes('cod') ||
    lower.includes('အိမ်ရောက်') ||
    lower.includes('ငွေချေ') ||
    lower.includes('payment') ||
    lower.startsWith('/payment') ||
    lower.startsWith('/cod')
  ) {
    return {
      replyText:
        `💳 *ငွေပေးချေမှု အချက်အလက်များ:*\n\n` +
        `⚠️ *လောလောဆယ် အိမ်ရောက်ငွေချေ (COD) မရသေးပါခင်ဗျာ။*\n` +
        `လူကြီးမင်းတို့အနေဖြင့် အောက်ပါ KPay နှင့် WavePay များဖြင့် စိတ်ချစွာ ငွေလွှဲမှာယူနိုင်ပါသည်:\n\n` +
        `🔹 *KBZPay:* \`09 776 111 116\` (Hla Phone Thu)\n` +
        `🔹 *WavePay:* \`09 776 111 116\` (Hla Phone Thu)\n` +
        `🔹 *CB Bank:* \`0012 6001 8920 1201\` (Hla Phone Thu)\n\n` +
        `ငွေလွှဲပြီးပါက ငွေလွှဲပြေစာ (Screenshot) ကို ဤ Bot သို့ ပေးပို့ပေးပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။`,
      inlineKeyboard: [
        [
          {
            text: '🛍️ Open Store & Order',
            web_app: { url: STORE_URL }
          },
          {
            text: '🌐 Browser ဖြင့်ဖွင့်ရန်',
            url: STORE_URL
          }
        ]
      ]
    };
  }

  // /products command
  if (
    lower.startsWith('/products') ||
    lower.includes('phone') ||
    lower.includes('iphone') ||
    lower.includes('ဖုန်း') ||
    lower.includes('ပစ္စည်း') ||
    lower.includes('ဈေး') ||
    lower.includes('price')
  ) {
    return {
      replyText:
        `📱 *KO CHO MOBILE — ရရှိနိုင်သော ပစ္စည်းများနှင့် ဈေးနှုန်းများ:*\n\n` +
        `1️⃣ *iPhone 16 Pro Max 256Gb (Desert Titanium)* - 4,600,000 MMK\n` +
        `2️⃣ *iPhone 16 128Gb (White)* - 3,300,000 MMK\n` +
        `3️⃣ *iPhone 15 Pro 128Gb (Natural Titanium)* - 3,250,000 MMK\n` +
        `4️⃣ *iPhone 15 Plus 128Gb (Pink)* - 2,950,000 MMK\n` +
        `5️⃣ *iPhone 11 Pro 256Gb (Space Gray)* - 1,250,000 MMK\n` +
        `6️⃣ *Redmi Note 13 Pro+ 5G (12/512GB)* - 1,180,000 MMK\n` +
        `7️⃣ *AirPods Pro 2nd Gen USB-C* - 650,000 MMK\n\n` +
        `⚠️ *လောလောဆယ် အိမ်ရောက်ငွေချေ (COD) မရသေးပါ* (KBZPay / WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်)။`,
      inlineKeyboard: [
        [
          {
            text: '🛍️ Open Store (Mini App)',
            web_app: { url: STORE_URL }
          },
          {
            text: '🌐 Browser ဖြင့်ဖွင့်ရန်',
            url: STORE_URL
          }
        ]
      ]
    };
  }

  // /contact command
  if (lower.startsWith('/contact') || lower.includes('ဆိုင်') || lower.includes('ဖုန်းနံပါတ်')) {
    return {
      replyText:
        `📞 *KO CHO MOBILE E-commerce Store ဆက်သွယ်ရန်:*\n\n` +
        `• Hotline ဖုန်း: \`09 779 944 100\`\n` +
        `• Shop Admin: @player_00h\n` +
        `• Official Telegram: @kocho_mobile_official\n` +
        `• ပို့ဆောင်မှု: ရန်ကုန်၊ မန္တလေးနှင့် နယ်မြို့များအားလုံးသို့ ကားဂိတ် / Delivery ဖြင့် ပို့ဆောင်ပေးပါသည်။\n` +
        `(⚠️ အိမ်ရောက်ငွေချေ မရသေးပါ၊ KPay/WavePay ဖြင့် ငွေလွှဲရပါမည်)`
    };
  }

  // Default response
  return {
    replyText:
      `မင်္ဂလာပါခင်ဗျာ! 🙏 KO CHO MOBILE E-commerce Store မှ စာလက်ခံရရှိပါသည်။\n\n` +
      `ဖုန်းများနှင့် ပစ္စည်းများကို အောက်ပါ *Open Store* ခလုတ်မှတစ်ဆင့် အလွယ်တကူ ကြည့်ရှုမှာယူနိုင်ပါပြီ။\n\n` +
      `⚠️ *လောလောဆယ် အိမ်ရောက်ငွေချေ (COD) မရသေးပါ*။ KBZPay နှင့် WavePay: \`09 776 111 116\` (Hla Phone Thu) ဖြင့် စိတ်ချစွာ ငွေလွှဲပေးချေနိုင်ပါသည်။\n\n` +
      `အသေးစိတ်သိရှိလိုပါက Hotline: \`09 779 944 100\` သို့ တိုက်ရိုက်ခေါ်ဆိုနိုင်ပါသည်ခင်ဗျာ။`,
    inlineKeyboard: [
      [
        {
          text: '🛍️ Open Store (စတိုးဆိုင်ဖွင့်ရန်)',
          web_app: { url: APP_URL }
        }
      ]
    ]
  };
}

// Background Telegram Poller Loop
async function startTelegramPoller() {
  if (isPolling) return;
  isPolling = true;

  try {
    const meRes = await callTelegram('getMe', {});
    if (meRes.ok) {
      botInfo = meRes.result;
      console.log(`[Telegram Bot] Connected successfully as @${botInfo.username} (${botInfo.first_name})`);
    } else {
      console.error('[Telegram Bot] Failed to verify bot token:', meRes);
    }
  } catch (e) {
    console.error('[Telegram Bot] Init error:', e);
  }

  console.log('[Telegram Bot] Polling started...');

  while (isPolling) {
    try {
      const res = await callTelegram('getUpdates', {
        offset: lastUpdateId + 1,
        timeout: 10,
        allowed_updates: ['message', 'callback_query']
      });

      if (res && res.ok && Array.isArray(res.result) && res.result.length > 0) {
        for (const update of res.result) {
          lastUpdateId = Math.max(lastUpdateId, update.update_id);

          // Handle Callback Query (from inline button clicks)
          if (update.callback_query) {
            const cq = update.callback_query;
            const chatId = cq.message?.chat?.id || cq.from?.id;
            const data = cq.data;
            const fromName = `${cq.from?.first_name || ''} ${cq.from?.last_name || ''}`.trim() || 'User';

            // Answer callback query to dismiss loading state
            await callTelegram('answerCallbackQuery', { callback_query_id: cq.id });

            let replyMsg = '';
            if (data === 'cmd_products') {
              replyMsg =
                `📱 *KO CHO MOBILE ပစ္စည်းများ:*\n` +
                `• iPhone 16 Pro Max 256Gb: 4,600,000 MMK\n` +
                `• iPhone 16 128Gb White: 3,300,000 MMK\n` +
                `• iPhone 15 Pro 128Gb: 3,250,000 MMK\n` +
                `• Redmi Note 13 Pro+ 5G: 1,180,000 MMK\n\n` +
                `⚠️ *အိမ်ရောက်ငွေချေ မရသေးပါ* (KPay/WavePay ဖြင့် ငွေလွှဲပေးချေရပါမည်)။`;
            } else if (data === 'cmd_payment') {
              replyMsg =
                `💳 *ငွေလွှဲအကောင့်များ (COD မရပါ):*\n` +
                `• KPay: \`09 776 111 116\` (Hla Phone Thu)\n` +
                `• WavePay: \`09 776 111 116\` (Hla Phone Thu)\n` +
                `• CB Bank: \`0012 6001 8920 1201\` (Hla Phone Thu)\n\n` +
                `⚠️ *လောလောဆယ် အိမ်ရောက်ငွေချေ (COD) မရသေးပါခင်ဗျာ*`;
            } else if (data === 'cmd_contact') {
              replyMsg = `📞 Hotline: \`09 779 944 100\`\n✈️ Admin: @player_00h\nမနက် ၉ နာရီမှ ည ၉ နာရီအထိ ဆက်သွယ်နိုင်ပါသည်။`;
            } else if (data === 'cmd_track') {
              replyMsg = `📦 အော်ဒါအခြေအနေသိရှိလိုပါက သင်၏ Order Number (ဥပမာ KCB-8941) သို့မဟုတ် ငွေလွှဲ Screenshot ပေးပို့ပေးပါခင်ဗျာ။`;
            }

            if (replyMsg && chatId) {
              await callTelegram('sendMessage', {
                chat_id: chatId,
                text: replyMsg,
                parse_mode: 'Markdown',
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: '🛍️ Open Store (စတိုးဆိုင်ဖွင့်ရန်)',
                        web_app: { url: STORE_URL }
                      },
                      {
                        text: '🌐 Browser ဖြင့်ဖွင့်ရန်',
                        url: STORE_URL
                      }
                    ]
                  ]
                }
              });
            }
            continue;
          }

          // Handle regular message
          if (update.message) {
            const msg = update.message;
            const chatId = msg.chat.id;
            const text = msg.text || '';
            const userName = `${msg.from?.first_name || ''} ${msg.from?.last_name || ''}`.trim() || msg.chat.first_name || 'Customer';
            const userHandle = msg.from?.username ? `@${msg.from.username}` : (msg.chat.username ? `@${msg.chat.username}` : 'No username');
            const isFromAdmin = String(chatId) === String(ADMIN_CHAT_ID);

            const { replyText, inlineKeyboard } = getAutoReply(text, userName);

            // Send reply to user
            const sendPayload: any = {
              chat_id: chatId,
              text: replyText,
              parse_mode: 'Markdown'
            };
            if (inlineKeyboard) {
              sendPayload.reply_markup = { inline_keyboard: inlineKeyboard };
            }

            const sendRes = await callTelegram('sendMessage', sendPayload);

            // Store message for Web Dashboard Chats tab
            telegramChatHistory.unshift({
              id: `tg-${update.update_id}`,
              updateId: update.update_id,
              chatId,
              senderName: userName,
              senderHandle: userHandle,
              text,
              date: msg.date * 1000,
              time: new Date(msg.date * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isFromAdmin,
              replySent: replyText
            });

            // If message is from a customer (not admin), notify admin about incoming inquiry
            if (!isFromAdmin && String(ADMIN_CHAT_ID)) {
              try {
                await callTelegram('sendMessage', {
                  chat_id: ADMIN_CHAT_ID,
                  text:
                    `📩 *[Customer Telegram Message]*\n` +
                    `👤 *User:* ${userName} (${userHandle})\n` +
                    `💬 *Message:* ${text}\n` +
                    `⏱️ *Time:* ${new Date().toLocaleTimeString()}\n` +
                    `_(Bot replied automatically)_`,
                  parse_mode: 'Markdown'
                });
              } catch (e) {
                // Ignore admin notify fail
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('[Telegram Polling Loop Error]:', err);
      // Wait 3s before retry
      await new Promise((r) => setTimeout(r, 3000));
    }

    // Small delay between polls
    await new Promise((r) => setTimeout(r, 800));
  }
}

// REST API Endpoints
app.get('/api/bot/status', async (req, res) => {
  try {
    const meRes = await callTelegram('getMe', {});
    res.json({
      connected: meRes.ok,
      bot: meRes.result || botInfo,
      polling: isPolling,
      adminChatId: ADMIN_CHAT_ID,
      tokenConfigured: Boolean(BOT_TOKEN),
      recentMessageCount: telegramChatHistory.length
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bot/chats', (req, res) => {
  res.json({
    messages: telegramChatHistory.slice(0, 50)
  });
});

app.post('/api/bot/send-reply', async (req, res) => {
  try {
    const { chatId, text } = req.body;
    if (!chatId || !text) {
      return res.status(400).json({ error: 'Missing chatId or text' });
    }
    const result = await callTelegram('sendMessage', {
      chat_id: chatId,
      text: `[Admin Response]\n${text}`,
      parse_mode: 'Markdown'
    });
    res.json({ success: result.ok, result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create Order & Send Real Telegram Invoice to Admin
app.post('/api/bot/send-order', async (req, res) => {
  try {
    const { order } = req.body;
    if (!order) {
      return res.status(400).json({ error: 'Missing order data' });
    }

    const itemsSummary = (order.items || [])
      .map(
        (it: any, idx: number) =>
          `${idx + 1}. *${it.product?.name || 'Product'}* x${it.quantity} = ${Number(it.product?.price * it.quantity).toLocaleString()} MMK`
      )
      .join('\n');

    const paymentLabel =
      order.paymentMethod === 'kpay'
        ? 'KBZPay (09 776 111 116 - Hla Phone Thu)'
        : order.paymentMethod === 'wavepay'
        ? 'WavePay (09 776 111 116 - Hla Phone Thu)'
        : order.paymentMethod === 'cbpay'
        ? 'CB Bank (Hla Phone Thu)'
        : order.paymentMethod?.toUpperCase();

    const orderMarkdown =
      `🛍️ *[အော်ဒါအသစ် ရောက်ရှိပါသည်]*\n\n` +
      `📋 *Order ID:* \`#${order.orderNumber}\`\n` +
      `👤 *Customer Name:* ${order.customerName}\n` +
      `📞 *Phone:* \`${order.customerPhone}\`\n` +
      `✈️ *Telegram:* ${order.customerTelegram || 'N/A'}\n` +
      `📍 *Address:* ${order.address}, ${order.city}\n\n` +
      `🛒 *မှာယူသည့် ပစ္စည်းများ:*\n${itemsSummary}\n\n` +
      `🚚 *Delivery Fee:* ${Number(order.deliveryFee || 0).toLocaleString()} MMK\n` +
      `💰 *စုစုပေါင်း (Total):* *${Number(order.total).toLocaleString()} MMK*\n\n` +
      `💳 *ငွေပေးချေမှု:* *${paymentLabel}*\n` +
      `⚠️ *(မှတ်ချက်: အိမ်ရောက်ငွေချေ မရပါ)*\n` +
      (order.notes ? `📝 *Notes:* ${order.notes}\n` : '') +
      `\n⏱️ *Time:* ${new Date().toLocaleString()}`;

    // Send to Admin
    const telegramRes = await callTelegram('sendMessage', {
      chat_id: ADMIN_CHAT_ID,
      text: orderMarkdown,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '📞 Call Customer',
              url: `tel:${order.customerPhone}`
            },
            {
              text: '📱 Contact via Telegram',
              url: `https://t.me/${(order.customerTelegram || '').replace('@', '')}`
            }
          ]
        ]
      }
    });

    res.json({
      success: telegramRes.ok,
      telegramResponse: telegramRes,
      orderNumber: order.orderNumber
    });
  } catch (err: any) {
    console.error('Error forwarding order to Telegram:', err);
    res.status(500).json({ error: err.message });
  }
});

// Test message API
app.post('/api/bot/test-message', async (req, res) => {
  try {
    const { chatId = ADMIN_CHAT_ID, text = 'Ko Cho Mobile Bot Connection Verified! ✅' } = req.body;
    const result = await callTelegram('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown'
    });
    res.json({ success: result.ok, result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Mount Vite in dev / serve static in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 KO CHO MOBILE Server running at http://0.0.0.0:${PORT}`);
    // Start background Telegram poller
    startTelegramPoller();
  });
}

startServer();
