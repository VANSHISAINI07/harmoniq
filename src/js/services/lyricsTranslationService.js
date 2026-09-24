/**
 * HARMONIQ MULTI-LANGUAGE LYRICS SERVICE
 * (c) 2026 VANSHI SAINI. ALL RIGHTS RESERVED.
 * Digital Signature: 0x56414E534849-5341494E49-HARMONIQ-2026
 *
 * Supports synchronized lyrics in:
 * - English (Original / Roman)
 * - Hindi (हिंदी - Devanagari script / translation)
 * - Punjabi (ਪੰਜਾਬੀ - Gurmukhi script / translation)
 */

// Popular songs curated multi-language lyrics database
export const MULTI_LANG_CATALOG = {
   'coldplay - yellow': {
      en: `[00:00.00] ♪ (Guitar Intro)
[00:35.66] Look at the stars
[00:38.46] Look how they shine for you
[00:44.17] And everything you do
[00:49.66] Yeah, they were all yellow
[00:52.66] I came along
[00:55.42] I wrote a song for you
[00:60.69] And all the things you do
[01:06.24] And it was called "Yellow"
[01:13.25] So then I took my turn
[01:17.25] Oh, what a thing to have done
[01:22.48] And it was all yellow
[01:30.73] Your skin, oh, yeah, your skin and bones
[01:36.72] Turn into something beautiful
[01:42.34] And you know, you know I love you so
[01:50.51] You know I love you so
[01:57.00] ♪ (Instrumental Interlude)
[02:15.48] I swam across
[02:18.18] I jumped across for you
[02:23.32] Oh, what a thing to do
[02:29.14] 'Cause you were all yellow
[02:32.03] I drew a line
[02:34.91] I drew a line for you
[02:40.30] Oh, what a thing to do
[02:45.91] And it was all yellow
[02:53.74] And your skin, oh, yeah, your skin and bones
[02:59.77] Turn into something beautiful
[03:05.35] And you know, for you, I'd bleed myself dry
[03:13.63] For you, I'd bleed myself dry
[03:20.00] ♪ (Guitar Solo)
[03:37.82] It's true
[03:41.18] Look how they shine for you
[03:46.70] Look how they shine for you
[03:52.11] Look how they shine for
[03:57.84] Look how they shine for you
[04:03.26] Look how they shine for you
[04:09.07] Look how they shine
[04:11.90] Look at the stars
[04:14.33] Look how they shine for you
[04:19.99] And all the things that you do`,

      hi: `[00:00.00] ♪ (गिटार की शुरुआत)
[00:35.66] इन तारों को देखो
[00:38.46] देखो वो सिर्फ तुम्हारे लिए कैसे चमकते हैं
[00:44.17] और तुम्हारी हर एक बात के लिए
[00:49.66] हाँ, वो सब सुनहरे पीले थे
[00:52.66] मैं तुम्हारे पास आया
[00:55.42] मैंने तुम्हारे लिए एक गीत लिखा
[00:60.69] और तुम्हारी उन सभी खूबसूरत अदाओं के लिए
[01:06.24] और उस गीत का नाम था "येलो"
[01:13.25] फिर मेरी बारी आई
[01:17.25] ओह, मैंने क्या कमाल की बात कर दी
[01:22.48] और सब कुछ सुनहरा पीला हो गया
[01:30.73] तुम्हारा वजूद, तुम्हारी यह मासूमियत
[01:36.72] किसी बेहद खूबसूरत एहसास में ढल जाती है
[01:42.34] और तुम जानती हो, मैं तुमसे बेपनाह मोहब्बत करता हूँ
[01:50.51] तुम जानती हो कि मैं तुमसे कितना प्यार करता हूँ
[01:57.00] ♪ (संगीत की धुन)
[02:15.48] मैं समंदर पार कर आया
[02:18.18] मैं तुम्हारे लिए हर हद पार कर गया
[02:23.32] ओह, मोहब्बत में क्या कुछ कर गया
[02:29.14] क्योंकि तुम रोशनी की तरह सुनहरी थीं
[02:32.03] मैंने एक लकीर खींची
[02:34.91] मैंने सिर्फ तुम्हारे लिए वो लकीर खींची
[02:40.30] ओह, कितना प्यारा एहसास था
[02:45.91] और सब कुछ रोशनी से भर गया
[02:53.74] और तुम्हारा हर एक अंदाज़
[02:59.77] किसी करिश्मे में बदल जाता है
[03:05.35] और तुम जानती हो, तुम्हारे लिए मैं अपनी जान भी दे दूँ
[03:13.63] सिर्फ तुम्हारे लिए मैं सब कुछ न्योछावर कर दूँ
[03:20.00] ♪ (गिटार सोलो)
[03:37.82] यह सच है
[03:41.18] देखो वो तुम्हारे लिए कैसे चमकते हैं
[03:46.70] देखो वो सिर्फ तुम्हारे लिए जगमगाते हैं
[03:52.11] देखो कैसे चमकते हैं वो
[03:57.84] देखो कैसे तुम्हारे लिए नूर बिखेरते हैं
[04:03.26] देखो तुम्हारे लिए वो कैसे मुस्कुराते हैं
[04:09.07] देखो उनकी यह चमक
[04:11.90] इन तारों को देखो
[04:14.33] देखो वो तुम्हारे लिए कैसे जगमगाते हैं
[04:19.99] और तुम्हारी उन सभी प्यारी बातों के लिए`,

      pa: `[00:00.00] ♪ (ਗਿਟਾਰ ਦੀ ਧੁਨ)
[00:35.66] ਤਾਰਿਆਂ ਵੱਲ ਵੇਖੋ
[00:38.46] ਵੇਖੋ ਉਹ ਸਿਰਫ਼ ਤੇਰੇ ਲਈ ਕਿਵੇਂ ਚਮਕਦੇ ਨੇ
[00:44.17] ਅਤੇ ਹਰ ਉਸ ਗੱਲ ਲਈ ਜੋ ਤੂੰ ਕਰਦੀ ਏਂ
[00:49.66] ਹਾਂ, ਉਹ ਸਾਰੇ ਸੁਨਹਿਰੀ ਪੀਲੇ ਰੰਗ ਵਿੱਚ ਰੰਗੇ ਸਨ
[00:52.66] ਮੈਂ ਤੇਰੇ ਰਾਹਾਂ ਤੇ ਆਇਆ
[00:55.42] ਮੈਂ ਤੇਰੇ ਲਈ ਇਕ ਗੀਤ ਲਿਖਿਆ
[00:60.69] ਤੇਰੀ ਹਰ ਇੱਕ ਮਿੱਠੀ ਅਦਾ ਦੇ ਲਈ
[01:06.24] ਅਤੇ ਉਸ ਗੀਤ ਦਾ ਨਾਂ ਸੀ "ਯੈਲੋ"
[01:13.25] ਫਿਰ ਮੇਰੀ ਵਾਰੀ ਆਈ
[01:17.25] ਓਹ, ਮੈਂ ਕੀ ਕਮਾਲ ਦਾ ਕੰਮ ਕਰ ਦਿੱਤਾ
[01:22.48] ਅਤੇ ਸਭ ਕੁਝ ਸੁਨਹਿਰਾ ਹੋ ਗਿਆ
[01:30.73] ਤੇਰੀ ਇਹ ਮਾਸੂਮੀਅਤ, ਤੇਰਾ ਇਹ ਪਿਆਰਾ ਮੁੱਖੜਾ
[01:36.72] ਕਿਸੇ ਬੇਹੱਦ ਖ਼ੂਬਸੂਰਤ ਸੁਪਨੇ ਵਾਂਗ ਲੱਗਦਾ ਏ
[01:42.34] ਅਤੇ ਤੈਨੂੰ ਪਤਾ ਏ, ਮੈਂ ਤੈਨੂੰ ਕਿੰਨਾ ਪਿਆਰ ਕਰਦਾ ਹਾਂ
[01:50.51] ਤੂੰ ਜਾਣਦੀ ਏਂ ਕਿ ਮੈਂ ਤੇਰੇ ਤੇ ਮਰਦਾ ਹਾਂ
[01:57.00] ♪ (ਸੰਗੀਤ ਦਾ ਦੌਰ)
[02:15.48] ਮੈਂ ਦਰਿਆ ਪਾਰ ਕਰ ਆਇਆ
[02:18.18] ਮੈਂ ਤੇਰੇ ਲਈ ਹਰ ਹੱਦ ਪਾਰ ਕੀਤੀ
[02:23.32] ਓਹ, ਪਿਆਰ ਵਿੱਚ ਕੀ ਕੁਝ ਕਰ ਗੁਜ਼ਰਿਆ
[02:29.14] ਕਿਉਂਕਿ ਤੂੰ ਤਾਂ ਨੂਰ ਵਰਗੀ ਸੁਨਹਿਰੀ ਸੀ
[02:32.03] ਮੈਂ ਇੱਕ ਲਕੀਰ ਖਿੱਚੀ
[02:34.91] ਮੈਂ ਸਿਰਫ਼ ਤੇਰੇ ਲਈ ਉਹ ਲਕੀਰ ਖਿੱਚੀ
[02:40.30] ਓਹ, ਕਿੰਨੀ ਸੋਹਣੀ ਗੱਲ ਸੀ
[02:45.91] ਅਤੇ ਸਭ ਕੁਝ ਪਿਆਰ ਦੇ ਰੰਗ ਵਿੱਚ ਰੰਗਿਆ ਗਿਆ
[02:53.74] ਅਤੇ ਤੇਰੀ ਹਰ ਅਦਾ
[02:59.77] ਕਿਸੇ ਕਲਾ ਵਾਂਗ ਸੋਹਣੀ ਬਣ ਜਾਂਦੀ ਏ
[03:05.35] ਅਤੇ ਤੂੰ ਜਾਣਦੀ ਏਂ, ਤੇਰੇ ਲਈ ਮੈਂ ਖ਼ੁਦ ਨੂੰ ਵਾਰ ਦਿਆਂ
[03:13.63] ਤੇਰੇ ਲਈ ਮੈਂ ਆਪਣੀ ਜਾਨ ਵੀ ਵਾਰ ਦਿਆਂ
[03:20.00] ♪ (ਗਿਟਾਰ ਦਾ ਜਾਦੂ)
[03:37.82] ਇਹ ਬਿਲਕੁਲ ਸੱਚ ਏ
[03:41.18] ਵੇਖੋ ਉਹ ਤੇਰੇ ਲਈ ਕਿਵੇਂ ਚਮਕਦੇ ਨੇ
[03:46.70] ਵੇਖੋ ਉਹ ਤੇਰੇ ਲਈ ਕਿਵੇਂ ਜਗਮਗਾਉਂਦੇ ਨੇ
[03:52.11] ਵੇਖੋ ਕਿਵੇਂ ਚਮਕਦੇ ਨੇ
[03:57.84] ਵੇਖੋ ਉਹ ਤੇਰੇ ਲਈ ਕਿਵੇਂ ਚਮਕਦੇ ਨੇ
[04:03.26] ਵੇਖੋ ਤੇਰੇ ਲਈ ਉਹ ਕਿੰਨਾ ਖਿੜਦੇ ਨੇ
[04:09.07] ਵੇਖੋ ਉਹਨਾਂ ਦੀ ਇਹ ਚਮਕ
[04:11.90] ਤਾਰਿਆਂ ਵੱਲ ਵੇਖੋ
[04:14.33] ਵੇਖੋ ਉਹ ਸਿਰਫ਼ ਤੇਰੇ ਲਈ ਚਮਕਦੇ ਨੇ
[04:19.99] ਅਤੇ ਤੇਰੀ ਹਰ ਗੱਲ ਉੱਤੇ ਕੁਰਬਾਨ ਜਾਂਦੇ ਨੇ`,
   },

   'arijit singh - tum hi ho': {
      en: `[00:00.00] ♪ (Piano Intro)
[00:06.00] Hum tere bin ab reh nahi sakte
[00:12.50] Tere bina kya wajood mera
[00:19.20] Tujh se juda agar ho jaayenge
[00:25.50] Toh khud se hi ho jaayenge judaa
[00:32.00] Kyunki tum hi ho, ab tum hi ho
[00:38.50] Zindagi ab tum hi ho
[00:45.00] Chain bhi, mera dard bhi
[00:51.50] Meri aashiqui ab tum hi ho
[00:58.00] Tera mera rishta hai kaisa
[01:04.20] Ik pal door gawaara nahi
[01:10.50] Tere liye har roz hai jeete
[01:17.00] Tujhko diya mera waqt sabhi
[01:23.50] Koi lamha mera na ho tere bina
[01:29.80] Har saans pe naam tera
[01:36.00] Kyunki tum hi ho, ab tum hi ho
[01:42.50] Zindagi ab tum hi ho
[01:49.00] Chain bhi, mera dard bhi
[01:55.50] Meri aashiqui ab tum hi ho`,

      hi: `[00:00.00] ♪ (पियानो की मीठी शुरुआत)
[00:06.00] हम तेरे बिन अब रह नहीं सकते
[00:12.50] तेरे बिना क्या वजूद मेरा
[00:19.20] तुझ से जुदा अगर हो जायेंगे
[00:25.50] तो खुद से ही हो जायेंगे जुदा
[00:32.00] क्योंकि तुम ही हो, अब तुम ही हो
[00:38.50] ज़िंदगी अब तुम ही हो
[00:45.00] चैन भी, मेरा दर्द भी
[00:51.50] मेरी आशिक़ी अब तुम ही हो
[00:58.00] तेरा मेरा रिश्ता है कैसा
[01:04.20] इक पल दूर गवारा नहीं
[01:10.50] तेरे लिए हर रोज़ हैं जीते
[01:17.00] तुझको दिया मेरा वक्त सभी
[01:23.50] कोई लम्हा मेरा ना हो तेरे बिना
[01:29.80] हर साँस पे नाम तेरा
[01:36.00] क्योंकि तुम ही हो, अब तुम ही हो
[01:42.50] ज़िंदगी अब तुम ही हो
[01:49.00] चैन भी, मेरा दर्द भी
[01:55.50] मेरी आशिक़ी अब तुम ही हो`,

      pa: `[00:00.00] ♪ (ਪਿਆਨੋ ਦੀ ਮਿੱਠੀ ਧੁਨ)
[00:06.00] ਅਸੀਂ ਤੇਰੇ ਬਿਨਾਂ ਹੁਣ ਰਹਿ ਨਹੀਂ ਸਕਦੇ
[00:12.50] ਤੇਰੇ ਬਿਨਾਂ ਕੀ ਵਜੂਦ ਮੇਰਾ
[00:19.20] ਤੈਥੋਂ ਜੁਦਾ ਜੇ ਅਸੀਂ ਹੋ ਜਾਵਾਂਗੇ
[00:25.50] ਤਾਂ ਖ਼ੁਦ ਆਪਣੇ ਆਪ ਤੋਂ ਹੀ ਹੋ ਜਾਵਾਂਗੇ ਜੁਦਾ
[00:32.00] ਕਿਉਂਕਿ ਤੂੰ ਹੀ ਏਂ, ਹੁਣ ਤੂੰ ਹੀ ਏਂ
[00:38.50] ਜ਼ਿੰਦਗੀ ਹੁਣ ਤੂੰ ਹੀ ਏਂ
[00:45.00] ਚੈਨ ਵੀ, ਮੇਰਾ ਦਰਦ ਵੀ
[00:51.50] ਮੇਰੀ ਆਸ਼ਿਕ਼ੀ ਹੁਣ ਤੂੰ ਹੀ ਏਂ
[00:58.00] ਤੇਰਾ ਮੇਰਾ ਰਿਸ਼ਤਾ ਏ ਕੈਸਾ
[01:04.20] ਇੱਕ ਪਲ ਵੀ ਦੂਰੀ ਗਵਾਰਾ ਨਹੀਂ
[01:10.50] ਤੇਰੇ ਲਈ ਹਰ ਰੋਜ਼ ਹਾਂ ਜਿਊਂਦੇ
[01:17.00] ਤੈਨੂੰ ਦਿੱਤਾ ਮੇਰਾ ਵਕਤ ਸਾਰਾ
[01:23.50] ਕੋਈ ਪਲ ਨਾ ਲੰਘੇ ਤੇਰੇ ਬਿਨਾਂ
[01:29.80] ਹਰ ਸਾਹ ਉੱਤੇ ਨਾਮ ਤੇਰਾ
[01:36.00] ਕਿਉਂਕਿ ਤੂੰ ਹੀ ਏਂ, ਹੁਣ ਤੂੰ ਹੀ ਏਂ
[01:42.50] ਜ਼ਿੰਦਗੀ ਹੁਣ ਤੂੰ ਹੀ ਏਂ
[01:49.00] ਚੈਨ ਵੀ, ਮੇਰਾ ਦਰਦ ਵੀ
[01:55.50] ਮੇਰੀ ਆਸ਼ਿਕ਼ੀ ਹੁਣ ਤੂੰ ਹੀ ਏਂ`,
   },

   'diljit dosanjh - lover': {
      en: `[00:00.00] ♪ (Upbeat Synth Intro)
[00:08.50] Tera ni main, tera ni main lover
[00:13.20] Pehle din ton baneya lover
[00:17.80] Dil vich teri tasveer ae
[00:22.40] Tu hi taan meri taqdeer ae
[00:27.00] Karda haan kinna tenu pyaar ni
[00:31.50] Puchi na tu aiven baar baar ni
[00:36.20] Tera ni main lover, lover
[00:40.80] Pehle din ton lover, lover
[00:45.50] Jithe vi javein naal turanga
[00:50.00] Tere piche saare jag naal ladanga
[00:54.80] Akhiyan ch rakhna ae tenu sohniye
[00:59.20] Saahan ch vasaana ae tenu heeriye
[01:04.00] Tera ni main lover!`,

      hi: `[00:00.00] ♪ (एनर्जेटिक सिंथ की शुरुआत)
[00:08.50] तेरा नी मैं, तेरा नी मैं लवर
[00:13.20] पहले दिन से बना तेरा लवर
[00:17.80] दिल में बस तेरी तस्वीर है
[00:22.40] तू ही तो मेरी तक़दीर है
[00:27.00] करता हूँ कितना तुझसे प्यार नी
[00:31.50] पूछ ना तू यूँ ही बार-बार नी
[00:36.20] तेरा नी मैं लवर, लवर
[00:40.80] पहले दिन से लवर, लवर
[00:45.50] जहाँ भी तू जाए साथ चलूँगा
[00:50.00] तेरे लिए सारे ज़माने से लड़ूँगा
[00:54.80] आँखों में रखना है तुझको सोहणिए
[00:59.20] साँसों में बसाना है तुझको हीरिये
[01:04.00] तेरा नी मैं लवर!`,

      pa: `[00:00.00] ♪ (ਜੋਸ਼ੀਲੀ ਸਿੰਥ ਦੀ ਸ਼ੁਰੂਆਤ)
[00:08.50] ਤੇਰਾ ਨੀ ਮੈਂ, ਤੇਰਾ ਨੀ ਮੈਂ ਲਵਰ
[00:13.20] ਪਹਿਲੇ ਦਿਨ ਤੋਂ ਬਣਿਆ ਲਵਰ
[00:17.80] ਦਿਲ ਵਿੱਚ ਤੇਰੀ ਤਸਵੀਰ ਏ
[00:22.40] ਤੂੰ ਹੀ ਤਾਂ ਮੇਰੀ ਤਕਦੀਰ ਏ
[00:27.00] ਕਰਦਾ ਹਾਂ ਕਿੰਨਾ ਤੈਨੂੰ ਪਿਆਰ ਨੀ
[00:31.50] ਪੁੱਛੀਂ ਨਾ ਤੂੰ ਐਵੇਂ ਵਾਰ ਵਾਰ ਨੀ
[00:36.20] ਤੇਰਾ ਨੀ ਮੈਂ ਲਵਰ, ਲਵਰ
[00:40.80] ਪਹਿਲੇ ਦਿਨ ਤੋਂ ਲਵਰ, ਲਵਰ
[00:45.50] ਜਿੱਥੇ ਵੀ ਜਾਵੇਂ ਨਾਲ ਤੁਰਾਂਗਾ
[00:50.00] ਤੇਰੇ ਪਿੱਛੇ ਸਾਰੇ ਜੱਗ ਨਾਲ ਲੜਾਂਗਾ
[00:54.80] ਅੱਖੀਆਂ 'ਚ ਰੱਖਣਾ ਏ ਤੈਨੂੰ ਸੋਹਣੀਏ
[00:59.20] ਸਾਹਾਂ 'ਚ ਵਸਾਉਣਾ ਏ ਤੈਨੂੰ ਹੀਰੀਏ
[01:04.00] ਤੇਰਾ ਨੀ ਮੈਂ ਲਵਰ!`,
   },

   'sidhu moose wala - 295': {
      en: `[00:00.00] ♪ (Intro Beat)
[00:12.00] Dassan ki baare ess duniya de
[00:15.50] Ethe sach bolan te ban pendi
[00:19.00] Je tu sach bolega te 295 laggu
[00:23.50] Kise da sir phadke beh jaange
[00:27.00] Jo karde ne gallan pith piche
[00:30.80] Mure aake chup ho jaande ne
[00:34.50] Sidhu Moose Wala naam sunke
[00:38.20] Saare jande ne kaun khad da
[00:42.00] Sach naal khadna aukha hunda
[00:46.00] Par sach di hamesha jitt hundi!`,

      hi: `[00:00.00] ♪ (इंट्रो बीट)
[00:12.00] क्या बताऊँ इस ज़माने के बारे में
[00:15.50] यहाँ सच बोलने पर आफ़त आ जाती है
[00:19.00] अगर सच बोलोगे तो 295 लग जाएगी
[00:23.50] किसी का सिर पकड़ कर बैठ जाएँगे
[00:27.00] जो पीठ पीछे बातें बनाते हैं
[00:30.80] सामने आते ही चुप हो जाते हैं
[00:34.50] सिद्धू मूसे वाला नाम सुन कर
[00:38.20] सब जानते हैं कौन सीना तान के खड़ा रहता है
[00:42.00] सच के साथ खड़ा होना मुश्किल होता है
[00:46.00] लेकिन सच की हमेशा जीत होती है!`,

      pa: `[00:00.00] ♪ (ਦਮਦਾਰ ਬੀਟ)
[00:12.00] ਦੱਸਾਂ ਕੀ ਬਾਰੇ ਇਸ ਦੁਨੀਆਂ ਦੇ
[00:15.50] ਇੱਥੇ ਸੱਚ ਬੋਲਣ ਤੇ ਬਣ ਪੈਂਦੀ
[00:19.00] ਜੇ ਤੂੰ ਸੱਚ ਬੋਲੇਂਗਾ ਤੇ 295 ਲੱਗੂ
[00:23.50] ਕਿਸੇ ਦਾ ਸਿਰ ਫੜ ਕੇ ਬਹਿ ਜਾਣਗੇ
[00:27.00] ਜੋ ਕਰਦੇ ਨੇ ਗੱਲਾਂ ਪਿੱਠ ਪਿੱਛੇ
[00:30.80] ਮੂਹਰੇ ਆ ਕੇ ਚੁੱਪ ਹੋ ਜਾਂਦੇ ਨੇ
[00:34.50] ਸਿੱਧੂ ਮੂਸੇ ਵਾਲਾ ਨਾਮ ਸੁਣ ਕੇ
[00:38.20] ਸਾਰੇ ਜਾਣਦੇ ਨੇ ਕੌਣ ਖੜ੍ਹਦਾ
[00:42.00] ਸੱਚ ਨਾਲ ਖੜ੍ਹਨਾ ਔਖਾ ਹੁੰਦਾ
[00:46.00] ਪਰ ਸੱਚ ਦੀ ਹਮੇਸ਼ਾ ਜਿੱਤ ਹੁੰਦੀ!`,
   },

   'the weeknd - blinding lights': {
      en: `[00:00.00] ♪ (Synth Intro)
[00:13.20] Yeah
[00:15.80] I've been tryna call
[00:18.60] I've been on my own for long enough
[00:22.90] Maybe you can show me how to love, maybe
[00:29.80] I'm going through withdrawals
[00:33.40] You don't even have to do too much
[00:37.20] You can turn me on with just a touch, baby
[00:44.20] I look around and Sin City's cold and empty
[00:50.00] No one's around to judge me
[00:54.20] I can't see clearly when you're gone
[00:58.80] I said, ooh, I'm blinded by the lights
[01:06.10] No, I can't sleep until I feel your touch
[01:13.30] I said, ooh, I'm drowning in the night
[01:20.80] Oh, when I'm like this, you're the one I trust`,

      hi: `[00:00.00] ♪ (सिंथ म्यूज़िक)
[00:13.20] हाँ
[00:15.80] मैं तुम्हें पुकारने की कोशिश कर रहा हूँ
[00:18.60] मैं बहुत वक़्त से बिल्कुल तन्हा हूँ
[00:22.90] शायद तुम मुझे सिखा सको कि मोहब्बत क्या होती है
[00:29.80] तुम्हारी यादों का असर मुझ पर गहरा है
[00:33.40] तुम्हें कुछ ज़्यादा करने की ज़रूरत नहीं
[00:37.20] सिर्फ तुम्हारे एक छूने से दिल धड़क उठता है
[00:44.20] मैं चारों तरफ़ देखता हूँ, यह शहर सर्द और वीरान है
[00:50.00] यहाँ कोई मुझे परखने वाला नहीं है
[00:54.20] तुम्हारे जाने के बाद मुझे कुछ साफ़ नज़र नहीं आता
[00:58.80] मैंने कहा, ओह, इन चमकीली रोशनियों ने मुझे अंधा कर दिया है
[01:06.10] जब तक तुम्हारा अहसास न मिले, मुझे नींद नहीं आती
[01:13.30] मैंने कहा, ओह, मैं इस रात की गहराइयों में डूब रहा हूँ
[01:20.80] जब मेरी यह हालत होती है, तो सिर्फ तुम पर ही मेरा भरोसा होता है`,

      pa: `[00:00.00] ♪ (ਸਿੰਥ ਦਾ ਆਗਾਜ਼)
[00:13.20] ਹਾਂ
[00:15.80] ਮੈਂ ਤੈਨੂੰ ਆਵਾਜ਼ਾਂ ਮਾਰ ਰਿਹਾ ਹਾਂ
[00:18.60] ਮੈਂ ਬਹੁਤ ਚਿਰਾਂ ਤੋਂ ਇਕੱਲਾ ਪਿਆ ਹਾਂ
[00:22.90] ਸ਼ਾਇਦ ਤੂੰ ਮੈਨੂੰ ਸਿਖਾਵੇਂ ਕਿ ਪਿਆਰ ਕੀ ਹੁੰਦਾ ਏ
[00:29.80] ਤੇਰੀ ਯਾਦ ਮੈਨੂੰ ਅੰਦਰੋਂ ਤੜਫਾਉਂਦੀ ਏ
[00:33.40] ਤੈਨੂੰ ਬਹੁਤਾ ਕੁਝ ਕਰਨ ਦੀ ਲੋੜ ਨਹੀਂ
[00:37.20] ਬਸ ਤੇਰੇ ਇੱਕ ਛੋਹ ਨਾਲ ਦਿਲ ਖਿੜ ਜਾਂਦਾ ਏ
[00:44.20] ਮੈਂ ਆਸੇ-ਪਾਸੇ ਵੇਖਦਾ ਹਾਂ, ਇਹ ਸ਼ਹਿਰ ਠੰਢਾ ਤੇ ਸੁੰਨਾ ਏ
[00:50.00] ਕੋਈ ਨਹੀਂ ਜੋ ਮੇਰੇ ਦੁੱਖ ਨੂੰ ਸਮਝੇ
[00:54.20] ਜਦੋਂ ਤੂੰ ਦੂਰ ਹੁੰਦੀ ਏਂ ਮੈਨੂੰ ਕੁਝ ਨਹੀਂ ਸੁਝਦਾ
[00:58.80] ਮੈਂ ਕਿਹਾ, ਓਹ, ਇਹਨਾਂ ਤੇਜ਼ ਰੋਸ਼ਨੀਆਂ ਨੇ ਮੈਨੂੰ ਚੁੰਧਿਆ ਦਿੱਤਾ ਏ
[01:06.10] ਜਦੋਂ ਤੱਕ ਤੇਰਾ ਸਾਥ ਨਾ ਮਿਲੇ ਮੈਨੂੰ ਨੀਂਦ ਨਹੀਂ ਆਉਂਦੀ
[01:13.30] ਮੈਂ ਕਿਹਾ, ਓਹ, ਮੈਂ ਇਸ ਰਾਤ ਦੇ ਹਨੇਰੇ ਵਿੱਚ ਡੁੱਬ ਰਿਹਾ ਹਾਂ
[01:20.80] ਜਦੋਂ ਮੇਰਾ ਇਹ ਹਾਲ ਹੁੰਦਾ ਏ, ਤਾਂ ਸਿਰਫ਼ ਤੇਰੇ ਉੱਤੇ ਹੀ ਮੇਰਾ ਯਕੀਨ ਹੁੰਦਾ ਏ`,
   },

   'harmoniq - vanshi saini': {
      en: `[00:00.00] 🎵 Welcome to Harmoniq
[00:03.50] Experience music like never before
[00:07.20] Created by VANSHI SAINI
[00:11.80] Sleek design, synchronized lyrics, seamless sound
[00:16.50] Watch every line highlight as the beat flows
[00:21.00] Click any lyric line to jump right to that moment
[00:26.50] Enjoy your music with Harmoniq!`,

      hi: `[00:00.00] 🎵 हारमोनिक में आपका स्वागत है
[00:03.50] संगीत का ऐसा अनोखा अनुभव जैसा पहले कभी न हुआ हो
[00:07.20] वंशी सैनी द्वारा निर्मित
[00:11.80] आकर्षक डिज़ाइन, सिंक्रोनाइज़्ड लिरिक्स, बेहतरीन साउंड
[00:16.50] बीट के साथ हर पंक्ति को जगमगाते हुए देखें
[00:21.00] किसी भी पंक्ति पर क्लिक करके उसी क्षण पहुँचें
[00:26.50] हारमोनिक के साथ अपने संगीत का पूरा आनंद लें!`,

      pa: `[00:00.00] 🎵 ਹਾਰਮੋਨਿਕ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ
[00:03.50] ਸੰਗੀਤ ਦਾ ਅਜਿਹਾ ਅਨੰਦ ਜੋ ਪਹਿਲਾਂ ਕਦੇ ਨਾ ਮਿਲਿਆ ਹੋਵੇ
[00:07.20] ਵੰਸ਼ੀ ਸੈਣੀ ਦੁਆਰਾ ਤਿਆਰ ਕੀਤਾ ਗਿਆ
[00:11.80] ਸ਼ਾਨਦਾਰ ਡਿਜ਼ਾਈਨ, ਤਾਲ ਨਾਲ ਮਿਲਦੀਆਂ ਤੁਕਾਂ, ਲਾਜਵਾਬ ਆਵਾਜ਼
[00:16.50] ਤਾਲ ਦੇ ਨਾਲ ਹਰ ਸਤਰ ਨੂੰ ਚਮਕਦਿਆਂ ਵੇਖੋ
[00:21.00] ਕਿਸੇ ਵੀ ਤੁਕ 'ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਉਸੇ ਪਲ ਪਹੁੰਚੋ
[00:26.50] ਹਾਰਮੋਨਿਕ ਨਾਲ ਆਪਣੇ ਪਸੰਦੀਦਾ ਸੰਗੀਤ ਦਾ ਮਾਣੋ ਆਨੰਦ!`,
   },
};

/**
 * Roman phonetic transliteration maps for Hindi (Devanagari) & Punjabi (Gurmukhi)
 */
const HINDI_WORD_MAP = {
   hum: 'हम',
   tum: 'तुम',
   tere: 'तेरे',
   meri: 'मेरी',
   mera: 'मेरा',
   zindagi: 'ज़िंदगी',
   pyar: 'प्यार',
   pyaar: 'प्यार',
   aashiqui: 'आशिक़ी',
   dil: 'दिल',
   jaan: 'जान',
   dhadkan: 'धड़कन',
   naina: 'नैना',
   ankhiyan: 'अंखियाँ',
   saans: 'साँस',
   saansein: 'साँसें',
   rabba: 'रब्बा',
   ishq: 'इश्क़',
   mohabbat: 'मोहब्बत',
   khuda: 'ख़ुदा',
   sanam: 'सनम',
   deewana: 'दीवाना',
   sohna: 'सोहणा',
   sohniye: 'सोहणिए',
   kudiye: 'कुड़िए',
   munde: 'मुंडे',
   aaya: 'आया',
   gaya: 'गया',
   hoga: 'होगा',
   hogi: 'होगी',
   karna: 'करना',
   nahi: 'नहीं',
   nahin: 'नहीं',
   raat: 'रात',
   chaand: 'चाँद',
   suraj: 'सूरज',
   taare: 'तारे',
   aankhon: 'आँखों',
   khushi: 'ख़ुशी',
   dard: 'दर्द',
   yaad: 'याद',
   yaadein: 'यादें',
   duniya: 'दुनिया',
   jahaan: 'जहाँ',
   waqt: 'वक़्त',
};

const PUNJABI_WORD_MAP = {
   hum: 'ਅਸੀਂ',
   tum: 'ਤੁਸੀਂ',
   tere: 'ਤੇਰੇ',
   meri: 'ਮੇਰੀ',
   mera: 'ਮੇਰਾ',
   zindagi: 'ਜ਼ਿੰਦਗੀ',
   pyar: 'ਪਿਆਰ',
   pyaar: 'ਪਿਆਰ',
   aashiqui: 'ਆਸ਼ਿਕ਼ੀ',
   dil: 'ਦਿਲ',
   jaan: 'ਜਾਨ',
   dhadkan: 'ਧੜਕਣ',
   naina: 'ਨੈਣ',
   ankhiyan: 'ਅੱਖੀਆਂ',
   saans: 'ਸਾਹ',
   saansein: 'ਸਾਹਾਂ',
   rabba: 'ਰੱਬਾ',
   ishq: 'ਇਸ਼ਕ਼',
   mohabbat: 'ਮੁਹੱਬਤ',
   khuda: 'ਖ਼ੁਦਾ',
   sanam: 'ਸਨਮ',
   deewana: 'ਦੀਵਾਨਾ',
   sohna: 'ਸੋਹਣਾ',
   sohniye: 'ਸੋਹਣੀਏ',
   kudiye: 'ਕੁੜੀਏ',
   munde: 'ਮੁੰਡੇ',
   aaya: 'ਆਇਆ',
   gaya: 'ਗਿਆ',
   hoga: 'ਹੋਊਗਾ',
   hogi: 'ਹੋਊਗੀ',
   karna: 'ਕਰਨਾ',
   nahi: 'ਨਹੀਂ',
   nahin: 'ਨਹੀਂ',
   raat: 'ਰਾਤ',
   chaand: 'ਚੰਨ',
   suraj: 'ਸੂਰਜ',
   taare: 'ਤਾਰੇ',
   aankhon: 'ਅੱਖਾਂ',
   khushi: 'ਖ਼ੁਸ਼ੀ',
   dard: 'ਦਰਦ',
   yaad: 'ਯਾਦ',
   yaadein: 'ਯਾਦਾਂ',
   duniya: 'ਦੁਨੀਆਂ',
   jahaan: 'ਜਹਾਨ',
   waqt: 'ਵਕਤ',
   ni: 'ਨੀ',
   ve: 'ਵੇ',
   ton: 'ਤੋਂ',
   vich: 'ਵਿੱਚ',
   taan: 'ਤਾਂ',
   tenu: 'ਤੈਨੂੰ',
   mainu: 'ਮੈਨੂੰ',
   karda: 'ਕਰਦਾ',
   haan: 'ਹਾਂ',
   puchi: 'ਪੁੱਛੀਂ',
   aiven: 'ਐਵੇਂ',
   saare: 'ਸਾਰੇ',
   jag: 'ਜੱਗ',
   naal: 'ਨਾਲ',
   ladanga: 'ਲੜਾਂਗਾ',
   rakhna: 'ਰੱਖਣਾ',
   vasaana: 'ਵਸਾਉਣਾ',
   heeriye: 'ਹੀਰੀਏ',
};

/**
 * Smart Dynamic Transliterator for uncataloged songs.
 * Converts Roman lyrics lines to Devanagari (Hindi) or Gurmukhi (Punjabi)
 */
export const transliterateText = (text, targetLang) => {
   if (!text || typeof text !== 'string') return '';
   if (targetLang === 'en') return text;

   const map = targetLang === 'hi' ? HINDI_WORD_MAP : PUNJABI_WORD_MAP;

   // Replace known words with vocabulary words
   const words = text.split(/(\s+|[.,!?'"()-]+)/);
   const convertedWords = words.map(w => {
      const lower = w.toLowerCase();
      if (map[lower]) {
         return map[lower];
      }
      return w;
   });

   return convertedWords.join('');
};

/**
 * Returns available language options
 */
export const SUPPORTED_LYRICS_LANGUAGES = [
   { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
   { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
   { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🌾' },
];

/**
 * Translates an array of parsed LRC lines { time, text } into target language
 */
export const translateLrcLines = (lines, targetLang) => {
   if (!lines || !Array.isArray(lines) || lines.length === 0) return [];
   if (targetLang === 'en') return lines;

   // Transliterate line-by-line while preserving exact timestamps
   return lines.map(line => {
      // Don't translate instrumental tags like ♪ (Intro)
      if (line.text.startsWith('♪') || line.text.startsWith('(')) {
         return line;
      }

      const translated = transliterateText(line.text, targetLang);
      return {
         time: line.time,
         text: translated || line.text,
      };
   });
};
