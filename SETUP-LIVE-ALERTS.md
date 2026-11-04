# Live-session alerts on Telegram (outside the website)

A student books or joins a waiting list -> your phone gets a Telegram message within seconds.
The message holds the student's name, level, exam session and slot. It does NOT hold the phone number (open the Admin > Live sessions tab for that).

## 1. Create the bot (2 minutes)
1. In Telegram open **@BotFather**, send `/newbot`, choose a name. Copy the **bot token**.
2. Open your new bot and press **Start** (send it any message).
3. Get your chat id: open `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser and copy `message.chat.id`.

## 2. Deploy the Worker (free Cloudflare plan)
From the `worker/` folder:
```
npm i -g wrangler
wrangler login
wrangler secret put TELEGRAM_BOT_TOKEN -c wrangler-live.toml
wrangler secret put TELEGRAM_CHAT_ID  -c wrangler-live.toml
wrangler deploy -c wrangler-live.toml
```
Wrangler prints the Worker address (`https://ilearn-live-notify.<you>.workers.dev`).

## 3. Connect the site
Put that address in `live-config.js`:
```
window.PQ_LIVE_NOTIFY_URL = "https://ilearn-live-notify.<you>.workers.dev";
```
then commit and push. Done: book a test slot with a student account and check Telegram.

## Safety
- The bot token and chat id live only in Worker secrets, never in the site.
- The Worker accepts only requests from `https://ashraf2k.github.io`, checks the student's sign-in token and that the booking really exists (fresh, under 10 minutes), builds the text itself, rate-limits per IP and sends one alert per student per kind.
- If the Worker is down, bookings still work; only the alert is lost (the Admin tab still shows everything).
