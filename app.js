// ============================================================
// 🔥 SUPABASE SETUP (সঠিক Anon Key)
// ============================================================
const SUPABASE_URL = 'https://bwjjqidmeooyojjvtqjs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3ampxaWRtZW9veW9qanZ0cWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDIxMTAsImV4cCI6MjA5NjUxODExMH0.sRbG-Pwd8kgy94e9g7uuWhAj0-mH6JjOC7KXARxLIEk';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// 🔥 TEST: Supabase Connection Check
// ============================================================
(async function testConnection() {
    try {
        const { data, error } = await supabaseClient
            .from('teer_previous_results')
            .select('*')
            .limit(1);
        
        if (error) {
            console.error('❌ Supabase Error:', error);
        } else {
            console.log('✅ Supabase Connected Successfully!');
            console.log('📊 Sample Data:', data);
        }
    } catch (e) {
        console.error('❌ Connection Failed:', e);
    }
})();

// ============================================================
// 🔥 Venue Configuration for Previous Results
// ============================================================
const venueConfigs = {
    shillong: { tableId: 'resultsTableShillong', colorFr: '#0d6b3d', colorSr: '#0a3d6b', selectId: 'monthSelectShillong' },
    khanapara: { tableId: 'resultsTableKhanapara', colorFr: '#0a3d6b', colorSr: '#0a3d6b', selectId: 'monthSelectKhanapara' },
    juwai: { tableId: 'resultsTableJuwai', colorFr: '#0a2a5a', colorSr: '#0a2a5a', selectId: 'monthSelectJuwai' },
    morning: { tableId: 'resultsTableMorning', colorFr: '#cc9900', colorSr: '#cc9900', selectId: 'monthSelectMorning' },
    night: { tableId: 'resultsTableNight', colorFr: '#3d2a2a', colorSr: '#3d2a2a', selectId: 'monthSelectNight' }
};

// ============================================================
// 🔥 ডাইনামিক Previous Results Load ফাংশন
// ============================================================
async function loadPreviousResults(venue, monthIndex) {
    const config = venueConfigs[venue];
    if (!config) return;

    const tbody = document.getElementById(config.tableId);
    if (!tbody) return;
    
    try {
        const year = 2026;
        const month = String(monthIndex + 1).padStart(2, '0');
        const firstDay = `${year}-${month}-01`;
        const lastDay = `${year}-${month}-${new Date(year, monthIndex + 1, 0).getDate()}`;
        
        const { data, error } = await supabaseClient
            .from('teer_previous_results')
            .select('*')
            .eq('venue', venue)
            .gte('result_date', firstDay)
            .lte('result_date', lastDay)
            .order('result_date', { ascending: false });
            
        let html = '';
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        if (!error && data && data.length > 0) {
            data.forEach(row => {
                const fr = row.fr_result || '--';
                const sr = row.sr_result || '--';
                html += `<tr>
                    <td style="padding:8px; font-weight:700; color:#0d0a0a;">${row.result_date}</td>
                    <td style="padding:8px; font-weight:700; color:${config.colorFr};">${fr}</td>
                    <td style="padding:8px; font-weight:700; color:${config.colorSr};">${sr}</td>
                </tr>`;
            });
        } else {
            html = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">${monthNames[monthIndex]} ${year} - No data available</td></tr>`;
        }
        
        tbody.innerHTML = html;
        
    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">No data available</td></tr>`;
    }
}

// ============================================================
// 🔥 ডাইনামিক Selector Setup
// ============================================================
function setupAllSelectors() {
    const currentMonth = 6; // July
    
    Object.keys(venueConfigs).forEach(venue => {
        const selectElement = document.getElementById(venueConfigs[venue].selectId);
        if (selectElement) {
            selectElement.value = currentMonth.toString();
            loadPreviousResults(venue, currentMonth);
            
            selectElement.addEventListener('change', function() {
                loadPreviousResults(venue, parseInt(this.value));
            });
        }
    });
}

// ============================================================
// 🔥 IST TIME ZONE FIX
// ============================================================
function getTodayIST() {
    try {
        return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
    } catch (e) {
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000;
        return new Date(now.getTime() + istOffset).toISOString().split('T')[0];
    }
}

// ============================================================
// 🔥 NIGHT TEER - গতকালের তারিখ দেখাবে
// ============================================================
function getNightDate() {
    const today = getTodayIST();
    const dateObj = new Date(today);
    dateObj.setDate(dateObj.getDate() - 1);
    return dateObj.toISOString().split('T')[0];
}

// ============================================================
// 🔥 WAITING চেক - সঠিক সময় অনুযায়ী
// ============================================================
function isWaitingForVenue(venueId, roundType) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    const timings = {
        shillong: { fr: 16.25 * 60, sr: 17.166 * 60 },
        khanapara: { fr: 16.166 * 60, sr: 17.083 * 60 },
        juwai: { fr: 14.5 * 60, sr: 15.25 * 60 },
        morning: { fr: 10.5 * 60, sr: 11.5 * 60 },
        night: { fr: 23.166 * 60, sr: 24.166 * 60 }
    };
    
    const venueTime = timings[venueId];
    if (!venueTime) return false;
    
    const roundTime = roundType === 'fr' ? venueTime.fr : venueTime.sr;
    const waitingStart = roundTime - 10;
    
    if (venueId === 'night') {
        if (roundType === 'fr') {
            return totalMinutes >= (23 * 60) && totalMinutes < (23 * 60 + 10);
        } else if (roundType === 'sr') {
            return totalMinutes >= 0 && totalMinutes < 10;
        }
    }
    
    return totalMinutes >= waitingStart && totalMinutes < roundTime;
}

// ============================================================
// ⏳ কাউন্টডাউন
// ============================================================
let countdownInterval = null;

function startAllCountdowns() {
    if (countdownInterval) clearInterval(countdownInterval);
    const venues = ['shillong', 'khanapara', 'juwai', 'morning', 'night'];
    countdownInterval = setInterval(() => {
        venues.forEach(updateVenueCountdown);
    }, 1000);
}

function updateVenueCountdown(venueId) {
    const el = document.getElementById(`countdown_${venueId}`);
    if (!el) return;
    
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    const timings = {
        shillong: { fr: 16.25 * 60, sr: 17.166 * 60 },
        khanapara: { fr: 16.166 * 60, sr: 17.083 * 60 },
        juwai: { fr: 14.5 * 60, sr: 15.25 * 60 },
        morning: { fr: 10.5 * 60, sr: 11.5 * 60 },
        night: { fr: 23.166 * 60, sr: 24.166 * 60 }
    };
    
    const venueTimes = timings[venueId];
    if (!venueTimes) return;
    
    let nextTime = null;
    if (totalMinutes < venueTimes.fr) nextTime = venueTimes.fr;
    else if (totalMinutes < venueTimes.sr) nextTime = venueTimes.sr;
    else nextTime = venueTimes.fr + (24 * 60);
    
    let diff = nextTime - totalMinutes;
    if (diff < 0) diff += 24 * 60;
    
    const hrs = Math.floor(diff / 60);
    const mins = Math.floor(diff % 60);
    const secs = Math.floor((diff % 1) * 60);
    
    el.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ============================================================
// 🔥 অটো-সেভ লাইভ রেজাল্ট টু প্রিভিয়াস রেজাল্ট
// ============================================================
async function saveLiveResultToPrevious(venue, frResult, srResult, resultDate) {
    if (!frResult || !srResult || frResult === '--' || srResult === '--') return;

    try {
        const { data: existing, error: checkError } = await supabaseClient
            .from('teer_previous_results')
            .select('*')
            .eq('venue', venue)
            .eq('result_date', resultDate)
            .limit(1);

        if (checkError) return;

        if (existing && existing.length > 0) {
            await supabaseClient
                .from('teer_previous_results')
                .update({ fr_result: frResult, sr_result: srResult, updated_at: new Date().toISOString() })
                .eq('id', existing[0].id);
        } else {
            await supabaseClient
                .from('teer_previous_results')
                .insert({ venue, result_date: resultDate, fr_result: frResult, sr_result: srResult, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
        }
    } catch (err) {
        console.error(`❌ Error saving ${venue} previous result:`, err);
    }
}

// ============================================================
// 🔥 লাইভ রেজাল্ট লোড
// ============================================================
async function loadTodayResults() {
    try {
        const today = getTodayIST();
        const nightDate = getNightDate();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const venues = ['shillong', 'khanapara', 'juwai', 'morning'];
        const liveData = {};
        
        for (const venue of venues) {
            let { data, error } = await supabaseClient
                .from('teer_live_results')
                .select('*')
                .eq('venue', venue)
                .eq('result_date', today);
                
            if (!error && data && data.length > 0) {
                liveData[venue] = { fr: data[0].fr_result || '--', sr: data[0].sr_result || '--' };
                if (data[0].fr_result !== '--' && data[0].sr_result !== '--') {
                    await saveLiveResultToPrevious(venue, data[0].fr_result, data[0].sr_result, today);
                }
            } else {
                const { data: prevData, error: prevError } = await supabaseClient
                    .from('teer_live_results')
                    .select('*')
                    .eq('venue', venue)
                    .eq('result_date', yesterdayStr)
                    .limit(1);
                liveData[venue] = (!prevError && prevData && prevData.length > 0) 
                    ? { fr: prevData[0].fr_result || '--', sr: prevData[0].sr_result || '--' } 
                    : { fr: '--', sr: '--' };
            }
        }
        
        const { data: nightData, error: nightError } = await supabaseClient
            .from('teer_live_results')
            .select('*')
            .eq('venue', 'night')
            .eq('result_date', nightDate);
            
        if (!nightError && nightData && nightData.length > 0) {
            liveData['night'] = { fr: nightData[0].fr_result || '--', sr: nightData[0].sr_result || '--' };
            if (nightData[0].fr_result !== '--' && nightData[0].sr_result !== '--') {
                await saveLiveResultToPrevious('night', nightData[0].fr_result, nightData[0].sr_result, nightDate);
            }
        } else {
            liveData['night'] = { fr: '--', sr: '--' };
        }
        
        globalLiveData = liveData;
        renderTodayResults(liveData, today, nightDate);
        
        if (liveData.shillong) {
            updateMetaTags('Shillong Teer', liveData.shillong.fr || '--', liveData.shillong.sr || '--', today);
        }
        
        Object.keys(venueConfigs).forEach(venue => {
            const select = document.getElementById(venueConfigs[venue].selectId);
            if (select) loadPreviousResults(venue, parseInt(select.value));
        });
        
    } catch(err) {
        console.error('❌ Error loading live results:', err);
        renderTodayResults({}, getTodayIST(), getNightDate());
    }
}

function renderTodayResults(liveData, todayDate, nightDate) {
    const venues = [
        { id: 'shillong', name: 'SHILLONG TEER', time1: '4:15 PM', time2: '5:10 PM', date: todayDate, prevLink: 'shillong-previous.html', commonLink: 'shillong-common.html', commonClass: 'btn-common-small' },
        { id: 'khanapara', name: 'KHANAPARA TEER', time1: '4:10 PM', time2: '5:05 PM', date: todayDate, prevLink: 'khanapara-previous.html', commonLink: 'khanapara-common.html', commonClass: 'btn-common-small-khanapara' },
        { id: 'juwai', name: 'JUWAI TEER', time1: '2:30 PM', time2: '3:15 PM', date: todayDate, prevLink: 'juwai-previous.html', commonLink: 'juwai-common.html', commonClass: 'btn-common-small-juwai' },
        { id: 'morning', name: 'MORNING TEER', time1: '10:30 AM', time2: '11:30 AM', date: todayDate, prevLink: 'morning-previous.html', commonLink: 'morning-common.html', commonClass: 'btn-common-small-morning' },
        { id: 'night', name: 'NIGHT TEER', time1: '11:10 PM', time2: '12:10 AM', date: nightDate || getNightDate(), prevLink: 'night-previous.html', commonLink: 'night-common.html', commonClass: 'btn-common-small-night' }
    ];
    
    const grid = document.getElementById('resultsGrid');
    if (!grid) return;
    
    let html = '';
    
    venues.forEach(v => {
        const data = liveData[v.id] || { fr: '--', sr: '--' };
        const hasData = (data.fr !== '--' || data.sr !== '--');
        
        const frDisplay = isWaitingForVenue(v.id, 'fr') ? `<div class="waiting-number-display">⏳ WAITING</div>` : `<div class="result-number">${data.fr}</div>`;
        const srDisplay = isWaitingForVenue(v.id, 'sr') ? `<div class="waiting-number-display">⏳ WAITING</div>` : `<div class="result-number">${data.sr}</div>`;
        
        const badgeClass = hasData ? 'live-result-badge' : 'flash-waiting';
        const badgeText = hasData ? '🔴 LIVE' : '⏳ WAITING';
        
        html += `
            <div class="result-card">
                <div style="background: #0a3d6b; border-radius: 8px; padding: 0.2rem 0.5rem; margin-bottom: 0.4rem; text-align: center; border: 1px solid #ffcc00;">
                    <div style="color: #ffcc00; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.5px;">
                        ⏳ NEXT ROUND IN: 
                        <span id="countdown_${v.id}" style="font-weight: 800; color: #ffffff; background: #000000; padding: 0.05rem 0.5rem; border-radius: 4px; font-size: 0.7rem;">--:--:--</span>
                    </div>
                </div>
                <div class="venue-header"><span class="venue-name">🎯 ${v.name}</span></div>
                <div class="info-row"><span class="date-box">📅 ${v.date}</span><span class="${badgeClass}">${badgeText}</span></div>
                <div class="timing-dual">
                    <div class="fr-box"><div>FIRST ROUND (${v.time1})</div>${frDisplay}</div>
                    <div class="sr-box"><div>SECOND ROUND (${v.time2})</div>${srDisplay}</div>
                </div>
                <div class="card-footer-buttons">
                    <a href="${v.prevLink}" class="btn-previous-sky">Previous Result</a>
                    <a href="${v.commonLink}" class="${v.commonClass}">Common Number</a>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
    setTimeout(startAllCountdowns, 500);
}

// ============================================================
// 🔥 কমন নাম্বার
// ============================================================
async function loadCommonNumbers() {
    try {
        const today = getTodayIST();
        const { data, error } = await supabaseClient.from('teer_common_numbers').select('*').eq('result_date', today).limit(1);
        if (!error && data && data.length > 0) renderCommonNumbersFromDB(data[0]);
        else renderCommonNumbers();
    } catch(err) {
        renderCommonNumbers();
    }
}

function renderCommonNumbersFromDB(data) {
    const container = document.getElementById('commonTablesContainer');
    if (!container) return;
    
    const venues = [
        { id: 'shillong', name: 'SHILLONG TEER' }, { id: 'khanapara', name: 'KHANAPARA TEER' },
        { id: 'juwai', name: 'JUWAI TEER' }, { id: 'morning', name: 'MORNING TEER' }, { id: 'night', name: 'NIGHT TEER' }
    ];
    
    let html = '';
    venues.forEach(venue => {
        const v = venue.id;
        let time1 = '4:00 PM', time2 = '5:00 PM';
        if (v === 'morning') { time1 = '10:30 AM'; time2 = '11:30 AM'; }
        else if (v === 'juwai') { time1 = '2:30 PM'; time2 = '3:15 PM'; }
        else if (v === 'night') { time1 = '11:10 PM'; time2 = '12:10 AM'; }
        
        html += `
            <div class="common-venue-card">
                <div class="common-venue-title">🎯 ${venue.name} - COMMON NUMBERS</div>
                <table class="common-table">
                    <thead><tr><th>Round</th><th>Direct Numbers</th><th>House Digit</th><th>Ending Digit</th></tr></thead>
                    <tbody>
                        <tr><td class="round-cell">FR (${time1})</td>
                            <td><span class="direct-num">${data[`${v}_fr_direct`] || '--'}</span></td>
                            <td><span class="house-num">${data[`${v}_fr_house`] || '--'}</span></td>
                            <td><span class="ending-num">${data[`${v}_fr_ending`] || '--'}</span></td>
                        </tr>
                        <tr><td class="round-cell">SR (${time2})</td>
                            <td><span class="direct-num">${data[`${v}_sr_direct`] || '--'}</span></td>
                            <td><span class="house-num">${data[`${v}_sr_house`] || '--'}</span></td>
                            <td><span class="ending-num">${data[`${v}_sr_ending`] || '--'}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderCommonNumbers() {
    renderCommonNumbersFromDB({
        shillong_fr_direct: '47, 68', shillong_fr_house: '4, 6', shillong_fr_ending: '7, 8',
        shillong_sr_direct: '86, 15', shillong_sr_house: '8, 1', shillong_sr_ending: '6, 5',
        khanapara_fr_direct: '35, 72', khanapara_fr_house: '3, 7', khanapara_fr_ending: '5, 2',
        khanapara_sr_direct: '64, 91', khanapara_sr_house: '6, 9', khanapara_sr_ending: '4, 1',
        juwai_fr_direct: '52, 77', juwai_fr_house: '5, 7', juwai_fr_ending: '2, 1',
        juwai_sr_direct: '88, 43', juwai_sr_house: '8, 4', juwai_sr_ending: '8, 3',
        morning_fr_direct: '52, 77', morning_fr_house: '5, 7', morning_fr_ending: '2, 1',
        morning_sr_direct: '88, 43', morning_sr_house: '8, 4', morning_sr_ending: '8, 3',
        night_fr_direct: '52, 77', night_fr_house: '5, 7', night_fr_ending: '2, 1',
        night_sr_direct: '88, 43', night_sr_house: '8, 4', night_sr_ending: '8, 3'
    });
}

function loadTrendingNumbers() {
    const grid = document.getElementById('trendingGrid');
    if (!grid) return;
    const numbers = [ { num: '68', count: 5, hot: true }, { num: '47', count: 4, hot: true }, { num: '86', count: 4, hot: true }, { num: '70', count: 3, hot: false }, { num: '31', count: 3, hot: false }, { num: '20', count: 3, hot: false } ];
    grid.innerHTML = numbers.map(n => `<div class="trending-item"><div class="t-number">${n.num}</div><div class="t-count">${n.count} বার</div>${n.hot ? '<div class="t-hot">🔥 হট</div>' : ''}</div>`).join('');
}

function loadLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    if (!tbody) return;
    const users = [ { name: 'Rahul Das', correct: 47, total: 50, rate: 94 }, { name: 'Suman Mistry', correct: 43, total: 48, rate: 89 }, { name: 'Riya Sen', correct: 41, total: 47, rate: 87 } ];
    tbody.innerHTML = users.map((u, i) => `<tr><td class="rank-${i+1}">${i+1}</td><td>${u.name}</td><td>${u.correct}</td><td>${u.total}</td><td>${u.rate}%</td></tr>`).join('');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function shareOnFacebook() { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400'); }
function shareOnWhatsApp() { window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(document.title)}%20-%20${encodeURIComponent(window.location.href)}`, '_blank'); }
function shareOnTwitter() { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400'); }
function shareOnTelegram() { window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, '_blank'); }
function copyLink() { navigator.clipboard.writeText(window.location.href).then(() => showToast('✅ লিংক কপি হয়েছে!')).catch(() => showToast('❌ কপি করতে ব্যর্থ!')); }

function addComment() {
    const nameInput = document.getElementById('commentName');
    const textInput = document.getElementById('commentInput');
    const name = nameInput.value.trim() || 'অতিথি';
    const text = textInput.value.trim();
    if (!text) { showToast('❌ দয়া করে কিছু লিখুন!'); return; }
    
    const list = document.getElementById('commentList');
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `<div class="c-avatar">${name.charAt(0).toUpperCase()}</div><div class="c-body"><div class="c-name">${name}</div><div class="c-text">${text}</div><div class="c-time">${new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}</div></div>`;
    list.insertBefore(item, list.firstChild);
    textInput.value = '';
    showToast('✅ আপনার মন্তব্য পোস্ট হয়েছে!');
}

function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value.trim();
    const msg = document.getElementById('newsletterMsg');
    if (!email || !email.includes('@')) { msg.innerHTML = '❌ দয়া করে সঠিক ইমেইল দিন!'; msg.style.color = '#cc0000'; return; }
    msg.innerHTML = '✅ সাবস্ক্রাইব সম্পূর্ণ! আমরা শীঘ্রই আপডেট পাঠাব।';
    msg.style.color = '#cc0000';
    document.getElementById('newsletterEmail').value = '';
}

function updateMetaTags(venue, frResult, srResult, date) {
    const formattedDate = date.split('-').reverse().join('.');
    document.title = (venue === 'Shillong Teer') ? `Shillong Teer Result ${formattedDate} | Live Updates` : `${venue} Result ${formattedDate} - FR: ${frResult} | SR: ${srResult} | Live Teer`;
}

const dreamChartData = [
    { dream: "Snake / সাপ", direct: "05, 33, 77", house: "7", ending: "1" }, { dream: "Tiger / বাঘ", direct: "28, 44, 66", house: "3", ending: "9" },
    { dream: "Lion / সিংহ", direct: "32, 55, 88", house: "8", ending: "4" }, { dream: "Elephant / হাতি", direct: "47, 70, 99", house: "6", ending: "0" },
    { dream: "Horse / ঘোড়া", direct: "19, 41, 63", house: "2", ending: "4" }, { dream: "Dog / কুকুর", direct: "24, 46, 68", house: "6", ending: "9" },
    { dream: "Cat / বিড়াল", direct: "18, 40, 62", house: "0", ending: "5" }, { dream: "Water / পানি", direct: "02, 24, 46", house: "1", ending: "3" }
];

function renderDreamChart() { 
    document.getElementById('dreamChartBody').innerHTML = dreamChartData.map(item => `<tr><td style="padding:10px;"><strong>${item.dream}</strong></td><td style="padding:10px;">${item.direct}</td><td style="padding:10px;">${item.house}</td><td style="padding:10px;">${item.ending}</td></tr>`).join('');
}

function dreamToNum(t) { 
    if(!t) return 24; 
    let m = { "snake":5, "tiger":28, "lion":32, "elephant":47, "horse":19, "dog":24, "cat":18, "water":2, "সাপ":5, "বাঘ":28, "সিংহ":32, "হাতি":47, "ঘোড়া":19, "কুকুর":24, "বিড়াল":18, "পানি":2 }; 
    let l = t.toLowerCase(); 
    for(let [k,v] of Object.entries(m)) if(l.includes(k)) return v; 
    let h=0; for(let i=0;i<l.length;i++) h=((h<<5)-h)+l.charCodeAt(i); 
    return Math.abs(h)%100||24; 
}
function getHENumbers(n) { let x=n%100; return { house:[((x*3+7)%10).toString(),((x*5+11)%10).toString()], ending:[((x*9+17)%10).toString(),((x*11+23)%10).toString()] }; }

let globalLiveData = {};
let globalCommonData = null;

// ============================================================
// 🔥 Real-time Subscription for Common Numbers
// ============================================================
function subscribeToCommonNumbers() {
    return supabaseClient.channel('common-numbers-changes')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'teer_common_numbers' }, (payload) => {
            if (payload.new && payload.new.result_date === getTodayIST()) renderCommonNumbersFromDB(payload.new);
            else loadCommonNumbers();
        }).subscribe();
}

// ============================================================
// 🔥 Real-time Subscription for Live Results
// ============================================================
function subscribeToLiveResults() {
    return supabaseClient.channel('live-results-changes')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'teer_live_results' }, async (payload) => {
            if (payload.new.fr_result !== '--' && payload.new.sr_result !== '--') {
                await saveLiveResultToPrevious(payload.new.venue, payload.new.fr_result, payload.new.sr_result, payload.new.result_date);
            }
            loadTodayResults();
        }).subscribe();
}

document.addEventListener('DOMContentLoaded', function() {
    loadTodayResults();
    loadCommonNumbers();
    subscribeToCommonNumbers();
    subscribeToLiveResults();
    setupAllSelectors();
    renderDreamChart();
    loadTrendingNumbers();
    loadLeaderboard();
    
    const predictBtn = document.getElementById('predictDreamBtn');
    if(predictBtn) {
        predictBtn.addEventListener('click', function() {
            let inp = document.getElementById('dreamInput').value.trim();
            if(!inp) { alert("Enter dream word"); return; }
            let num = dreamToNum(inp);
            let he = getHENumbers(num);
            document.getElementById('dreamDisplayText').innerHTML = `💭 Dream: <strong>${inp}</strong> → Number: <strong>${num}</strong>`;
            document.getElementById('houseDigit1').innerText = he.house[0]; document.getElementById('houseDigit2').innerText = he.house[1];
            document.getElementById('endingDigit1').innerText = he.ending[0]; document.getElementById('endingDigit2').innerText = he.ending[1];
        });
    }
    
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function() {
            let a = this.nextElementSibling;
            if (a) {
                a.classList.toggle('show');
                this.querySelector('.faq-icon').innerHTML = a.classList.contains('show') ? '−' : '+';
            }
        });
    });
    
    document.getElementById('closeLiveModalBtn')?.addEventListener('click', closeModals);
    document.getElementById('closePrevModalBtn')?.addEventListener('click', closeModals);
    window.addEventListener('click', function(e) { if(e.target.classList.contains('modal')) closeModals(); });
});

function closeModals() {
    const lm = document.getElementById('liveModalWin');
    const pm = document.getElementById('prevModalWin');
    if (lm) lm.style.display = 'none';
    if (pm) pm.style.display = 'none';
}

function showBangla() { alert("বাংলা ভার্সন সক্রিয়। পুরো সাইট বাংলা ও ইংরেজিতে দেখা যাচ্ছে।"); }
function showEnglish() { alert("English version active. Site is fully bilingual."); }


// ============================================================
// 🔥 VIP SYSTEM (Timer + Ad + Unlock) - Using teer_common_numbers
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const vipBtn = document.getElementById('vipUnlockBtn');
    const vipModal = document.getElementById('vipModal');
    const vipModalClose = document.getElementById('vipModalClose');
    const vipNumberValue = document.getElementById('vipNumberValue');
    const vipExtraInfo = document.getElementById('vipExtraInfo');
    const vipStatusText = document.getElementById('vipStatusText');
    
    if (!vipBtn) return;

    let isUnlocking = false;
    let countdownInterval = null;
    let adWindow = null;

    async function loadVIPNumberFromSupabase() {
        try {
            const today = getTodayIST();
            const { data, error } = await supabaseClient
                .from('teer_common_numbers')
                .select('*')
                .eq('result_date', today)
                .limit(1);

            if (error || !data || data.length === 0) return null;
            const row = data[0];
            return `${row.shillong_fr_direct || '--'} | ${row.shillong_sr_direct || '--'}`;
        } catch (err) {
            return null;
        }
    }

    function startCountdown(seconds, onComplete) {
        let remaining = seconds;
        if (vipStatusText) {
            vipStatusText.textContent = `⏳ অনুগ্রহ করে অপেক্ষা করুন... ${remaining} সেকেন্ড বাকি`;
            vipStatusText.style.color = '#ff9800';
        }
        if (vipBtn) {
            vipBtn.textContent = `⏳ ${remaining}s`;
            vipBtn.disabled = true;
        }

        try {
            adWindow = window.open('https://omg10.com/4/11160871', '_blank');
        } catch (e) {}

        if (countdownInterval) clearInterval(countdownInterval);

        countdownInterval = setInterval(function() {
            remaining--;
            if (remaining > 0) {
                if (vipStatusText) vipStatusText.textContent = `⏳ অনুগ্রহ করে অপেক্ষা করুন... ${remaining} সেকেন্ড বাকি`;
                if (vipBtn) vipBtn.textContent = `⏳ ${remaining}s`;
            } else {
                clearInterval(countdownInterval);
                countdownInterval = null;
                if (vipBtn) vipBtn.textContent = '⏳ লোড হচ্ছে...';
                if (vipStatusText) vipStatusText.textContent = '⏳ VIP নাম্বার লোড হচ্ছে...';
                
                try {
                    if (adWindow && !adWindow.closed) adWindow.close();
                } catch (e) {}
                adWindow = null;
                
                onComplete();
            }
        }, 1000);
    }

    window.unlockVIP = async function() {
        if (isUnlocking) {
            if (vipStatusText) {
                vipStatusText.textContent = '⏳ ইতিমধ্যে প্রক্রিয়া চলছে...';
                vipStatusText.style.color = '#ff9800';
            }
            return;
        }
        isUnlocking = true;

        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        if (adWindow && !adWindow.closed) {
            try { adWindow.close(); } catch(e) {}
            adWindow = null;
        }

        startCountdown(5, async function() {
            try {
                const vipNumber = await loadVIPNumberFromSupabase();
                if (vipNumber) {
                    if (vipNumberValue) vipNumberValue.textContent = vipNumber;
                    if (vipExtraInfo) vipExtraInfo.innerHTML = '✅ <span style="color:#008000;">VIP Number unlocked successfully! আজকের স্পেশাল নাম্বার।</span>';
                    if (vipStatusText) {
                        vipStatusText.textContent = '✅ VIP নাম্বার আনলক সম্পূর্ণ!';
                        vipStatusText.style.color = '#008000';
                    }
                } else {
                    if (vipNumberValue) vipNumberValue.textContent = '47, 68 | 86, 15';
                    if (vipExtraInfo) vipExtraInfo.innerHTML = '⚠️ <span style="color:#ff9800;">[Demo Mode] আজকের ডেটা নেই, ডিফল্ট দেখানো হচ্ছে।</span>';
                    if (vipStatusText) {
                        vipStatusText.textContent = '⚠️ VIP নাম্বার লোড হয়েছে (Demo Mode)';
                        vipStatusText.style.color = '#ff9800';
                    }
                }
                if (vipModal) vipModal.classList.add('active');
            } catch (err) {
                if (vipStatusText) {
                    vipStatusText.textContent = '❌ VIP আনলক করতে ব্যর্থ! আবার চেষ্টা করুন।';
                    vipStatusText.style.color = '#cc0000';
                }
            }
            if (vipBtn) {
                vipBtn.disabled = false;
                vipBtn.textContent = '🔓 আনলক করুন / Unlock Now';
            }
            isUnlocking = false;
        });
    };

    if (vipBtn) {
        vipBtn.addEventListener('click', window.unlockVIP);
    }

    if (vipModalClose) {
        vipModalClose.addEventListener('click', function() {
            if (vipModal) vipModal.classList.remove('active');
            if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
            if (vipBtn) {
                vipBtn.disabled = false;
                vipBtn.textContent = '🔓 আনলক করুন / Unlock Now';
            }
            isUnlocking = false;
        });
    }

    if (vipModal) {
        vipModal.addEventListener('click', function(e) {
            if (e.target === vipModal) {
                vipModal.classList.remove('active');
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                }
                if (vipBtn) {
                    vipBtn.disabled = false;
                    vipBtn.textContent = '🔓 আনলক করুন / Unlock Now';
                }
                isUnlocking = false;
            }
        });
    }

    console.log('✅ VIP System (Timer) Loaded Successfully!');
});
