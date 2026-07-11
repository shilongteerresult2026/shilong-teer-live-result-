// ============================================================
// 🔥 VIP System - Using teer_common_numbers Table
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const vipBtn = document.getElementById('vipUnlockBtn');
    const vipModal = document.getElementById('vipModal');
    const vipModalClose = document.getElementById('vipModalClose');
    const vipNumberValue = document.getElementById('vipNumberValue');
    const vipExtraInfo = document.getElementById('vipExtraInfo');
    const vipStatusText = document.getElementById('vipStatusText');
    let isUnlocking = false;

    // ============================================================
    // Supabase Config
    // ============================================================
    const SUPABASE_URL = 'https://bwjjqidmeooyojjvtqjs.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_qokEKHuO9i1LVn24Hxp3g_4MZQ7wIg'; // আপনার কী দিন
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    function getTodayIST() {
        // আধুনিক ও নিখুঁত পদ্ধতি (IST Timezone) - আগের কোডের পরিবর্তে আপডেট করা হয়েছে
        return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
    }

    // ============================================================
    // 📥 VIP Number Load from teer_common_numbers
    // ============================================================
    async function loadVIPNumberFromSupabase(venue = 'shillong') {
        try {
            const today = getTodayIST();
            const { data, error } = await supabaseClient
                .from('teer_common_numbers')
                .select('*')
                .eq('result_date', today)
                .limit(1);

            if (error) {
                console.error('❌ Supabase error:', error);
                return null;
            }

            if (data && data.length > 0) {
                const row = data[0];
                // 🎯 VIP Number তৈরি করুন (FR + SR Direct Numbers)
                const vipNumber = `${row.shillong_fr_direct || '--'} | ${row.shillong_sr_direct || '--'}`;
                return vipNumber;
            }
            return null;
        } catch (err) {
            console.error('❌ VIP load error:', err);
            return null;
        }
    }

    // ============================================================
    // 🔓 VIP Unlock System
    // ============================================================
    async function unlockVIP() {
        if (isUnlocking) return;
        isUnlocking = true;
        vipBtn.disabled = true;
        vipBtn.textContent = '⏳ লোড হচ্ছে...';
        vipStatusText.textContent = '⏳ VIP নাম্বার লোড হচ্ছে...';
        vipStatusText.style.color = '#ff9800';

        try {
            // 🎯 অ্যাড দেখান (Adsterra / Partner link Trigger)
            showAdAndWait();

            setTimeout(async function() {
                const vipNumber = await loadVIPNumberFromSupabase('shillong');
                
                if (vipNumber) {
                    vipNumberValue.textContent = vipNumber;
                    vipExtraInfo.innerHTML = '✅ <span style="color:#008000;">VIP Number unlocked successfully! আজকের স্পেশাল নাম্বার।</span>';
                    vipStatusText.textContent = '✅ VIP নাম্বার আনলক সম্পূর্ণ!';
                    vipStatusText.style.color = '#008000';
                    vipModal.classList.add('active');
                } else {
                    // ডিফল্ট VIP
                    const defaultVIP = '47, 68 | 86, 15';
                    vipNumberValue.textContent = defaultVIP;
                    vipExtraInfo.innerHTML = '⚠️ <span style="color:#ff9800;">[Demo] আজকের ডেটা নেই, ডিফল্ট দেখানো হচ্ছে।</span>';
                    vipStatusText.textContent = '⚠️ VIP নাম্বার লোড হয়েছে (Demo Mode)';
                    vipStatusText.style.color = '#ff9800';
                    vipModal.classList.add('active');
                }

                vipBtn.disabled = false;
                vipBtn.textContent = '🔓 আনলক করুন / Unlock Now';
                isUnlocking = false;
            }, 2000);

        } catch (err) {
            console.error('❌ VIP unlock error:', err);
            vipStatusText.textContent = '❌ VIP আনলক করতে ব্যর্থ! আবার চেষ্টা করুন।';
            vipStatusText.style.color = '#cc0000';
            vipBtn.disabled = false;
            vipBtn.textContent = '🔓 আনলক করুন / Unlock Now';
            isUnlocking = false;
        }
    }

    function showAdAndWait() {
        try {
            // 🎯 অ্যাড ওপেন করার কোড এখানে দেওয়া হলো (HTML এর লিংকের সাথে মিলিয়ে)
            const adLink = 'https://omg10.com/4/11160871'; 
            window.open(adLink, '_blank'); 
            console.log('📢 Adsterra Popunder triggered for VIP unlock');
        } catch (e) {
            console.log('⚠️ Ad trigger error:', e);
        }
    }

    // ============================================================
    // 🔘 Event Listeners
    // ============================================================
    vipBtn.addEventListener('click', unlockVIP);

    vipModalClose.addEventListener('click', function() {
        vipModal.classList.remove('active');
    });

    vipModal.addEventListener('click', function(e) {
        if (e.target === vipModal) {
            vipModal.classList.remove('active');
        }
    });

    console.log('✅ VIP System Loaded Successfully! (Using teer_common_numbers table)');
});


// ============================================================
// 🌍 Language Switcher System
// ============================================================
function showBangla() {
    console.log("Language changed to Bangla");
    alert("ওয়েবসাইটটি বাংলায় দেখাচ্ছে!");
}

function showEnglish() {
    console.log("Language changed to English");
    alert("Website is showing in English!");
}

// ============================================================
// 🔗 Social Share System
// ============================================================
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("আজকের স্পেশাল VIP তীর নাম্বারগুলো দেখুন: ");
    window.open(`https://api.whatsapp.com/send?text=${text}%0A${url}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Shillong Teer Live Result & VIP Numbers: ");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareOnTelegram() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("আজকের স্পেশাল VIP তীর নাম্বারগুলো দেখুন: ");
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("✅ লিংক কপি করা হয়েছে! (Link Copied!)");
    }).catch(err => {
        console.error("Copy failed", err);
    });
}

// ============================================================
// 💬 Comment System (Demo)
// ============================================================
function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentName = document.getElementById('commentName');
    
    if(commentInput && commentInput.value.trim() === '') {
        alert("অনুগ্রহ করে আপনার মতামত লিখুন!");
        return;
    }
    
    alert("আপনার মন্তব্য সফলভাবে গ্রহণ করা হয়েছে! (Your comment has been submitted!)");
    
    // কমেন্ট করার পর ফিল্ডগুলো ফাঁকা করে দেওয়া
    if(commentInput) commentInput.value = '';
    if(commentName) commentName.value = '';
}
