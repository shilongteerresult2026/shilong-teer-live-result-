// ============================================================
// Supabase Setup
// ============================================================
const SUPABASE_URL = 'https://bwjjqidmeooyojjvtqjs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__qokEKHuO9i1LVn24Hxp3g_4MZQ7wIg';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// 🔥 সব ভেন্যুর জন্য Previous Results Load ফাংশন
// ============================================================

// 1. Shillong Teer Previous Results
async function loadShillongPrevious(monthIndex) {
    const tbody = document.getElementById('resultsTableShillong');
    if (!tbody) return;
    
    try {
        const year = 2026;
        const month = String(monthIndex + 1).padStart(2, '0');
        const firstDay = `${year}-${month}-01`;
        const lastDay = `${year}-${month}-${new Date(year, monthIndex + 1, 0).getDate()}`;
        
        const { data, error } = await supabaseClient
            .from('teer_previous_results')
            .select('*')
            .eq('venue', 'shillong')
            .gte('result_date', firstDay)
            .lte('result_date', lastDay)
            .order('result_date', { ascending: false });
            
        let html = '';
        
        if (!error && data && data.length > 0) {
            data.forEach(row => {
                const fr = row.fr_result || '--';
                const sr = row.sr_result || '--';
                html += `<tr>
                    <td style="padding:8px; font-weight:700; color:#0d0a0a;">${row.result_date}</td>
                    <td style="padding:8px; font-weight:700; color:#0d6b3d;">${fr}</td>
                    <td style="padding:8px; font-weight:700; color:#0a3d6b;">${sr}</td>
                </tr>`;
            });
        } else {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            html = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">${monthNames[monthIndex]} 2026 - No data available</td></tr>`;
        }
        
        tbody.innerHTML = html;
        
    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">No data available</td></tr>`;
    }
}

// 2. Khanapara Teer Previous Results
async function loadKhanaparaPrevious(monthIndex) {
    const tbody = document.getElementById('resultsTableKhanapara');
    if (!tbody) return;
    
    try {
        const year = 2026;
        const month = String(monthIndex + 1).padStart(2, '0');
        const firstDay = `${year}-${month}-01`;
        const lastDay = `${year}-${month}-${new Date(year, monthIndex + 1, 0).getDate()}`;
        
        const { data, error } = await supabaseClient
            .from('teer_previous_results')
            .select('*')
            .eq('venue', 'khanapara')
            .gte('result_date', firstDay)
            .lte('result_date', lastDay)
            .order('result_date', { ascending: false });
            
        let html = '';
        
        if (!error && data && data.length > 0) {
            data.forEach(row => {
                const fr = row.fr_result || '--';
                const sr = row.sr_result || '--';
                html += `<tr>
                    <td style="padding:8px; font-weight:700; color:#0d0a0a;">${row.result_date}</td>
                    <td style="padding:8px; font-weight:700; color:#0a3d6b;">${fr}</td>
                    <td style="padding:8px; font-weight:700; color:#0a3d6b;">${sr}</td>
                </tr>`;
            });
        } else {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            html = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">${monthNames[monthIndex]} 2026 - No data available</td></tr>`;
        }
        
        tbody.innerHTML = html;
        
    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">No data available</td></tr>`;
    }
}

// 3. Juwai Teer Previous Results
async function loadJuwaiPrevious(monthIndex) {
    const tbody = document.getElementById('resultsTableJuwai');
    if (!tbody) return;
    
    try {
        const year = 2026;
        const month = String(monthIndex + 1).padStart(2, '0');
        const firstDay = `${year}-${month}-01`;
        const lastDay = `${year}-${month}-${new Date(year, monthIndex + 1, 0).getDate()}`;
        
        const { data, error } = await supabaseClient
            .from('teer_previous_results')
            .select('*')
            .eq('venue', 'juwai')
            .gte('result_date', firstDay)
            .lte('result_date', lastDay)
            .order('result_date', { ascending: false });
            
        let html = '';
        
        if (!error && data && data.length > 0) {
            data.forEach(row => {
                const fr = row.fr_result || '--';
                const sr = row.sr_result || '--';
                html += `<tr>
                    <td style="padding:8px; font-weight:700; color:#0d0a0a;">${row.result_date}</td>
                    <td style="padding:8px; font-weight:700; color:#0a2a5a;">${fr}</td>
                    <td style="padding:8px; font-weight:700; color:#0a2a5a;">${sr}</td>
                </tr>`;
            });
        } else {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            html = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">${monthNames[monthIndex]} 2026 - No data available</td></tr>`;
        }
        
        tbody.innerHTML = html;
        
    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">No data available</td></tr>`;
    }
}

// 4. Morning Teer Previous Results
async function loadMorningPrevious(monthIndex) {
    const tbody = document.getElementById('resultsTableMorning');
    if (!tbody) return;
    
    try {
        const year = 2026;
        const month = String(monthIndex + 1).padStart(2, '0');
        const firstDay = `${year}-${month}-01`;
        const lastDay = `${year}-${month}-${new Date(year, monthIndex + 1, 0).getDate()}`;
        
        const { data, error } = await supabaseClient
            .from('teer_previous_results')
            .select('*')
            .eq('venue', 'morning')
            .gte('result_date', firstDay)
            .lte('result_date', lastDay)
            .order('result_date', { ascending: false });
            
        let html = '';
        
        if (!error && data && data.length > 0) {
            data.forEach(row => {
                const fr = row.fr_result || '--';
                const sr = row.sr_result || '--';
                html += `<tr>
                    <td style="padding:8px; font-weight:700; color:#0d0a0a;">${row.result_date}</td>
                    <td style="padding:8px; font-weight:700; color:#cc9900;">${fr}</td>
                    <td style="padding:8px; font-weight:700; color:#cc9900;">${sr}</td>
                </tr>`;
            });
        } else {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            html = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">${monthNames[monthIndex]} 2026 - No data available</td></tr>`;
        }
        
        tbody.innerHTML = html;
        
    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">No data available</td></tr>`;
    }
}

// 5. Night Teer Previous Results
async function loadNightPrevious(monthIndex) {
    const tbody = document.getElementById('resultsTableNight');
    if (!tbody) return;
    
    try {
        const year = 2026;
        const month = String(monthIndex + 1).padStart(2, '0');
        const firstDay = `${year}-${month}-01`;
        const lastDay = `${year}-${month}-${new Date(year, monthIndex + 1, 0).getDate()}`;
        
        const { data, error } = await supabaseClient
            .from('teer_previous_results')
            .select('*')
            .eq('venue', 'night')
            .gte('result_date', firstDay)
            .lte('result_date', lastDay)
            .order('result_date', { ascending: false });
            
        let html = '';
        
        if (!error && data && data.length > 0) {
            data.forEach(row => {
                const fr = row.fr_result || '--';
                const sr = row.sr_result || '--';
                html += `<tr>
                    <td style="padding:8px; font-weight:700; color:#0d0a0a;">${row.result_date}</td>
                    <td style="padding:8px; font-weight:700; color:#3d2a2a;">${fr}</td>
                    <td style="padding:8px; font-weight:700; color:#3d2a2a;">${sr}</td>
                </tr>`;
            });
        } else {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            html = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">${monthNames[monthIndex]} 2026 - No data available</td></tr>`;
        }
        
        tbody.innerHTML = html;
        
    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:20px;color:#8a7a6a;">No data available</td></tr>`;
    }
}

// ============================================================
// 🔥 সব ভেন্যুর Selector Setup
// ============================================================
function setupShillongSelector() {
    const select = document.getElementById('monthSelectShillong');
    if (select) {
        const currentMonth = 6;
        select.value = currentMonth.toString();
        loadShillongPrevious(currentMonth);
        select.addEventListener('change', function() {
            loadShillongPrevious(parseInt(this.value));
        });
    }
}

function setupAllSelectors() {
    const selectKhanapara = document.getElementById('monthSelectKhanapara');
    if (selectKhanapara) {
        const currentMonth = 6;
        selectKhanapara.value = currentMonth.toString();
        loadKhanaparaPrevious(currentMonth);
        selectKhanapara.addEventListener('change', function() {
            loadKhanaparaPrevious(parseInt(this.value));
        });
    }
    
    const selectJuwai = document.getElementById('monthSelectJuwai');
    if (selectJuwai) {
        const currentMonth = 6;
        selectJuwai.value = currentMonth.toString();
        loadJuwaiPrevious(currentMonth);
        selectJuwai.addEventListener('change', function() {
            loadJuwaiPrevious(parseInt(this.value));
        });
    }
    
    const selectMorning = document.getElementById('monthSelectMorning');
    if (selectMorning) {
        const currentMonth = 6;
        selectMorning.value = currentMonth.toString();
        loadMorningPrevious(currentMonth);
        selectMorning.addEventListener('change', function() {
            loadMorningPrevious(parseInt(this.value));
        });
    }
    
    const selectNight = document.getElementById('monthSelectNight');
    if (selectNight) {
        const currentMonth = 6;
        selectNight.value = currentMonth.toString();
        loadNightPrevious(currentMonth);
        selectNight.addEventListener('change', function() {
            loadNightPrevious(parseInt(this.value));
        });
    }
}

// ============================================================
// 🔥 IST TIME ZONE FIX
// ============================================================
function getTodayIST() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    return istTime.toISOString().split('T')[0];
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
// ⏳ কাউন্টডাউন - সঠিক সময় অনুযায়ী
// ============================================================
function startAllCountdowns() {
    const venues = ['shillong', 'khanapara', 'juwai', 'morning', 'night'];
    
    setInterval(() => {
        venues.forEach(venue => {
            updateVenueCountdown(venue);
        });
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
    
    let nextTime = null;
    const venueTimes = timings[venueId];
    if (!venueTimes) return;
    
    if (totalMinutes < venueTimes.fr) {
        nextTime = venueTimes.fr;
    } else if (totalMinutes < venueTimes.sr) {
        nextTime = venueTimes.sr;
    } else {
        nextTime = venueTimes.fr + (24 * 60);
    }
    
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
    if (!frResult || !srResult || frResult === '--' || srResult === '--') {
        console.log(`⏳ ${venue}: Skipping save - incomplete data`);
        return;
    }

    try {
        const { data: existing, error: checkError } = await supabaseClient
            .from('teer_previous_results')
            .select('*')
            .eq('venue', venue)
            .eq('result_date', resultDate)
            .limit(1);

        if (checkError) {
            console.error(`❌ Check error for ${venue}:`, checkError);
            return;
        }

        if (existing && existing.length > 0) {
            const { error: updateError } = await supabaseClient
                .from('teer_previous_results')
                .update({
                    fr_result: frResult,
                    sr_result: srResult,
                    updated_at: new Date().toISOString()
                })
                .eq('id', existing[0].id);

            if (updateError) {
                console.error(`❌ Update error for ${venue}:`, updateError);
            } else {
                console.log(`✅ Updated ${venue} previous result for ${resultDate}: FR=${frResult}, SR=${srResult}`);
            }
        } else {
            const { error: insertError } = await supabaseClient
                .from('teer_previous_results')
                .insert({
                    venue: venue,
                    result_date: resultDate,
                    fr_result: frResult,
                    sr_result: srResult,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                });

            if (insertError) {
                console.error(`❌ Insert error for ${venue}:`, insertError);
            } else {
                console.log(`✅ Inserted ${venue} previous result for ${resultDate}: FR=${frResult}, SR=${srResult}`);
            }
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
                liveData[venue] = {
                    fr: data[0].fr_result || '--',
                    sr: data[0].sr_result || '--'
                };
                
                if (data[0].fr_result && data[0].fr_result !== '--' && 
                    data[0].sr_result && data[0].sr_result !== '--') {
                    await saveLiveResultToPrevious(venue, data[0].fr_result, data[0].sr_result, today);
                }
            } else {
                const { data: prevData, error: prevError } = await supabaseClient
                    .from('teer_live_results')
                    .select('*')
                    .eq('venue', venue)
                    .eq('result_date', yesterdayStr)
                    .limit(1);
                    
                if (!prevError && prevData && prevData.length > 0) {
                    liveData[venue] = {
                        fr: prevData[0].fr_result || '--',
                        sr: prevData[0].sr_result || '--'
                    };
                } else {
                    liveData[venue] = { fr: '--', sr: '--' };
                }
            }
        }
        
        const { data: nightData, error: nightError } = await supabaseClient
            .from('teer_live_results')
            .select('*')
            .eq('venue', 'night')
            .eq('result_date', nightDate);
            
        if (!nightError && nightData && nightData.length > 0) {
            liveData['night'] = {
                fr: nightData[0].fr_result || '--',
                sr: nightData[0].sr_result || '--'
            };
            if (nightData[0].fr_result && nightData[0].fr_result !== '--' && 
                nightData[0].sr_result && nightData[0].sr_result !== '--') {
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
        
        const selectShillong = document.getElementById('monthSelectShillong');
        if (selectShillong) {
            loadShillongPrevious(parseInt(selectShillong.value));
        }
        
        const selectKhanapara = document.getElementById('monthSelectKhanapara');
        if (selectKhanapara) {
            loadKhanaparaPrevious(parseInt(selectKhanapara.value));
        }
        
        const selectJuwai = document.getElementById('monthSelectJuwai');
        if (selectJuwai) {
            loadJuwaiPrevious(parseInt(selectJuwai.value));
        }
        
        const selectMorning = document.getElementById('monthSelectMorning');
        if (selectMorning) {
            loadMorningPrevious(parseInt(selectMorning.value));
        }
        
        const selectNight = document.getElementById('monthSelectNight');
        if (selectNight) {
            loadNightPrevious(parseInt(selectNight.value));
        }
        
    } catch(err) {
        console.error('❌ Error loading live results:', err);
        renderTodayResults({}, getTodayIST(), getNightDate());
    }
}

function renderTodayResults(liveData, todayDate, nightDate) {
    const venues = [
        { id: 'shillong', name: 'SHILLONG TEER', time1: '4:15 PM', time2: '5:10 PM', date: todayDate, 
          prevLink: 'shillong-previous.html', commonLink: 'shillong-common.html', commonClass: 'btn-common-small' },
        { id: 'khanapara', name: 'KHANAPARA TEER', time1: '4:10 PM', time2: '5:05 PM', date: todayDate,
          prevLink: 'khanapara-previous.html', commonLink: 'khanapara-common.html', commonClass: 'btn-common-small-khanapara' },
        { id: 'juwai', name: 'JUWAI TEER', time1: '2:30 PM', time2: '3:15 PM', date: todayDate,
          prevLink: 'juwai-previous.html', commonLink: 'juwai-common.html', commonClass: 'btn-common-small-juwai' },
        { id: 'morning', name: 'MORNING TEER', time1: '10:30 AM', time2: '11:30 AM', date: todayDate,
          prevLink: 'morning-previous.html', commonLink: 'morning-common.html', commonClass: 'btn-common-small-morning' },
        { id: 'night', name: 'NIGHT TEER', time1: '11:10 PM', time2: '12:10 AM', date: nightDate || getNightDate(),
          prevLink: 'night-previous.html', commonLink: 'night-common.html', commonClass: 'btn-common-small-night' }
    ];
    
    const grid = document.getElementById('resultsGrid');
    if (!grid) return;
    
    let html = '';
    let hasData = false;
    
    venues.forEach(v => {
        const data = liveData[v.id] || { fr: '--', sr: '--' };
        if (data.fr !== '--' || data.sr !== '--') hasData = true;
        
        const isFRWaiting = isWaitingForVenue(v.id, 'fr');
        const isSRWaiting = isWaitingForVenue(v.id, 'sr');
        
        const frDisplay = isFRWaiting ? 
            `<div class="waiting-number-display">⏳ WAITING</div>` : 
            `<div class="result-number">${data.fr}</div>`;
        const srDisplay = isSRWaiting ? 
            `<div class="waiting-number-display">⏳ WAITING</div>` : 
            `<div class="result-number">${data.sr}</div>`;
        
        const badgeClass = hasData ? 'live-result-badge' : 'flash-waiting';
        const badgeText = hasData ? '🔴 LIVE' : '⏳ WAITING';
        
        const countdownId = `countdown_${v.id}`;
        
        html += `
            <div class="result-card">
                <div style="background: #0a3d6b; border-radius: 8px; padding: 0.2rem 0.5rem; margin-bottom: 0.4rem; text-align: center; border: 1px solid #ffcc00;">
                    <div style="color: #ffcc00; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.5px;">
                        ⏳ NEXT ROUND IN: 
                        <span id="${countdownId}" style="font-weight: 800; color: #ffffff; background: #000000; padding: 0.05rem 0.5rem; border-radius: 4px; font-size: 0.7rem;">--:--:--</span>
                    </div>
                </div>
                
                <div class="venue-header">
                    <span class="venue-name">🎯 ${v.name}</span>
                </div>
                <div class="info-row">
                    <span class="date-box">📅 ${v.date}</span>
                    <span class="${badgeClass}">${badgeText}</span>
                </div>
                <div class="timing-dual">
                    <div class="fr-box">
                        <div>FIRST ROUND (${v.time1})</div>
                        ${frDisplay}
                    </div>
                    <div class="sr-box">
                        <div>SECOND ROUND (${v.time2})</div>
                        ${srDisplay}
                    </div>
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
// 🔥 কমন নাম্বার লোড
// ============================================================
async function loadCommonNumbers() {
    try {
        const today = getTodayIST();
        
        const { data, error } = await supabaseClient
            .from('teer_common_numbers')
            .select('*')
            .eq('result_date', today)
            .limit(1);
            
        const container = document.getElementById('commonTablesContainer');
        if (!container) return;
        
        if (!error && data && data.length > 0) {
            const commonData = data[0];
            renderCommonNumbersFromDB(commonData);
        } else {
            renderCommonNumbers();
        }
        
    } catch(err) {
        console.error('❌ Error loading common numbers:', err);
        renderCommonNumbers();
    }
}

function renderCommonNumbersFromDB(data) {
    const container = document.getElementById('commonTablesContainer');
    if (!container) return;
    
    const venues = [
        { id: 'shillong', name: 'SHILLONG TEER' },
        { id: 'khanapara', name: 'KHANAPARA TEER' },
        { id: 'juwai', name: 'JUWAI TEER' },
        { id: 'morning', name: 'MORNING TEER' },
        { id: 'night', name: 'NIGHT TEER' }
    ];
    
    let html = '';
    venues.forEach(venue => {
        const v = venue.id;
        const frDirect = data[`${v}_fr_direct`] || '--';
        const frHouse = data[`${v}_fr_house`] || '--';
        const frEnding = data[`${v}_fr_ending`] || '--';
        const srDirect = data[`${v}_sr_direct`] || '--';
        const srHouse = data[`${v}_sr_house`] || '--';
        const srEnding = data[`${v}_sr_ending`] || '--';
        
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
                            <td><span class="direct-num">${frDirect}</span></td>
                            <td><span class="house-num">${frHouse}</span></td>
                            <td><span class="ending-num">${frEnding}</span></td>
                        </tr>
                        <tr><td class="round-cell">SR (${time2})</td>
                            <td><span class="direct-num">${srDirect}</span></td>
                            <td><span class="house-num">${srHouse}</span></td>
                            <td><span class="ending-num">${srEnding}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderCommonNumbers() {
    const container = document.getElementById('commonTablesContainer');
    if (!container) return;
    
    const defaultData = {
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
    };
    
    renderCommonNumbersFromDB(defaultData);
}

// ============================================================
// 🔥 Load Functions
// ============================================================
function loadTrendingNumbers() {
    const grid = document.getElementById('trendingGrid');
    if (!grid) return;
    const numbers = [
        { num: '68', count: 5, hot: true }, { num: '47', count: 4, hot: true },
        { num: '86', count: 4, hot: true }, { num: '70', count: 3, hot: false },
        { num: '31', count: 3, hot: false }, { num: '20', count: 3, hot: false }
    ];
    grid.innerHTML = numbers.map(n => `
        <div class="trending-item">
            <div class="t-number">${n.num}</div>
            <div class="t-count">${n.count} বার</div>
            ${n.hot ? '<div class="t-hot">🔥 হট</div>' : ''}
        </div>
    `).join('');
}

function loadLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    if (!tbody) return;
    const users = [
        { name: 'Rahul Das', correct: 47, total: 50, rate: 94 },
        { name: 'Suman Mistry', correct: 43, total: 48, rate: 89 },
        { name: 'Riya Sen', correct: 41, total: 47, rate: 87 }
    ];
    tbody.innerHTML = users.map((u, i) => `
        <tr>
            <td class="rank-${i+1}">${i+1}</td>
            <td>${u.name}</td>
            <td>${u.correct}</td>
            <td>${u.total}</td>
            <td>${u.rate}%</td>
        </tr>
    `).join('');
}

// ============================================================
// 🔥 Share Functions
// ============================================================
function shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400');
}
function shareOnWhatsApp() {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(document.title)}%20-%20${encodeURIComponent(window.location.href)}`, '_blank');
}
function shareOnTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400');
}
function shareOnTelegram() {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, '_blank');
}
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('✅ লিংক কপি হয়েছে!');
    }).catch(() => {
        showToast('❌ কপি করতে ব্যর্থ!');
    });
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

// ============================================================
// 🔥 Comment System
// ============================================================
function addComment() {
    const nameInput = document.getElementById('commentName');
    const textInput = document.getElementById('commentInput');
    const name = nameInput.value.trim() || 'অতিথি';
    const text = textInput.value.trim();
    if (!text) {
        showToast('❌ দয়া করে কিছু লিখুন!');
        return;
    }
    const list = document.getElementById('commentList');
    const avatar = name.charAt(0).toUpperCase();
    const time = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `
        <div class="c-avatar">${avatar}</div>
        <div class="c-body">
            <div class="c-name">${name}</div>
            <div class="c-text">${text}</div>
            <div class="c-time">${time}</div>
        </div>
    `;
    list.insertBefore(item, list.firstChild);
    textInput.value = '';
    showToast('✅ আপনার মন্তব্য পোস্ট হয়েছে!');
}

// ============================================================
// 🔥 Newsletter
// ============================================================
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value.trim();
    const msg = document.getElementById('newsletterMsg');
    if (!email || !email.includes('@')) {
        msg.innerHTML = '❌ দয়া করে সঠিক ইমেইল দিন!';
        msg.style.color = '#cc0000';
        return;
    }
    msg.innerHTML = '✅ সাবস্ক্রাইব সম্পূর্ণ! আমরা শীঘ্রই আপডেট পাঠাব।';
    msg.style.color = '#cc0000';
    document.getElementById('newsletterEmail').value = '';
}

// ============================================================
// 🔥 অটো মেটা ট্যাগ আপডেট ফাংশন
// ============================================================
function updateMetaTags(venue, frResult, srResult, date) {
    const formattedDate = date.split('-').reverse().join('.');
    
    if (venue === 'Shillong Teer') {
        document.title = `Shillong Teer Result ${formattedDate} | Live Updates`;
    } else {
        document.title = `${venue} Result ${formattedDate} - FR: ${frResult} | SR: ${srResult} | Live Teer`;
    }
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        if (venue === 'Shillong Teer') {
            metaDesc.content = `Shillong Teer result ${formattedDate}: FR ${frResult}, SR ${srResult}. Get live updates, house digits & expert predictions for Khanapara, Juwai, Morning & Night Teer.`;
        } else {
            metaDesc.content = `Today's ${venue} result: FR ${frResult}, SR ${srResult}. Get live Teer results with expert predictions. Updated on ${formattedDate}.`;
        }
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        if (venue === 'Shillong Teer') {
            ogTitle.content = `Shillong Teer Result ${formattedDate} | Live Updates`;
        } else {
            ogTitle.content = `${venue} Result ${formattedDate} - FR: ${frResult} | SR: ${srResult}`;
        }
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        if (venue === 'Shillong Teer') {
            ogDesc.content = `Shillong Teer result ${formattedDate}: FR ${frResult}, SR ${srResult}. Get live updates & expert predictions.`;
        } else {
            ogDesc.content = `Today's ${venue} result: FR ${frResult}, SR ${srResult}. Updated on ${formattedDate}.`;
        }
    }
    
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        if (venue === 'Shillong Teer') {
            twTitle.content = `Shillong Teer Result ${formattedDate} | Live Updates`;
        } else {
            twTitle.content = `${venue} Result ${formattedDate} - FR: ${frResult} | SR: ${srResult}`;
        }
    }
    
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        if (venue === 'Shillong Teer') {
            twDesc.content = `Shillong Teer result ${formattedDate}: FR ${frResult}, SR ${srResult}. Get live updates.`;
        } else {
            twDesc.content = `Today's ${venue} result: FR ${frResult}, SR ${srResult}. Updated on ${formattedDate}.`;
        }
    }
    
    console.log(`✅ Meta tags updated: ${venue} FR:${frResult} SR:${srResult} Date:${formattedDate}`);
}

// ============================================================
// 📊 DREAM CHART DATA
// ============================================================
const dreamChartData = [
    { dream: "Snake / সাপ", direct: "05, 33, 77", house: "7", ending: "1" },
    { dream: "Tiger / বাঘ", direct: "28, 44, 66", house: "3", ending: "9" },
    { dream: "Lion / সিংহ", direct: "32, 55, 88", house: "8", ending: "4" },
    { dream: "Elephant / হাতি", direct: "47, 70, 99", house: "6", ending: "0" },
    { dream: "Horse / ঘোড়া", direct: "19, 41, 63", house: "2", ending: "4" },
    { dream: "Dog / কুকুর", direct: "24, 46, 68", house: "6", ending: "9" },
    { dream: "Cat / বিড়াল", direct: "18, 40, 62", house: "0", ending: "5" },
    { dream: "Water / পানি", direct: "02, 24, 46", house: "1", ending: "3" },
    { dream: "Fire / আগুন", direct: "03, 25, 47", house: "5", ending: "2" },
    { dream: "Money / টাকা", direct: "22, 44, 66", house: "4", ending: "8" },
    { dream: "Gold / সোনা", direct: "23, 45, 67", house: "7", ending: "6" },
    { dream: "Moon / চাঁদ", direct: "15, 37, 59", house: "9", ending: "1" },
    { dream: "Sun / সূর্য", direct: "08, 30, 52", house: "2", ending: "7" },
    { dream: "Rain / বৃষ্টি", direct: "07, 29, 51", house: "8", ending: "3" },
    { dream: "Bird / পাখি", direct: "12, 34, 56", house: "3", ending: "6" },
    { dream: "Fish / মাছ", direct: "09, 31, 53", house: "1", ending: "4" }
];

function renderDreamChart() { 
    let html = ''; 
    dreamChartData.forEach(item => { 
        html += `<tr><td style="padding:10px;"><strong>${item.dream}</strong></td><td style="padding:10px;">${item.direct}</td><td style="padding:10px;">${item.house}</td><td style="padding:10px;">${item.ending}</td></tr>`;
    }); 
    document.getElementById('dreamChartBody').innerHTML = html; 
}

function dreamToNum(t){ 
    if(!t) return 24; 
    let m={
        "snake":5, "tiger":28, "lion":32, "elephant":47, "horse":19, "dog":24, "cat":18, 
        "water":2, "fire":3, "money":22, "gold":23, "moon":15, "sun":8, "rain":7, 
        "bird":12, "fish":9, "সাপ":5, "বাঘ":28, "সিংহ":32, "হাতি":47, "ঘোড়া":19, 
        "কুকুর":24, "বিড়াল":18, "পানি":2, "আগুন":3, "টাকা":22, "সোনা":23, 
        "চাঁদ":15, "সূর্য":8, "বৃষ্টি":7, "পাখি":12, "মাছ":9
    }; 
    let l=t.toLowerCase(); 
    for(let [k,v] of Object.entries(m)) if(l.includes(k)) return v; 
    let h=0; 
    for(let i=0;i<l.length;i++) h=((h<<5)-h)+l.charCodeAt(i); 
    return Math.abs(h)%100||24; 
}

function getHENumbers(n){ 
    let x=n%100; 
    return { 
        house:[((x*3+7)%10).toString(),((x*5+11)%10).toString()], 
        ending:[((x*9+17)%10).toString(),((x*11+23)%10).toString()] 
    }; 
}

let globalLiveData = {};
let globalCommonData = null;

// ============================================================
// 📌 DOMContentLoaded
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Loaded - Loading results...');
    loadTodayResults();
    loadCommonNumbers();
    
    setInterval(loadTodayResults, 10000);
    setInterval(loadCommonNumbers, 30000);
    
    setupShillongSelector();
    setupAllSelectors();
    
    renderDreamChart();
    loadTrendingNumbers();
    loadLeaderboard();
    
    document.getElementById('predictDreamBtn').addEventListener('click', function() {
        let inp = document.getElementById('dreamInput').value.trim();
        if(!inp) { alert("Enter dream word"); return; }
        let num = dreamToNum(inp);
        let he = getHENumbers(num);
        document.getElementById('dreamDisplayText').innerHTML = `💭 Dream: <strong>${inp}</strong> → Number: <strong>${num}</strong>`;
        document.getElementById('houseDigit1').innerText = he.house[0];
        document.getElementById('houseDigit2').innerText = he.house[1];
        document.getElementById('endingDigit1').innerText = he.ending[0];
        document.getElementById('endingDigit2').innerText = he.ending[1];
    });
    
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function() {
            let a = this.nextElementSibling;
            if (a) {
                a.classList.toggle('show');
                this.querySelector('.faq-icon').innerHTML = a.classList.contains('show') ? '−' : '+';
            }
        });
    });
    
    document.getElementById('payNowBtn').addEventListener('click', function() {
        window.location.href = "upi://pay?pa=7628988767@airtel&pn=Teer%20VIP&am=1500&cu=INR";
    });
    
    document.getElementById('verifyPaymentBtn').addEventListener('click', function() {
        let txn = document.getElementById('transactionIdInput').value.trim();
        if(txn.length >= 5) {
            localStorage.setItem('teer_vip_status', 'active');
            document.getElementById('vipMessage').innerHTML = "✅ VIP UNLOCKED!";
        } else {
            document.getElementById('vipMessage').innerHTML = "❌ Invalid TXN ID";
        }
    });
    
    document.getElementById('closeLiveModalBtn').addEventListener('click', closeModals);
    document.getElementById('closePrevModalBtn').addEventListener('click', closeModals);
    window.addEventListener('click', function(e) {
        if(e.target.classList.contains('modal')) closeModals();
    });

    console.log('✅ All done!');
});

function closeModals() {
    document.getElementById('liveModalWin').style.display = 'none';
    document.getElementById('prevModalWin').style.display = 'none';
}

function showBangla() { alert("বাংলা ভার্সন সক্রিয়। পুরো সাইট বাংলা ও ইংরেজিতে দেখা যাচ্ছে।"); }
function showEnglish() { alert("English version active. Site is fully bilingual."); }

console.log('✅ All functions loaded successfully!');
