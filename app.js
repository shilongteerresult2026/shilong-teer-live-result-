// ============================================================
// ১. Supabase ও VIP System Logic
// ============================================================
const SUPABASE_URL = 'https://bwjjqidmeooyojjvtqjs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qokEKHuO9i1LVn24Hxp3g_4MZQ7wIg';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function getTodayIST() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
}

async function loadVIPNumberFromSupabase() {
    try {
        const today = getTodayIST();
        const { data, error } = await supabaseClient
            .from('teer_common_numbers')
            .select('*')
            .eq('result_date', today)
            .limit(1);

        if (error || !data || data.length === 0) return null;
        return `${data[0].shillong_fr_direct || '--'} | ${data[0].shillong_sr_direct || '--'}`;
    } catch (err) {
        return null;
    }
}

// ============================================================
// ২. VIP Unlock Logic (Ad + Timer)
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const vipBtn = document.getElementById('vipUnlockBtn');
    
    if (vipBtn) {
        vipBtn.addEventListener('click', async function() {
            // ১. অ্যাড ট্রিগার
            window.open('https://omg10.com/4/11160871', '_blank');

            // ২. টাইমার শুরু
            let timeLeft = 5;
            vipBtn.disabled = true;
            
            const timerInterval = setInterval(() => {
                vipBtn.textContent = `⏳ ${timeLeft} সেকেন্ড অপেক্ষা করুন...`;
                timeLeft--;
                
                if (timeLeft < 0) {
                    clearInterval(timerInterval);
                }
            }, 1000);

            // ৩. ৫ সেকেন্ড পর ডাটা লোড
            setTimeout(async () => {
                const vipData = await loadVIPNumberFromSupabase();
                const vipModal = document.getElementById('vipModal');
                const vipNumberValue = document.getElementById('vipNumberValue');
                const vipExtraInfo = document.getElementById('vipExtraInfo');
                const vipStatusText = document.getElementById('vipStatusText');

                if (vipData) {
                    vipNumberValue.textContent = vipData;
                    vipExtraInfo.innerHTML = '✅ VIP Number Unlocked!';
                    vipStatusText.textContent = '✅ সফলভাবে লোড হয়েছে!';
                } else {
                    vipNumberValue.textContent = '47, 68 | 86, 15';
                    vipExtraInfo.innerHTML = '⚠️ [Demo Mode] আজকের ডেটা নেই।';
                }

                vipModal.classList.add('active');
                vipBtn.disabled = false;
                vipBtn.textContent = '🔓 আনলক করুন / Unlock Now';
            }, 6000); // ৬ সেকেন্ড = ৫ সেকেন্ড টাইমার + ১ সেকেন্ড বাফার
        });
    }

    // মোডাল ক্লোজ
    const closeBtn = document.getElementById('vipModalClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => document.getElementById('vipModal').classList.remove('active'));
    }
});

// ============================================================
// ৩. গ্লোবাল ফাংশন (যেগুলো HTML বাটন থেকে কল হবে)
// ============================================================
function showBangla() { alert("বাংলা মোড চালু হয়েছে!"); }
function showEnglish() { alert("English mode enabled!"); }
function shareOnFacebook() { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank'); }
function shareOnWhatsApp() { window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`, '_blank'); }
function shareOnTwitter() { window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank'); }
function shareOnTelegram() { window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`, '_blank'); }
function copyLink() { navigator.clipboard.writeText(window.location.href); alert("লিংক কপি হয়েছে!"); }
function addComment() { alert("মন্তব্য গৃহীত হয়েছে!"); }
