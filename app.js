// app.min.js - Real-time Subscription ঠিক করা হয়েছে
const SUPABASE_URL='https://bwjjqidmeooyojjvtqjs.supabase.co';const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3ampxaWRtZW9veW9qanZ0cWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDIxMTAsImV4cCI6MjA5NjUxODExMH0.sRbG-Pwd8kgy94e9g7uuWhAj0-mH6JjOC7KXARxLIEk';const supabaseClient=supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

(async function testConnection(){try{const{data,error}=await supabaseClient.from('teer_previous_results').select('*').limit(1);if(error){console.error('❌ Supabase Error:',error)}else{console.log('✅ Supabase Connected Successfully!')}}catch(e){console.error('❌ Connection Failed:',e)}})();

const venueConfigs={shillong:{tableId:'resultsTableShillong',colorFr:'#0d47a1',colorSr:'#1565c0',selectId:'monthSelectShillong',venueName:'Shillong',displayName:'SHILLONG TEER',frTime:'4:15 PM',srTime:'5:10 PM'},shillongMorning:{tableId:'resultsTableShillongMorning',colorFr:'#e65100',colorSr:'#f57c00',selectId:'monthSelectShillongMorning',venueName:'Shillong Morning',displayName:'SHILLONG MORNING TEER',frTime:'10:30 AM',srTime:'11:30 AM'},shillongNight:{tableId:'resultsTableShillongNight',colorFr:'#1a237e',colorSr:'#283593',selectId:'monthSelectShillongNight',venueName:'Shillong Night',displayName:'SHILLONG NIGHT TEER',frTime:'11:10 PM',srTime:'12:10 AM'},khanapara:{tableId:'resultsTableKhanapara',colorFr:'#00695c',colorSr:'#00897b',selectId:'monthSelectKhanapara',venueName:'Khanapara',displayName:'KHANAPARA TEER',frTime:'4:10 PM',srTime:'5:05 PM'},khanaparaMorning:{tableId:'resultsTableKhanaparaMorning',colorFr:'#e65100',colorSr:'#f57c00',selectId:'monthSelectKhanaparaMorning',venueName:'Khanapara Morning',displayName:'KHANAPARA MORNING TEER',frTime:'10:30 AM',srTime:'11:30 AM'},khanaparaNight:{tableId:'resultsTableKhanaparaNight',colorFr:'#1a237e',colorSr:'#283593',selectId:'monthSelectKhanaparaNight',venueName:'Khanapara Night',displayName:'KHANAPARA NIGHT TEER',frTime:'11:10 PM',srTime:'12:10 AM'},juwai:{tableId:'resultsTableJuwai',colorFr:'#4a148c',colorSr:'#6a1b9a',selectId:'monthSelectJuwai',venueName:'Juwai',displayName:'JUWAI TEER',frTime:'2:30 PM',srTime:'3:15 PM'},juwaiMorning:{tableId:'resultsTableJuwaiMorning',colorFr:'#e65100',colorSr:'#f57c00',selectId:'monthSelectJuwaiMorning',venueName:'Juwai Morning',displayName:'JUWAI MORNING TEER',frTime:'10:30 AM',srTime:'11:30 AM'},juwaiNight:{tableId:'resultsTableJuwaiNight',colorFr:'#1a237e',colorSr:'#283593',selectId:'monthSelectJuwaiNight',venueName:'Juwai Night',displayName:'JUWAI NIGHT TEER',frTime:'9:30 PM',srTime:'10:30 PM'},morning:{tableId:'resultsTableMorning',colorFr:'#e65100',colorSr:'#f57c00',selectId:'monthSelectMorning',venueName:'Morning',displayName:'MORNING TEER',frTime:'10:30 AM',srTime:'11:30 AM'},night:{tableId:'resultsTableNight',colorFr:'#1a237e',colorSr:'#283593',selectId:'monthSelectNight',venueName:'Night',displayName:'NIGHT TEER',frTime:'11:10 PM',srTime:'12:10 AM'}};

function detectVenueFromPage(){const path=window.location.pathname;if(path.includes('khanapara'))return'Khanapara';if(path.includes('shillong'))return'Shillong';if(path.includes('juwai'))return'Juwai';if(path.includes('morning'))return'Morning';if(path.includes('night'))return'Night';return'Shillong'}

function detectPageType(){const path=window.location.pathname;if(path.includes('khanapara-teer-result.html')||path.includes('khanapara-previous.html')||path.includes('khanapara-common.html'))return'khanapara';if(path.includes('shillong-teer-result.html')||path.includes('shillong-previous.html')||path.includes('shillong-common.html'))return'shillong';if(path.includes('juwai-teer-result.html')||path.includes('juwai-previous.html')||path.includes('juwai-common.html'))return'juwai';if(path.includes('morning-teer-result.html')||path.includes('morning-previous.html')||path.includes('morning-common.html'))return'morning';if(path.includes('night-teer-result.html')||path.includes('night-previous.html')||path.includes('night-common.html'))return'night';return'home'}

function getVenuesForCurrentPage(){const pageType=detectPageType();const venueMap={khanapara:['khanapara','khanaparaMorning','khanaparaNight'],shillong:['shillong','shillongMorning','shillongNight'],juwai:['juwai','juwaiMorning','juwaiNight'],morning:['morning'],night:['night'],home:['shillong','khanapara','juwai','morning','night'],default:['shillong','khanapara','juwai','morning','night']};const ids=venueMap[pageType]||venueMap.default;return ids.filter(id=>venueConfigs[id])}

function parseTimeToMinutes(timeStr){if(!timeStr)return 0;const match=timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);if(!match)return 0;let[,hours,minutes,period]=match;hours=parseInt(hours);minutes=parseInt(minutes);if(period.toUpperCase()==='PM'&&hours!==12)hours+=12;if(period.toUpperCase()==='AM'&&hours===12)hours=0;return hours*60+minutes}

function getVenueTimings(venueId){const config=venueConfigs[venueId];if(!config)return null;return{fr:parseTimeToMinutes(config.frTime),sr:parseTimeToMinutes(config.srTime),frStr:config.frTime,srStr:config.srTime}}

function getTodayIST(){try{return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata'}).format(new Date())}catch(e){const now=new Date();const istOffset=5.5*60*60*1000;return new Date(now.getTime()+istOffset).toISOString().split('T')[0]}}

function getNightDate(){const today=getTodayIST();const dateObj=new Date(today);dateObj.setDate(dateObj.getDate()-1);return dateObj.toISOString().split('T')[0]}

function getYesterdayIST(){const date=new Date(getTodayIST());date.setDate(date.getDate()-1);return date.toISOString().split('T')[0]}

function isWaitingForVenue(venueId,roundType){const now=new Date();const currentMinutes=now.getHours()*60+now.getMinutes();const timings=getVenueTimings(venueId);if(!timings)return false;const roundTime=roundType==='fr'?timings.fr:timings.sr;const isNight=venueId.includes('Night')||venueId==='night';let targetTime=roundTime;if(isNight&&roundTime<currentMinutes&&roundTime<180){targetTime=roundTime+1440}const waitingStart=targetTime-10;const waitingEnd=targetTime+5;return currentMinutes>=waitingStart&&currentMinutes<waitingEnd}

let countdownInterval=null;let countdownVenues=[];

function startAllCountdowns(){if(countdownInterval){clearInterval(countdownInterval);countdownInterval=null}countdownVenues=getVenuesForCurrentPage();if(countdownVenues.length===0){countdownVenues=Object.keys(venueConfigs)}countdownVenues.forEach(updateVenueCountdown);countdownInterval=setInterval(()=>{countdownVenues.forEach(updateVenueCountdown)},1000)}

function updateVenueCountdown(venueId){const el=document.getElementById(`countdown_${venueId}`);if(!el)return;const now=new Date();const currentMinutes=now.getHours()*60+now.getMinutes();const timings=getVenueTimings(venueId);if(!timings){el.textContent='--:--:--';return}const isNight=venueId.includes('Night')||venueId==='night';let frTime=timings.fr;let srTime=timings.sr;if(isNight){if(frTime<currentMinutes&&frTime<180)frTime+=1440;if(srTime<currentMinutes&&srTime<180)srTime+=1440}let nextTime=null;if(currentMinutes<frTime){nextTime=frTime}else if(currentMinutes<srTime){nextTime=srTime}else{nextTime=frTime+1440}let diff=nextTime-currentMinutes;if(diff<0)diff+=1440;const hrs=Math.floor(diff/60);const mins=Math.floor(diff%60);const secs=Math.floor((diff%1)*60)||0;el.textContent=`${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;if(diff<30){el.style.color='#FF5722';el.style.fontWeight='700'}else{el.style.color='#ffffff';el.style.fontWeight='800'}}

async function loadPreviousResults(venue,monthIndex){const config=venueConfigs[venue];if(!config)return;const tbody=document.getElementById(config.tableId);if(!tbody)return;try{const year=2026;const month=String(monthIndex+1).padStart(2,'0');const firstDay=`${year}-${month}-01`;const lastDay=`${year}-${month}-${new Date(year,monthIndex+1,0).getDate()}`;const{data,error}=await supabaseClient.from('teer_previous_results').select('*').eq('venue',config.venueName).gte('result_date',firstDay).lte('result_date',lastDay).order('result_date',{ascending:false});let html='';const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];if(!error&&data&&data.length>0){data.forEach(row=>{const fr=row.fr_result||'--';const sr=row.sr_result||'--';const dateObj=new Date(row.result_date);const day=String(dateObj.getDate()).padStart(2,'0');const monthName=String(dateObj.getMonth()+1).padStart(2,'0');const yearNum=dateObj.getFullYear();const formattedDate=`${day}.${monthName}.${yearNum}`;html+=`<tr><td style="padding:8px;font-weight:700;color:#0d0a0a;">${formattedDate}</td><td style="padding:8px;font-weight:700;color:${config.colorFr};">${fr}</td><td style="padding:8px;font-weight:700;color:${config.colorSr};">${sr}</td></tr>`})}else{html=`<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">${monthNames[monthIndex]} ${year} - No data available</td></tr>`}tbody.innerHTML=html}catch(err){tbody.innerHTML=`<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">No data available</td></tr>`}}

function setupAllSelectors(){const currentMonth=6;Object.keys(venueConfigs).forEach(venue=>{const selectElement=document.getElementById(venueConfigs[venue].selectId);if(selectElement){selectElement.value=currentMonth.toString();loadPreviousResults(venue,currentMonth);selectElement.addEventListener('change',function(){loadPreviousResults(venue,parseInt(this.value))})}})}

async function saveLiveResultToPrevious(venue,frResult,srResult,resultDate){if(!frResult||!srResult||frResult==='--'||srResult==='--')return;try{const{data:existing,error:checkError}=await supabaseClient.from('teer_previous_results').select('*').eq('venue',venue).eq('result_date',resultDate).limit(1);if(checkError)return;if(existing&&existing.length>0){await supabaseClient.from('teer_previous_results').update({fr_result:frResult,sr_result:srResult,updated_at:new Date().toISOString()}).eq('id',existing[0].id)}else{await supabaseClient.from('teer_previous_results').insert({venue,result_date:resultDate,fr_result:frResult,sr_result:srResult,created_at:new Date().toISOString(),updated_at:new Date().toISOString()})}}catch(err){console.error(`❌ Error saving ${venue} previous result:`,err)}}

let isLoading=false;let globalLiveData={};let lastFetchTime={};

async function loadTodayResults(forceRefresh=false){if(isLoading&&!forceRefresh){return globalLiveData}try{isLoading=true;const today=getTodayIST();const nightDate=getNightDate();const yesterday=getYesterdayIST();const venues=getVenuesForCurrentPage();const liveData={};for(const venue of venues){const config=venueConfigs[venue];if(!config)continue;let dateToUse=today;if(venue==='shillongNight'||venue==='khanaparaNight'||venue==='juwaiNight'||venue==='night'){dateToUse=nightDate}let{data,error}=await supabaseClient.from('teer_live_results').select('*').eq('venue',config.venueName).eq('result_date',dateToUse);if(!error&&data&&data.length>0){liveData[venue]={fr:data[0].fr_result||'--',sr:data[0].sr_result||'--'};if(data[0].fr_result!=='--'&&data[0].sr_result!=='--'){await saveLiveResultToPrevious(config.venueName,data[0].fr_result,data[0].sr_result,dateToUse)}}else{const{data:prevData,error:prevError}=await supabaseClient.from('teer_previous_results').select('*').eq('venue',config.venueName).eq('result_date',dateToUse).limit(1);if(!prevError&&prevData&&prevData.length>0){liveData[venue]={fr:prevData[0].fr_result||'--',sr:prevData[0].sr_result||'--'}}else{liveData[venue]={fr:'--',sr:'--'}}}}globalLiveData=liveData;lastFetchTime={...lastFetchTime,[getTodayIST()]:Date.now()};renderTodayResults(liveData,today,nightDate);const currentVenue=detectVenueFromPage();const venueId=currentVenue.toLowerCase();if(liveData[venueId]){updateMetaTags(currentVenue,liveData[venueId].fr||'--',liveData[venueId].sr||'--',today)}Object.keys(venueConfigs).forEach(venue=>{const select=document.getElementById(venueConfigs[venue].selectId);if(select)loadPreviousResults(venue,parseInt(select.value))});return liveData}catch(err){console.error('❌ Error loading live results:',err);renderTodayResults({},getTodayIST(),getNightDate());return null}finally{isLoading=false}}

function renderTodayResults(liveData,todayDate,nightDate){const pageType=detectPageType();let venues=[];if(pageType==='khanapara'){venues=[{id:'khanapara',name:'KHANAPARA TEER',time1:'4:10 PM',time2:'5:05 PM',date:todayDate},{id:'khanaparaMorning',name:'KHANAPARA MORNING TEER',time1:'10:30 AM',time2:'11:30 AM',date:todayDate},{id:'khanaparaNight',name:'KHANAPARA NIGHT TEER',time1:'11:10 PM',time2:'12:10 AM',date:nightDate||getNightDate()}]}else if(pageType==='shillong'){venues=[{id:'shillong',name:'SHILLONG TEER',time1:'4:15 PM',time2:'5:10 PM',date:todayDate},{id:'shillongMorning',name:'SHILLONG MORNING TEER',time1:'10:30 AM',time2:'11:30 AM',date:todayDate},{id:'shillongNight',name:'SHILLONG NIGHT TEER',time1:'11:10 PM',time2:'12:10 AM',date:nightDate||getNightDate()}]}else if(pageType==='juwai'){venues=[{id:'juwai',name:'JUWAI TEER',time1:'2:30 PM',time2:'3:15 PM',date:todayDate},{id:'juwaiMorning',name:'JUWAI MORNING TEER',time1:'10:30 AM',time2:'11:30 AM',date:todayDate},{id:'juwaiNight',name:'JUWAI NIGHT TEER',time1:'9:30 PM',time2:'10:30 PM',date:nightDate||getNightDate()}]}else if(pageType==='morning'){venues=[{id:'morning',name:'MORNING TEER',time1:'10:30 AM',time2:'11:30 AM',date:todayDate}]}else if(pageType==='night'){venues=[{id:'night',name:'NIGHT TEER',time1:'11:10 PM',time2:'12:10 AM',date:nightDate||getNightDate()}]}else{venues=[{id:'shillong',name:'SHILLONG TEER',time1:'4:15 PM',time2:'5:10 PM',date:todayDate},{id:'khanapara',name:'KHANAPARA TEER',time1:'4:10 PM',time2:'5:05 PM',date:todayDate},{id:'juwai',name:'JUWAI TEER',time1:'2:30 PM',time2:'3:15 PM',date:todayDate},{id:'morning',name:'MORNING TEER',time1:'10:30 AM',time2:'11:30 AM',date:todayDate},{id:'night',name:'NIGHT TEER',time1:'11:10 PM',time2:'12:10 AM',date:nightDate||getNightDate()}]}const grid=document.getElementById('resultsGrid');if(!grid)return;let html='';venues.forEach(v=>{const data=liveData[v.id]||{fr:'--',sr:'--'};const hasData=(data.fr!=='--'||data.sr!=='--');const frDisplay=isWaitingForVenue(v.id,'fr')?`<div class="waiting-number-display">⏳ WAITING</div>`:`<div class="result-number">${data.fr}</div>`;const srDisplay=isWaitingForVenue(v.id,'sr')?`<div class="waiting-number-display">⏳ WAITING</div>`:`<div class="result-number">${data.sr}</div>`;const badgeClass=hasData?'live-result-badge':'flash-waiting';const badgeText=hasData?'🔴 LIVE':'⏳ WAITING';const config=venueConfigs[v.id];const color=config?config.colorFr:'#0d47a1';html+=`<div class="result-card" style="border-left-color:${color};"><div style="background:#0a3d6b;border-radius:8px;padding:0.2rem 0.5rem;margin-bottom:0.4rem;text-align:center;border:1px solid #ffcc00;"><div style="color:#ffcc00;font-size:0.65rem;font-weight:600;letter-spacing:0.5px;">⏳ NEXT ROUND IN: <span id="countdown_${v.id}" style="font-weight:800;color:#ffffff;background:#000000;padding:0.05rem 0.5rem;border-radius:4px;font-size:0.7rem;">--:--:--</span></div></div><div class="venue-header" style="background:linear-gradient(135deg,${color},${color}dd);"><span class="venue-name">🎯 ${v.name}</span></div><div class="info-row"><span class="date-box">📅 ${v.date}</span><span class="${badgeClass}">${badgeText}</span></div><div class="timing-dual"><div class="fr-box"><div>FIRST ROUND (${v.time1})</div>${frDisplay}</div><div class="sr-box"><div>SECOND ROUND (${v.time2})</div>${srDisplay}</div></div><div class="card-footer-buttons"><a href="${v.id}-previous.html" class="btn-previous-sky">Previous Result</a><a href="${v.id}-common.html" class="btn-common-small">Common Number</a></div></div>`});grid.innerHTML=html;setTimeout(startAllCountdowns,500)}

function updateMetaTags(venue,frResult,srResult,date){const formattedDate=date||getTodayIST();const title=document.querySelector('title');if(title){title.textContent=venue+' Teer Result Today | Live Updates & Predictions'}const metaDesc=document.querySelector('meta[name="description"]');if(metaDesc){metaDesc.content=venue+' result today - live FR & SR updates. Get expert predictions, house digits & ending digits for '+venue+' Teer.'}const metaKeywords=document.querySelector('meta[name="keywords"]');if(metaKeywords){metaKeywords.content=venue+' Teer Result Today, '+venue+' Teer Live Result, '+venue+' Teer FR SR Result, '+venue+' Teer House Number'}const ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle){ogTitle.content=venue+' Teer Result Today | Live Updates'}const ogDesc=document.querySelector('meta[property="og:description"]');if(ogDesc){ogDesc.content='Live '+venue+' Teer results with expert predictions and common numbers.'}}

let globalCommonData=null;

async function loadCommonNumbers(){try{const today=getTodayIST();const{data,error}=await supabaseClient.from('teer_common_numbers').select('*').eq('result_date',today).limit(1);if(!error&&data&&data.length>0){globalCommonData=data[0];renderCommonNumbersFromDB(data[0])}else{renderCommonNumbers()}}catch(err){renderCommonNumbers()}}

function renderCommonNumbersFromDB(data){const container=document.getElementById('commonTablesContainer');if(!container)return;const pageType=detectPageType();let venueIds=[];if(pageType==='khanapara'){venueIds=['khanapara']}else if(pageType==='shillong'){venueIds=['shillong']}else if(pageType==='juwai'){venueIds=['juwai','juwaiMorning','juwaiNight']}else if(pageType==='morning'){venueIds=['morning']}else if(pageType==='night'){venueIds=['night']}else{venueIds=['shillong','khanapara','juwai','morning','night']}let html='';venueIds.forEach(v=>{const config=venueConfigs[v];if(!config)return;const time1=config.frTime||'4:00 PM';const time2=config.srTime||'5:00 PM';html+=`<div class="common-venue-card"><div class="common-venue-title">🎯 ${config.displayName||config.venueName} - COMMON NUMBERS</div><table class="common-table"><thead><tr><th>Round</th><th>Direct Numbers</th><th>House Digit</th><th>Ending Digit</th></tr></thead><tbody><tr><td class="round-cell">FR (${time1})</td><td><span class="direct-num">${data[`${v}_fr_direct`]||'--'}</span></td><td><span class="house-num">${data[`${v}_fr_house`]||'--'}</span></td><td><span class="ending-num">${data[`${v}_fr_ending`]||'--'}</span></td></tr><tr><td class="round-cell">SR (${time2})</td><td><span class="direct-num">${data[`${v}_sr_direct`]||'--'}</span></td><td><span class="house-num">${data[`${v}_sr_house`]||'--'}</span></td><td><span class="ending-num">${data[`${v}_sr_ending`]||'--'}</span></td></tr></tbody></table></div>`});container.innerHTML=html}

function renderCommonNumbers(){renderCommonNumbersFromDB({shillong_fr_direct:'47, 68',shillong_fr_house:'4, 6',shillong_fr_ending:'7, 8',shillong_sr_direct:'86, 15',shillong_sr_house:'8, 1',shillong_sr_ending:'6, 5',khanapara_fr_direct:'35, 72',khanapara_fr_house:'3, 7',khanapara_fr_ending:'5, 2',khanapara_sr_direct:'64, 91',khanapara_sr_house:'6, 9',khanapara_sr_ending:'4, 1',juwai_fr_direct:'52, 77',juwai_fr_house:'5, 7',juwai_fr_ending:'2, 1',juwai_sr_direct:'88, 43',juwai_sr_house:'8, 4',juwai_sr_ending:'8, 3',juwaiMorning_fr_direct:'52, 77',juwaiMorning_fr_house:'5, 7',juwaiMorning_fr_ending:'2, 1',juwaiMorning_sr_direct:'88, 43',juwaiMorning_sr_house:'8, 4',juwaiMorning_sr_ending:'8, 3',juwaiNight_fr_direct:'52, 77',juwaiNight_fr_house:'5, 7',juwaiNight_fr_ending:'2, 1',juwaiNight_sr_direct:'88, 43',juwaiNight_sr_house:'8, 4',juwaiNight_sr_ending:'8, 3',morning_fr_direct:'52, 77',morning_fr_house:'5, 7',morning_fr_ending:'2, 1',morning_sr_direct:'88, 43',morning_sr_house:'8, 4',morning_sr_ending:'8, 3',night_fr_direct:'52, 77',night_fr_house:'5, 7',night_fr_ending:'2, 1',night_sr_direct:'88, 43',night_sr_house:'8, 4',night_sr_ending:'8, 3'})}

function loadTrendingNumbers(){const grid=document.getElementById('trendingGrid');if(!grid)return;const numbers=[{num:'68',count:5,hot:true},{num:'47',count:4,hot:true},{num:'86',count:4,hot:true},{num:'70',count:3,hot:false},{num:'31',count:3,hot:false},{num:'20',count:3,hot:false}];grid.innerHTML=numbers.map(n=>`<div class="trending-item"><div class="t-number">${n.num}</div><div class="t-count">${n.count} বার</div>${n.hot?'<div class="t-hot">🔥 হট</div>':''}</div>`).join('')}

function loadLeaderboard(){const tbody=document.getElementById('leaderboardBody');if(!tbody)return;const users=[{name:'Rahul Das',correct:47,total:50,rate:94},{name:'Suman Mistry',correct:43,total:48,rate:89},{name:'Riya Sen',correct:41,total:47,rate:87}];tbody.innerHTML=users.map((u,i)=>`<tr><td class="rank-${i+1}">${i+1}</td><td>${u.name}</td><td>${u.correct}</td><td>${u.total}</td><td>${u.rate}%</td></tr>`).join('')}

function showToast(message){const toast=document.createElement('div');toast.className='toast-notification';toast.textContent=message;document.body.appendChild(toast);setTimeout(()=>{toast.style.opacity='0';toast.style.transition='opacity 0.3s';setTimeout(()=>toast.remove(),300)},3000)}

function shareOnFacebook(){window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,'_blank','width=600,height=400')}

function shareOnWhatsApp(){window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(document.title)}%20-%20${encodeURIComponent(window.location.href)}`,'_blank')}

function shareOnTwitter(){window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`,'_blank','width=600,height=400')}

function shareOnTelegram(){window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`,'_blank')}

function copyLink(){navigator.clipboard.writeText(window.location.href).then(()=>showToast('✅ লিংক কপি হয়েছে!')).catch(()=>showToast('❌ কপি করতে ব্যর্থ!'))}

function addComment(){const nameInput=document.getElementById('commentName');const textInput=document.getElementById('commentInput');const name=nameInput.value.trim()||'অতিথি';const text=textInput.value.trim();if(!text){showToast('❌ দয়া করে কিছু লিখুন!');return}const list=document.getElementById('commentList');const item=document.createElement('div');item.className='comment-item';item.innerHTML=`<div class="c-avatar">${name.charAt(0).toUpperCase()}</div><div class="c-body"><div class="c-name">${name}</div><div class="c-text">${text}</div><div class="c-time">${new Date().toLocaleTimeString('bn-BD',{hour:'2-digit',minute:'2-digit'})}</div></div>`;list.insertBefore(item,list.firstChild);textInput.value='';showToast('✅ আপনার মন্তব্য পোস্ট হয়েছে!')}

function subscribeNewsletter(){const email=document.getElementById('newsletterEmail').value.trim();const msg=document.getElementById('newsletterMsg');if(!email||!email.includes('@')){msg.innerHTML='❌ দয়া করে সঠিক ইমেইল দিন!';msg.style.color='#cc0000';return}msg.innerHTML='✅ সাবস্ক্রাইব সম্পূর্ণ! আমরা শীঘ্রই আপডেট পাঠাব。';msg.style.color='#cc0000';document.getElementById('newsletterEmail').value=''}

const dreamChartData=[{dream:"Snake / সাপ",direct:"05, 33, 77",house:"7",ending:"1"},{dream:"Tiger / বাঘ",direct:"28, 44, 66",house:"3",ending:"9"},{dream:"Lion / সিংহ",direct:"32, 55, 88",house:"8",ending:"4"},{dream:"Elephant / হাতি",direct:"47, 70, 99",house:"6",ending:"0"},{dream:"Horse / ঘোড়া",direct:"19, 41, 63",house:"2",ending:"4"},{dream:"Dog / কুকুর",direct:"24, 46, 68",house:"6",ending:"9"},{dream:"Cat / বিড়াল",direct:"18, 40, 62",house:"0",ending:"5"},{dream:"Water / পানি",direct:"02, 24, 46",house:"1",ending:"3"}];

function renderDreamChart(){const tbody=document.getElementById('dreamChartBody');if(!tbody)return;tbody.innerHTML=dreamChartData.map(item=>`<tr><td style="padding:10px;"><strong>${item.dream}</strong></td><td style="padding:10px;">${item.direct}</td><td style="padding:10px;">${item.house}</td><td style="padding:10px;">${item.ending}</td></tr>`).join('')}

function dreamToNum(t){if(!t)return 24;const m={snake:5,tiger:28,lion:32,elephant:47,horse:19,dog:24,cat:18,water:2,"সাপ":5,"বাঘ":28,"সিংহ":32,"হাতি":47,"ঘোড়া":19,"কুকুর":24,"বিড়াল":18,"পানি":2};let l=t.toLowerCase();for(let[k,v]of Object.entries(m))if(l.includes(k))return v;let h=0;for(let i=0;i<l.length;i++)h=((h<<5)-h)+l.charCodeAt(i);return Math.abs(h)%100||24}

function getHENumbers(n){let x=n%100;return{house:[((x*3+7)%10).toString(),((x*5+11)%10).toString()],ending:[((x*9+17)%10).toString(),((x*11+23)%10).toString()]}}

// ============================================================
// 🔥 REAL-TIME SUBSCRIPTION (ঠিক করা হয়েছে)
// ============================================================
function subscribeToCommonNumbers(){
    console.log('🔄 Subscribing to common numbers...');
    const channel = supabaseClient.channel('common-numbers-changes');
    channel.on('postgres_changes', 
        { event: '*', schema: 'public', table: 'teer_common_numbers' },
        (payload) => {
            console.log('🔔 Common numbers update received:', payload);
            const today = getTodayIST();
            if (payload.new && payload.new.result_date === today) {
                globalCommonData = payload.new;
                renderCommonNumbersFromDB(payload.new);
                showToast('🔄 Common numbers updated!');
            } else {
                loadCommonNumbers();
            }
        }
    ).subscribe((status) => {
        console.log('📡 Common numbers subscription status:', status);
    });
    return channel;
}

function subscribeToLiveResults(){
    console.log('🔄 Subscribing to live results...');
    const channel = supabaseClient.channel('live-results-changes');
    channel.on('postgres_changes', 
        { event: '*', schema: 'public', table: 'teer_live_results' },
        async (payload) => {
            console.log('🔔 Live results update received:', payload);
            const currentVenues = getVenuesForCurrentPage();
            const venueId = Object.keys(venueConfigs).find(key => 
                venueConfigs[key].venueName === payload.new?.venue
            );
            if (venueId && currentVenues.includes(venueId)) {
                console.log(`✅ Updating UI for ${venueId}`);
                if (payload.new?.fr_result !== '--' && payload.new?.sr_result !== '--') {
                    await saveLiveResultToPrevious(
                        payload.new.venue, 
                        payload.new.fr_result, 
                        payload.new.sr_result, 
                        payload.new.result_date
                    );
                }
                await loadTodayResults(true);
                showToast(`🔄 ${payload.new?.venue} result updated!`);
            } else {
                console.log(`⏭️ Update for ${payload.new?.venue} not on current page, skipping UI update`);
            }
        }
    ).subscribe((status) => {
        console.log('📡 Live results subscription status:', status);
    });
    return channel;
}

function forceRefreshResults(){console.log('🔄 Force refreshing results...');showToast('🔄 Refreshing results...');lastFetchTime={};globalLiveData={};loadTodayResults(true).then(()=>{showToast('✅ Results refreshed successfully!')}).catch((err)=>{console.error('❌ Refresh failed:',err);showToast('❌ Failed to refresh results')})}

document.addEventListener('DOMContentLoaded',function(){
    console.log('📄 Page loaded:',window.location.pathname);
    console.log('📄 Page type:',detectPageType());
    
    // Load initial data
    loadTodayResults();
    loadCommonNumbers();
    setupAllSelectors();
    renderDreamChart();
    loadTrendingNumbers();
    loadLeaderboard();
    
    // Real-time subscriptions
    subscribeToCommonNumbers();
    subscribeToLiveResults();
    
    const path=window.location.pathname;
    if(path.includes('shillong-teer-result.html')||path.includes('shillong-previous.html')||path.includes('shillong-common.html')){loadShillongPageData()}
    else if(path.includes('khanapara-teer-result.html')||path.includes('khanapara-previous.html')||path.includes('khanapara-common.html')){loadKhanaparaPageData()}
    else if(path.includes('juwai-teer-result.html')||path.includes('juwai-previous.html')||path.includes('juwai-common.html')){loadJuwaiPageData()}
    else if(path.includes('morning-teer-result.html')||path.includes('morning-previous.html')||path.includes('morning-common.html')){loadMorningPageData()}
    else if(path.includes('night-teer-result.html')||path.includes('night-previous.html')||path.includes('night-common.html')){loadNightPageData()}
    
    const refreshBtn=document.getElementById('refreshResultsBtn');
    if(refreshBtn){refreshBtn.addEventListener('click',forceRefreshResults)}
    
    const predictBtn=document.getElementById('predictDreamBtn');
    if(predictBtn){predictBtn.addEventListener('click',function(){let inp=document.getElementById('dreamInput').value.trim();if(!inp){showToast('❌ দয়া করে একটি স্বপ্নের শব্দ লিখুন!');return}let num=dreamToNum(inp);let he=getHENumbers(num);document.getElementById('dreamDisplayText').innerHTML=`💭 Dream: <strong>${inp}</strong> → Number: <strong>${num}</strong>`;document.getElementById('houseDigit1').innerText=he.house[0];document.getElementById('houseDigit2').innerText=he.house[1];document.getElementById('endingDigit1').innerText=he.ending[0];document.getElementById('endingDigit2').innerText=he.ending[1];showToast('✅ স্বপ্নের নাম্বার তৈরি হয়েছে!')})}
    
    document.querySelectorAll('.faq-question').forEach(q=>{q.addEventListener('click',function(){let a=this.nextElementSibling;if(a){a.classList.toggle('show');this.querySelector('.faq-icon').innerHTML=a.classList.contains('show')?'−':'+'}})})});
    
    document.getElementById('closeLiveModalBtn')?.addEventListener('click',closeModals);
    document.getElementById('closePrevModalBtn')?.addEventListener('click',closeModals);
    window.addEventListener('click',function(e){if(e.target.classList.contains('modal'))closeModals()});
    
    setInterval(()=>{if(!document.hidden){loadTodayResults(true)}},120000)
});

document.addEventListener('visibilitychange',function(){if(!document.hidden){loadTodayResults(true)}});

async function loadShillongPageData(){await loadPreviousResults('shillong',6)}
async function loadKhanaparaPageData(){await loadPreviousResults('khanapara',6)}
async function loadJuwaiPageData(){await loadPreviousResults('juwai',6)}
async function loadMorningPageData(){await loadPreviousResults('morning',6)}
async function loadNightPageData(){await loadPreviousResults('night',6)}

function closeModals(){const lm=document.getElementById('liveModalWin');const pm=document.getElementById('prevModalWin');if(lm)lm.style.display='none';if(pm)pm.style.display='none'}

function showBangla(){showToast('বাংলা ভার্সন সক্রিয়। পুরো সাইট বাংলা ও ইংরেজিতে দেখা যাচ্ছে。')}
function showEnglish(){showToast('English version active. Site is fully bilingual.')}

// VIP System
document.addEventListener('DOMContentLoaded',function(){
    const vipBtn=document.getElementById('vipUnlockBtn');
    const vipModal=document.getElementById('vipModal');
    const vipModalClose=document.getElementById('vipModalClose');
    const vipNumberValue=document.getElementById('vipNumberValue');
    const vipExtraInfo=document.getElementById('vipExtraInfo');
    const vipStatusText=document.getElementById('vipStatusText');
    if(!vipBtn)return;
    let isUnlocking=false;
    let countdownInterval=null;
    let adWindow=null;
    
    async function loadVIPNumberFromSupabase(){
        try{
            const today=getTodayIST();
            const{data,error}=await supabaseClient.from('teer_common_numbers').select('*').eq('result_date',today).limit(1);
            if(error||!data||data.length===0)return null;
            const row=data[0];
            return`${row.shillong_fr_direct||'--'} | ${row.shillong_sr_direct||'--'}`;
        }catch(err){return null}
    }
    
    function startCountdown(seconds,onComplete){
        let remaining=seconds;
        if(vipStatusText){vipStatusText.textContent=`⏳ অনুগ্রহ করে অপেক্ষা করুন... ${remaining} সেকেন্ড বাকি`;vipStatusText.style.color='#ff9800'}
        if(vipBtn){vipBtn.textContent=`⏳ ${remaining}s`;vipBtn.disabled=true}
        try{adWindow=window.open('https://omg10.com/4/11160871','_blank')}catch(e){}
        if(countdownInterval)clearInterval(countdownInterval);
        countdownInterval=setInterval(function(){
            remaining--;
            if(remaining>0){
                if(vipStatusText)vipStatusText.textContent=`⏳ অনুগ্রহ করে অপেক্ষা করুন... ${remaining} সেকেন্ড বাকি`;
                if(vipBtn)vipBtn.textContent=`⏳ ${remaining}s`;
            }else{
                clearInterval(countdownInterval);
                countdownInterval=null;
                if(vipBtn)vipBtn.textContent='⏳ লোড হচ্ছে...';
                if(vipStatusText)vipStatusText.textContent='⏳ VIP নাম্বার লোড হচ্ছে...';
                try{if(adWindow&&!adWindow.closed)adWindow.close()}catch(e){}
                adWindow=null;
                onComplete();
            }
        },1000);
    }
    
    window.unlockVIP=async function(){
        if(isUnlocking){
            if(vipStatusText){vipStatusText.textContent='⏳ ইতিমধ্যে প্রক্রিয়া চলছে...';vipStatusText.style.color='#ff9800'}
            return;
        }
        isUnlocking=true;
        if(countdownInterval){clearInterval(countdownInterval);countdownInterval=null}
        if(adWindow&&!adWindow.closed){try{adWindow.close()}catch(e){}adWindow=null}
        startCountdown(5,async function(){
            try{
                const vipNumber=await loadVIPNumberFromSupabase();
                if(vipNumber){
                    if(vipNumberValue)vipNumberValue.textContent=vipNumber;
                    if(vipExtraInfo)vipExtraInfo.innerHTML='✅ <span style="color:#008000;">VIP Number unlocked successfully! আজকের স্পেশাল নাম্বার。</span>';
                    if(vipStatusText){vipStatusText.textContent='✅ VIP নাম্বার আনলক সম্পূর্ণ!';vipStatusText.style.color='#008000'}
                }else{
                    if(vipNumberValue)vipNumberValue.textContent='47, 68 | 86, 15';
                    if(vipExtraInfo)vipExtraInfo.innerHTML='⚠️ <span style="color:#ff9800;">[Demo Mode] আজকের ডেটা নেই, ডিফল্ট দেখানো হচ্ছে。</span>';
                    if(vipStatusText){vipStatusText.textContent='⚠️ VIP নাম্বার লোড হয়েছে (Demo Mode)';vipStatusText.style.color='#ff9800'}
                }
                if(vipModal)vipModal.classList.add('active');
            }catch(err){
                if(vipStatusText){vipStatusText.textContent='❌ VIP আনলক করতে ব্যর্থ! আবার চেষ্টা করুন।';vipStatusText.style.color='#cc0000'}
            }
            if(vipBtn){vipBtn.disabled=false;vipBtn.textContent='🔓 আনলক করুন / Unlock Now'}
            isUnlocking=false;
        });
    };
    
    if(vipBtn){vipBtn.addEventListener('click',window.unlockVIP)}
    if(vipModalClose){vipModalClose.addEventListener('click',function(){
        if(vipModal)vipModal.classList.remove('active');
        if(countdownInterval){clearInterval(countdownInterval);countdownInterval=null}
        if(vipBtn){vipBtn.disabled=false;vipBtn.textContent='🔓 আনলক করুন / Unlock Now'}
        isUnlocking=false;
    })}
    if(vipModal){vipModal.addEventListener('click',function(e){
        if(e.target===vipModal){
            vipModal.classList.remove('active');
            if(countdownInterval){clearInterval(countdownInterval);countdownInterval=null}
            if(vipBtn){vipBtn.disabled=false;vipBtn.textContent='🔓 আনলক করুন / Unlock Now'}
            isUnlocking=false;
        }
    })}
    console.log('✅ VIP System (Timer) Loaded Successfully!');
});

console.log('✅ App.js loaded successfully with all features!');
console.log('📌 Features: Live Results, Previous Results, Common Numbers, Dream Predictor, VIP System, Comments, Countdown, Real-time Updates');
console.log('🏹 Venues: Shillong, Shillong Morning, Shillong Night, Khanapara, Khanapara Morning, Khanapara Night, Juwai, Juwai Morning, Juwai Night, Morning, Night');
console.log('🔄 Real-time subscriptions active for live results and common numbers');
console.log('⏰ Countdown updates every second for all venues');
console.log('♻️ Auto-refresh every 2 minutes');
